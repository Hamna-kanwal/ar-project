import { guard } from "@/lib/guard";
import { listPages } from "@/lib/pages";
import { audit } from "@/lib/audit";

export async function GET(req) {
  const g = await guard(req);
  if (g.error) {
    await audit({ route: "/pages", method: "GET", result: g.error.status });
    return g.error;
  }
  const sp = new URL(req.url).searchParams;
  const limit = Math.min(Number(sp.get("limit")) || 20, 50);
  const data = await listPages({ limit, cursor: sp.get("cursor") || undefined });
  await audit({ route: "/pages", method: "GET", result: 200, key: g.keyId });
  return Response.json(data);
}
