
import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/db";
import {
  bridge,
  fail,
  readJson,
  parseWrite,
  validateSeo,
  validateBody,
  validateName,
  validateImageUrl,
  slugify,
  postSummary,
  fullSeo,
  clampLimit,
} from "@/lib/seoBridge";
import { getBlogsCollection, toApi } from "@/lib/blogsStore";

export const dynamic = "force-dynamic";

// GET /posts: list blog posts without body and image data
export const GET = bridge(async (request) => {
  const params = new URL(request.url).searchParams;
  const limit = clampLimit(params.get("limit"));
  const cursor = params.get("cursor");

  const blogsCol = await getBlogsCollection();

  const rows = await blogsCol
    .find(
      cursor ? { slug: { $gt: cursor } } : {},
      { projection: { image: 0 } }
    )
    .sort({ slug: 1 })
    .limit(limit + 1)
    .toArray();

  const page = rows.slice(0, limit);
  const items = page.map((blog) => postSummary(toApi(blog)));

  return {
    status: 200,
    body: {
      items,
      next_cursor:
        rows.length > limit ? page[page.length - 1].slug : null,
    },
  };
});

// POST /posts: create a new blog as a pending approval item
export const POST = bridge(async (request) => {
  const parsed = await readJson(request);

  if (parsed.error) {
    return fail(400, parsed.error);
  }

  const w = parseWrite(parsed.data, { creating: true });

  if (w.error) {
    return fail(400, w.error);
  }

  const nameProblem = validateName(w.name);
  if (nameProblem) {
    return fail(400, nameProblem);
  }

  const bodyProblem = validateBody(w.body);
  if (bodyProblem) {
    return fail(400, bodyProblem);
  }

  const imageProblem = validateImageUrl(w.image);
  if (imageProblem) {
    return fail(400, imageProblem);
  }

  const seoCheck = validateSeo(w.seoInput);
  if (seoCheck.error) {
    return fail(400, seoCheck.error);
  }

  const name = w.name.trim();
  const image = w.image.trim();
  const id = slugify(name);

  if (!id) {
    return fail(
      400,
      "name must contain letters or numbers so a URL can be built from it"
    );
  }

  const db = await getDb();
  const blogsCol = await getBlogsCollection();

  const live = await blogsCol.findOne(
    { slug: id },
    { projection: { slug: 1 } }
  );

  const waiting = await db
    .collection("pending_changes")
    .findOne(
      {
        type: "post",
        target: "new post",
        status: "pending",
        "new_post.id": id,
      },
      { projection: { pending_id: 1 } }
    );

  if (live || waiting) {
    return fail(
      409,
      `A post with the URL /blogs/${id} already exists or is waiting for approval. Use a different name.`,
      { target: id }
    );
  }

  const seo = fullSeo(seoCheck.seo);
  const pendingId = randomUUID();

  await db.collection("pending_changes").insertOne({
    pending_id: pendingId,
    type: "post",
    target: "new post",
    status: "pending",
    submitted_at: new Date().toISOString(),

    new_post: {
      id,
      name,
      image,
      seo,
      body: w.body,
    },

    old_value: {},

    new_value: {
      name,
      image,
      ...Object.fromEntries(
        Object.entries(seo).map(([key, value]) => [`seo.${key}`, value])
      ),
    },

    old_body: null,
    proposed_body: w.body,
  });

  return {
    status: 202,
    target: id,
    log: {
      old_value: {},
      new_value: {
        name,
        image,
        seo,
        body: w.body,
      },
    },
    body: {
      pending_id: pendingId,
      status: "pending",
      target: "new post",
      post_id: id,
      path: `/blogs/${id}`,
      message: "Blog submitted successfully and is waiting for admin approval.",
    },
  };
});
