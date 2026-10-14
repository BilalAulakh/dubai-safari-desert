import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Signed, httpOnly admin session. Credentials and the signing secret live in
// server env vars only (ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET).

export const ADMIN_COOKIE = "sdt_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/** Returns null when admin login is not configured, so login fails closed. */
export function createSessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  const secret = getSecret();
  if (!secret || !token) return false;

  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload, secret))) return false;

  const [subject, expiresAt] = payload.split(".");
  return subject === "admin" && Number(expiresAt) > Math.floor(Date.now() / 1000);
}

export function checkAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword || !getSecret()) return false;
  // Evaluate both so timing doesn't reveal which one was wrong
  const userOk = safeEqual(username.trim().toLowerCase(), expectedUser.toLowerCase());
  const passwordOk = safeEqual(password, expectedPassword);
  return userOk && passwordOk;
}

export async function isAdminRequest(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

/** Use at the top of every admin-only route handler: `const denied = await requireAdmin(); if (denied) return denied;` */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdminRequest()) return null;
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}
