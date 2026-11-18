import { keyIdOf } from "@/lib/apiAuth";
import { hit } from "@/lib/rateLimit";

// Limits env se badal sakte hain
const num = (v, d) => (Number(v) > 0 ? Number(v) : d);
const LIMIT_ALL = () => num(process.env.SEO_BRIDGE_RATE_LIMIT, 60); // har key: har minute
const LIMIT_WRITE = () => num(process.env.SEO_BRIDGE_WRITE_LIMIT, 10); // PUT/POST: har minute
const LIMIT_BAD = () => num(process.env.SEO_BRIDGE_BAD_KEY_LIMIT, 20); // galat key: har IP, har minute

const tooMany = () =>
  Response.json(
    { error: "Too many requests. Wait a minute and try again." },
    { status: 429, headers: { "Retry-After": "60" } }
  );

const ipOf = (req) => (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();

// Har seo-bridge route ke shuru mein:
//   const g = await guard(req, { write: true });
//   if (g.error) return g.error;
export async function guard(req, { write = false } = {}) {
  const keyId = keyIdOf(req);

  if (!keyId) {
    try {
      const fails = await hit(`ip:${ipOf(req)}`, "bad");
      if (fails > LIMIT_BAD()) return { error: tooMany() };
    } catch (err) {
      console.error("rate limit check failed:", err);
    }
    return { error: new Response(null, { status: 401 }) };
  }

  try {
    if ((await hit(keyId, "all")) > LIMIT_ALL()) return { error: tooMany() };
    if (write && (await hit(keyId, "write")) > LIMIT_WRITE()) return { error: tooMany() };
  } catch (err) {
    // Limiter ka DB masla API ko band nahi karta (baaki DB kaam waise bhi fail honge)
    console.error("rate limit check failed:", err);
  }

  return { keyId };
}
