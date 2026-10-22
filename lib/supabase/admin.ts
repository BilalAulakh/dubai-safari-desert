import "server-only";
import { createClient } from "@supabase/supabase-js";

// Circuit breaker: when Supabase can't be reached (DNS failure, outage, paused project),
// every later request fails instantly for a minute instead of each one waiting on the
// network. Reads then fall back to the bundled data straight away; writes such as
// bookings still get an error, so nothing is ever "saved" that wasn't.
const REQUEST_TIMEOUT_MS = 8_000;
const COOLDOWN_MS = 60_000;
// Kept on globalThis: the bundler can give layouts and pages separate copies of this module
const breaker = globalThis as typeof globalThis & { __supabaseUnreachableUntil?: number };

// supabase-js retries network failures on reads with 1s+2s+4s backoff (7s per query) but
// never retries an AbortError, so unreachable-network errors are surfaced as one.
function unreachable(message: string) {
  return Object.assign(new Error(message), { name: "AbortError" });
}

async function guardedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  if (Date.now() < (breaker.__supabaseUnreachableUntil ?? 0)) {
    throw unreachable("Supabase unreachable (circuit open)");
  }
  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const signal = init?.signal ? AbortSignal.any([init.signal, timeout]) : timeout;
  try {
    return await fetch(input, { ...init, signal });
  } catch (err) {
    // Network-level failure only; HTTP error responses resolve normally and never get here
    if (!init?.signal?.aborted) {
      breaker.__supabaseUnreachableUntil = Date.now() + COOLDOWN_MS;
      console.warn(`Supabase unreachable, using fallback data for ${COOLDOWN_MS / 1000}s:`, (err as Error).message);
      throw unreachable(`Supabase unreachable: ${(err as Error).message}`);
    }
    throw err;
  }
}

// Server-only client. The service role key bypasses RLS, which lets the database
// deny the public anon key everything except reads and new bookings/reviews.
// Falls back to the anon key so local dev keeps working without the secret.
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false }, global: { fetch: guardedFetch } });
}
