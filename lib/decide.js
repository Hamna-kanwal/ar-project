
import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/lib/db";
import { audit } from "@/lib/audit";
import { isChangeStale, nextVersion } from "@/lib/version";
import {
  getBlogsCollection,
  blogVersion,
  blogFieldFor,
  getPath,
  newBlogDoc,
} from "@/lib/blogsStore";

// Only these fields can go live through approve
const SEO_FIELDS = [
  "meta_title",
  "meta_description",
  "canonical_url",
  "robots",
  "og_title",
  "og_description",
  "og_image",
  "image_alt_text",
  "schema_jsonld",
];

const UNSAFE = [
  /<\s*script/i,
  /<[^>]*\son[a-z]+\s*=/i,
  /javascript\s*:/i,
];

const MAX_BODY_CHARS = 300000;

function hasUnsafe(value) {
  if (typeof value === "string") {
    return UNSAFE.some((re) => re.test(value));
  }

  if (Array.isArray(value)) {
    return value.some(hasUnsafe);
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(hasUnsafe);
  }

  return false;
}

// Validate proposed body before publishing
function checkProposedBody(body) {
  const isPlainObject =
    body && typeof body === "object" && !Array.isArray(body);

  if (typeof body !== "string" && !isPlainObject) {
    return "Proposed body must be text or an object";
  }

  if (JSON.stringify(body).length > MAX_BODY_CHARS) {
    return "Proposed body is too large";
  }

  if (hasUnsafe(body)) {
    return "Proposed body contains script or unsafe markup";
  }

  return null;
}

// Audit values for body changes
function loggedValues(item) {
  if (
    item.proposed_body !== undefined &&
    item.proposed_body !== null
  ) {
    return {
      old_value: {
        body: item.old_body ?? null,
      },
      new_value: {
        body: item.proposed_body,
      },
    };
  }

  return {
    old_value: item.old_value,
    new_value: item.new_value,
  };
}

const out = (status, body) => ({
  status,
  body,
});

// Refresh public blog cache
function refreshBlogCache(slug) {
  let ok = true;

  try {
    revalidateTag("public-blogs", "max");
  } catch (err) {
    ok = false;
    console.error("revalidateTag failed:", err);
  }

  for (const path of [`/blogs/${slug}`, "/blogs"]) {
    try {
      revalidatePath(path, "page");
    } catch (err) {
      ok = false;
      console.error("revalidatePath failed:", err);
    }
  }

  return ok;
}

// ---- Approve a brand new blog ----
async function approveNewBlog({
  item,
  pendingId,
  db,
  adminEmail,
  now,
  route,
}) {
  const blogsCol = await getBlogsCollection();
  const pendingCol = db.collection("pending_changes");
  const np = item.new_post;

  if (!np || !np.id || !np.name) {
    return out(400, {
      error: "This pending item has no blog data",
    });
  }

  const problem = checkProposedBody(np.body);

  if (problem) {
    return out(400, { error: problem });
  }

  // Require a featured image URL for newly created MCP blogs
  if (
    typeof np.image !== "string" ||
    !np.image.trim()
  ) {
    return out(400, {
      error: "This pending blog has no featured image URL",
    });
  }

  let imageUrl;

  try {
    imageUrl = new URL(np.image);

    if (
      imageUrl.protocol !== "https:" ||
      !imageUrl.hostname ||
      imageUrl.username ||
      imageUrl.password
    ) {
      return out(400, {
        error: "The featured image must be a valid HTTPS URL",
      });
    }
  } catch {
    return out(400, {
      error: "The featured image must be a valid HTTPS URL",
    });
  }

  if (
    await blogsCol.findOne(
      { slug: np.id },
      { projection: { slug: 1 } }
    )
  ) {
    const latest = await pendingCol.findOne({
      pending_id: pendingId,
    });

    if (latest?.status === "approved") {
      return out(200, {
        status: "approved",
        alreadyDone: true,
      });
    }

    return out(409, {
      error:
        "A blog with this URL already exists. Reject this change and ask for a new blog with a different name.",
    });
  }

  const doc = newBlogDoc(
    {
      ...np,
      image: np.image.trim(),
    },
    now
  );

  await blogsCol.insertOne(doc);

  const decision = await pendingCol.updateOne(
    {
      pending_id: pendingId,
      status: "pending",
    },
    {
      $set: {
        status: "approved",
        decided_by: adminEmail,
        decided_at: now,
      },
    }
  );

  if (!decision.modifiedCount) {
    return out(200, {
      status: "approved",
      alreadyDone: true,
    });
  }

  const revalidated = refreshBlogCache(doc.slug);

  await audit({
    route,
    method: "POST",
    target: doc.slug,
    result: 200,
    decided_by: adminEmail,
    old_value: {},
    new_value: {
      name: np.name,
      image: np.image,
      seo: np.seo,
      body: np.body,
    },
    revalidated,
  });

  return out(200, {
    status: "approved",
    version: blogVersion(doc),
    path: `/blogs/${doc.slug}`,
    revalidated,
  });
}

