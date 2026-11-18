import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 ghante

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET is missing or too short");
  return s;
}

const sign = (data) => createHmac("sha256", secret()).update(data).digest("base64url");

export function makeToken(email) {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + MAX_AGE * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readToken(token) {
  if (!token || typeof token !== "string") return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(payload));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (!data.exp || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

// Server-side check: cookie signed hai aur expire nahi hui to admin {email}, warna null
export async function getAdmin() {
  const jar = await cookies();
  return readToken(jar.get(COOKIE)?.value);
}

export const sessionCookie = (token) => ({
  name: COOKIE,
  value: token,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
});

export const clearedCookie = () => ({
  name: COOKIE,
  value: "",
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 0,
});

// Dusri site se aayi POST request ko rokta hai
export function sameOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

// Constant-time string compare (length alag ho tab bhi safe)
export function safeEqual(a, b) {
  const ha = createHash("sha256").update(String(a)).digest();
  const hb = createHash("sha256").update(String(b)).digest();
  return timingSafeEqual(ha, hb);
}
