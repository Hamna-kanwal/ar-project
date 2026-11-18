import { randomUUID } from "node:crypto";
import { guard } from "@/lib/guard";
import { getPage } from "@/lib/pages";
import { getDb } from "@/lib/db";
import { audit } from "@/lib/audit";
import { validatePut } from "@/lib/validatePut";

export async function GET(req, { params }) {
  const { id } = await params;
  const route = `/pages/${id}`;

  const g = await guard(req);
  if (g.error) {
    await audit({ route, method: "GET", target: id, result: g.error.status });
    return g.error;
  }

  const page = await getPage(id);
  if (!page) {
    await audit({ route, method: "GET", target: id, result: 404 });
    return Response.json({ error: "Page not found" }, { status: 404 });
  }

  await audit({ route, method: "GET", target: id, result: 200 });
  return Response.json(page);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const route = `/pages/${id}`;

  const g = await guard(req, { write: true });
  if (g.error) {
    await audit({ route, method: "PUT", target: id, result: g.error.status });
    return g.error;
  }

  const page = await getPage(id);
  if (!page) {
    await audit({ route, method: "PUT", target: id, result: 404 });
    return Response.json({ error: "Page not found" }, { status: 404 });
  }

  let input;
  try {
    input = await req.json();
  } catch {
    await audit({ route, method: "PUT", target: id, result: 400 });
    return Response.json({ error: "Body is not valid JSON" }, { status: 400 });
  }

  const check = validatePut(input, page);
  if (check.error) {
    await audit({ route, method: "PUT", target: id, result: check.status, error: check.error });
    return Response.json({ error: check.error }, { status: check.status });
  }

  // The live page is never touched here: only pending items are created
  const db = await getDb();
  const now = new Date().toISOString();
  const created = [];

  if (check.seo) {
    const pending_id = randomUUID();
    await db.collection("pending_changes").insertOne({
      pending_id,
      target: id,
      type: "seo",
      base_version: String(page.version),
      old_value: check.seo.old_value,
      new_value: check.seo.new_value,
      status: "pending",
      submitted_at: now,
      decided_by: null,
      decided_at: null,
    });
    created.push({ pending_id, type: "seo" });
    await audit({
      route, method: "PUT", target: id, result: 202, pending_id,
      old_value: check.seo.old_value, new_value: check.seo.new_value,
    });
  }

  if (check.body) {
    const pending_id = randomUUID();
    await db.collection("pending_changes").insertOne({
      pending_id,
      target: id,
      type: "page_update",
      base_version: String(page.version),
      old_body: check.body.old_body,
      proposed_body: check.body.proposed_body,
      status: "pending",
      submitted_at: now,
      decided_by: null,
      decided_at: null,
    });
    created.push({ pending_id, type: "page_update" });
    await audit({
      route, method: "PUT", target: id, result: 202, pending_id,
      old_value: { body: check.body.old_body }, new_value: { body: check.body.proposed_body },
    });
  }

  return Response.json(
    { pending_id: created[0].pending_id, pending: created, status: "pending" },
    { status: 202 }
  );
}