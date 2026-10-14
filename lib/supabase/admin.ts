import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only client. The service role key bypasses RLS, which lets the database
// deny the public anon key everything except reads and new bookings/reviews.
// Falls back to the anon key so local dev keeps working without the secret.
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
