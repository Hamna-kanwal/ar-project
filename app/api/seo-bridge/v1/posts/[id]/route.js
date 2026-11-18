import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/db";
import { bridge, fail, readJson, parseWrite, validateSeo, validateBody, postFull } from "@/lib/seoBridge";
import { getBlogsCollection, toApi } from "@/lib/blogsStore";

export const dynamic = "force-dynamic";

async function loadPost(id) {
  const db = await getDb();
  const blogsCol = await getBlogsCollection();
  const blog = await blogsCol.findOne({ slug: id }, { projection: { image: 0 } });
  return { db, post: blog ? toApi(blog) : null };
}

// GET /posts/{id} : one blog in full, including body text
export const GET = bridge(async (_request, { id }) => {
  const { post } = await loadPost(id);
  if (!post) return { ...fail(404, "Post not found"), target: id };
  return { status: 200, target: id, body: postFull(post) };
});

// PUT /posts/{id} : submit SEO changes OR a new body as a pending item (nothing goes live)
export const PUT = bridge(async (request, { id }) => {
  const parsed = await readJson(request);
  if (parsed.error) return fail(400, parsed.error);

  const w = parseWrite(parsed.data, { creating: false });
  if (w.error) return fail(400, w.error);
  if (typeof w.version !== "string" || w.version === "") {
    return fail(400, "version is required. Send the version you read from GET /posts/{id}");
  }

  const hasSeo = Object.keys(w.seoInput).length > 0;
  const hasBody = w.body !== undefined;
  if (hasSeo && hasBody) {
    return fail(400, "Send SEO fields and body text in separate requests so each one can be reviewed on its own");
  }
  if (!hasSeo && !hasBody) return fail(400, "Nothing to change. Send at least one SEO field or the body");

  const seoCheck = validateSeo(w.seoInput);
  if (seoCheck.error) return fail(400, seoCheck.error);
  if (hasBody) {
    const bodyProblem = validateBody(w.body);
    if (bodyProblem) return fail(400, bodyProblem);
  }

  const { db, post } = await loadPost(id);
  if (!post) return { ...fail(404, "Post not found"), target: id };

  if (w.version !== post.version) {
    return {
      ...fail(409, "The post changed after you read it. Read it again and resend your change.", {
        current_version: post.version,
      }),
      target: id,
    };
  }

  const item = {
    pending_id: randomUUID(),
    type: "post",
    target: id,
    target_name: post.name,
    status: "pending",
    submitted_at: new Date().toISOString(),
    base_version: post.version,
  };
  let logValues;

  if (hasBody) {
    if (w.body === post.body) return { ...fail(400, "Nothing to change. The body is the same as the live post"), target: id };
    item.old_body = post.body;
    item.proposed_body = w.body;
    logValues = { old_value: { body: item.old_body }, new_value: { body: w.body } };
  } else {
    const oldValue = {};
    const newValue = {};
    for (const [field, value] of Object.entries(seoCheck.seo)) {
      const current = post.seo[field] ?? "";
      if (current !== value) {
        oldValue[`seo.${field}`] = current;
        newValue[`seo.${field}`] = value;
      }
    }
    if (Object.keys(newValue).length === 0) {
      return { ...fail(400, "Nothing to change. These values are the same as the live post"), target: id };
    }
    item.old_value = oldValue;
    item.new_value = newValue;
    logValues = { old_value: oldValue, new_value: newValue };
  }

  await db.collection("pending_changes").insertOne(item);
  return {
    status: 202,
    target: id,
    log: logValues,
    body: { pending_id: item.pending_id, status: "pending", target: id },
  };
});