// ---- Approve text or SEO edit of an existing blog ----
async function approveBlogEdit({
  item,
  pendingId,
  db,
  adminEmail,
  now,
  route,
}) {
  const blogsCol = await getBlogsCollection();
  const pendingCol = db.collection("pending_changes");

  const blog = await blogsCol.findOne({
    slug: item.target,
  });

  if (!blog) {
    return out(404, {
      error: "The blog for this change no longer exists",
    });
  }

  if (
    !item.base_version ||
    blogVersion(blog) !== item.base_version
  ) {
    return out(409, {
      error:
        "The blog was changed after this edit was submitted, so it cannot be approved. Reject it and ask for a new change.",
    });
  }

  const set = {};
  const guard = { slug: blog.slug };

  let oldSnapshot;

  const isBodyChange =
    item.proposed_body !== undefined &&
    item.proposed_body !== null;

  if (isBodyChange) {
    if (typeof item.proposed_body !== "string") {
      return out(400, {
        error: "Proposed body must be text",
      });
    }

    const problem = checkProposedBody(item.proposed_body);

    if (problem) {
      return out(400, { error: problem });
    }

    set.description = item.proposed_body;
    guard.description = blog.description ?? null;
  } else {
    const proposedValues = item.new_value || {};

    oldSnapshot = {};

    for (const [key, value] of Object.entries(proposedValues)) {
      const field = key.startsWith("seo.")
        ? key.slice(4)
        : key;

      if (
        !field ||
        !SEO_FIELDS.includes(field) ||
        typeof value !== "string"
      ) {
        return out(400, {
          error: `Refusing to apply unexpected field "${key}"`,
        });
      }

      const target = blogFieldFor(field);

      set[target] = value;
      guard[target] = getPath(blog, target) ?? null;
      oldSnapshot[`seo.${field}`] =
        getPath(blog, target) ?? "";
    }

    if (Object.keys(set).length === 0) {
      return out(400, {
        error: "Nothing to apply",
      });
    }
  }

  set.updatedAt = new Date(now);

  const upd = await blogsCol.updateOne(
    guard,
    { $set: set }
  );

  if (!upd.matchedCount) {
    const latest = await pendingCol.findOne({
      pending_id: pendingId,
    });

    if (latest?.status === "approved") {
      return out(200, {
        status: "approved",
        alreadyDone: true,
      });
    }

    return out(409, {
      error:
        "The blog changed while approving. Refresh and try again.",
    });
  }

  const decision = await pendingCol.updateOne(
    {
      pending_id: pendingId,
      status: "pending",
    },
    {
      $set: {
        status: "approved",
        decided_by: adminEmail,
        decided_at: now,
        ...(oldSnapshot
          ? { old_value: oldSnapshot }
          : {}),
      },
    }
  );

  if (!decision.modifiedCount) {
    return out(200, {
      status: "approved",
      alreadyDone: true,
    });
  }

  const revalidated = refreshBlogCache(blog.slug);
  const fresh = await blogsCol.findOne({
    slug: blog.slug,
  });

  await audit({
    route,
    method: "POST",
    target: item.target,
    result: 200,
    decided_by: adminEmail,
    ...(isBodyChange
      ? loggedValues(item)
      : {
          old_value: oldSnapshot,
          new_value: item.new_value,
        }),
    revalidated,
  });

  return out(200, {
    status: "approved",
    version: fresh ? blogVersion(fresh) : undefined,
    revalidated,
  });
}

