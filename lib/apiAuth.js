import { timingSafeEqual } from "node:crypto";

function safeCompare(sent, key) {
  const a = Buffer.from(sent);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Kaun si key match hui: "key1" / "key2" (key ki value kahin store nahi hoti), warna null
export function keyIdOf(req) {
  const sent = req.headers.get("x-api-key") || "";
  const keys = [process.env.SEO_BRIDGE_KEY_1, process.env.SEO_BRIDGE_KEY_2];
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] && safeCompare(sent, keys[i])) return `key${i + 1}`;
  }
  return null;
}

export const checkKey = (req) => keyIdOf(req) !== null;

export const unauthorized = () => new Response(null, { status: 401 });
