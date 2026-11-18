import { getAdmin, sameOrigin } from "@/lib/adminSession";
import { decide } from "@/lib/decide";

export async function POST(req, { params }) {
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin" }, { status: 403 });
  const admin = await getAdmin();
  if (!admin) return Response.json({ error: "Not logged in" }, { status: 401 });

  const { id } = await params;
  const r = await decide(id, "reject", admin.email);
  return Response.json(r.body, { status: r.status });
}