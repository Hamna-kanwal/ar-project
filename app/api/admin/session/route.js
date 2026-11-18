import { NextResponse } from "next/server";
import {
  getAdmin,
  makeToken,
  sessionCookie,
  clearedCookie,
  sameOrigin,
  safeEqual,
} from "@/lib/adminSession";
import { audit } from "@/lib/audit";

// Simple in-memory limiter: 5 galat koshishein / 10 minute / IP.
// (Serverless host par har instance ka apna hota hai, phir bhi bahut si koshishein rok deta hai.)
const attempts = new Map();
const WINDOW = 10 * 60 * 1000;
const MAX_FAILS = 5;

function ipOf(req) {
  return (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
}

export async function GET() {
  const admin = await getAdmin();
  return NextResponse.json({ authenticated: !!admin });
}

export async function POST(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Bad origin" }, { status: 403 });

  const ip = ipOf(req);
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && rec.reset > now && rec.count >= MAX_FAILS) {
    return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPass) {
    return NextResponse.json({ error: "Admin login is not configured on the server" }, { status: 500 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const emailOk = safeEqual(String(body?.email || "").trim().toLowerCase(), adminEmail.trim().toLowerCase());
  const passOk = safeEqual(String(body?.password || ""), adminPass);

  if (!emailOk || !passOk) {
    const fresh = rec && rec.reset > now ? rec : { count: 0, reset: now + WINDOW };
    fresh.count += 1;
    attempts.set(ip, fresh);
    await audit({ route: "/admin/session", method: "POST", result: 401 });
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  attempts.delete(ip);
  let token;
  try {
    token = makeToken(adminEmail.trim().toLowerCase());
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Admin login is not configured on the server" }, { status: 500 });
  }

  await audit({ route: "/admin/session", method: "POST", result: 200 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookie(token));
  return res;
}

export async function DELETE(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Bad origin" }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(clearedCookie());
  return res;
}