// ---- Main approval / rejection handler ----
export async function decide(
  pendingId,
  action,
  adminEmail
) {
  const db = await getDb();
  const pendingCol = db.collection("pending_changes");
  const pagesCol = db.collection("pages");

  const item = await pendingCol.findOne({
    pending_id: pendingId,
  });

  if (!item) {
    return out(404, {
      error: "Pending item not found",
    });
  }

  const doneStatus =
    action === "approve" ? "approved" : "rejected";

  if (item.status === doneStatus) {
    return out(200, {
      status: doneStatus,
      alreadyDone: true,
    });
  }

  if (item.status !== "pending") {
    return out(409, {
      error: `This change was already ${item.status}`,
    });
  }

  const now = new Date().toISOString();
  const route = `/admin/seo/pending/${pendingId}/${action}`;

  if (action === "reject") {
    const r = await pendingCol.updateOne(
      {
        pending_id: pendingId,
        status: "pending",
      },
      {
        $set: {
          status: "rejected",
          decided_by: adminEmail,
          decided_at: now,
        },
      }
    );

    if (!r.modifiedCount) {
      return out(200, {
        status: "rejected",
        alreadyDone: true,
      });
    }

    await audit({
      route,
      method: "POST",
      target: item.target,
      result: 200,
      decided_by: adminEmail,
      ...loggedValues(item),
    });

    return out(200, {
      status: "rejected",
    });
  }

  // Blog items are handled separately.
  // Existing page approval logic remains unchanged.
  if (item.type === "post") {
    const args = {
      item,
      pendingId,
      db,
      adminEmail,
      now,
      route,
    };

    return item.target === "new post"
      ? approveNewBlog(args)
      : approveBlogEdit(args);
  }

  const page = await pagesCol.findOne({
    id: item.target,
  });

  if (!page) {
    return out(404, {
      error: "The page for this change no longer exists",
    });
  }

  if (isChangeStale(page, item)) {
    return out(409, {
      error:
        "The page was changed after this edit was submitted, so it cannot be approved. Reject it and ask for a new change.",
    });
  }

  const set = {};
  let oldSnapshot;

  const isBodyChange =
    item.proposed_body !== undefined &&
    item.proposed_body !== null;

  if (isBodyChange) {
    const problem = checkProposedBody(item.proposed_body);

    if (problem) {
      return out(400, { error: problem });
    }

    set.body = item.proposed_body;
  } else {
    const proposedValues =
      item.new_value && Object.keys(item.new_value).length
        ? item.new_value
        : item.seo || {};

    for (const [key, value] of Object.entries(proposedValues)) {
      const field = key.startsWith("seo.")
        ? key.slice(4)
        : key;

      if (
        !field ||
        !SEO_FIELDS.includes(field) ||
        typeof value !== "string"
      ) {
        return out(400, {
          error: `Refusing to apply unexpected field "${key}"`,
        });
      }

      set[`seo.${field}`] = value;
    }

    if (Object.keys(set).length === 0) {
      return out(400, {
        error: "Nothing to apply",
      });
    }

    oldSnapshot = item.old_value;

    if (
      !oldSnapshot ||
      Object.keys(oldSnapshot).length === 0
    ) {
      oldSnapshot = {};

      for (const key of Object.keys(set)) {
        const field = key.slice(4);
        oldSnapshot[`seo.${field}`] =
          page.seo?.[field] ?? "";
      }
    }
  }

  const updatedVersion = nextVersion(page.version);

  set.version = updatedVersion;
  set.updated_at = now;

  const versionFilter =
    page.version === undefined
      ? { version: { $exists: false } }
      : { version: page.version };

  const upd = await pagesCol.updateOne(
    {
      id: page.id,
      ...versionFilter,
    },
    {
      $set: set,
    }
  );

  if (!upd.matchedCount) {
    const latest = await pendingCol.findOne({
      pending_id: pendingId,
    });

    if (latest?.status === "approved") {
      return out(200, {
        status: "approved",
        alreadyDone: true,
      });
    }

    return out(409, {
      error:
        "The page changed while approving. Refresh and try again.",
    });
  }

  const decision = await pendingCol.updateOne(
    {
      pending_id: pendingId,
      status: "pending",
    },
    {
      $set: {
        status: "approved",
        decided_by: adminEmail,
        decided_at: now,
        ...(oldSnapshot
          ? { old_value: oldSnapshot }
          : {}),
      },
    }
  );

  if (!decision.modifiedCount) {
    return out(200, {
      status: "approved",
      alreadyDone: true,
    });
  }

  let revalidated = true;

  try {
    revalidatePath(page.path, "layout");
  } catch (err) {
    revalidated = false;
    console.error("revalidatePath failed:", err);
  }

  await audit({
    route,
    method: "POST",
    target: item.target,
    result: 200,
    decided_by: adminEmail,
    ...(isBodyChange
      ? loggedValues(item)
      : {
          old_value: oldSnapshot,
          new_value: item.new_value,
        }),
    revalidated,
  });

  return out(200, {
    status: "approved",
    version: updatedVersion,
    revalidated,
  });
}
