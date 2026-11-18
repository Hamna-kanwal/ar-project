import { getAdmin } from "@/lib/adminSession";
import { getDb } from "@/lib/db";
import { getBlogsCollection, blogVersion } from "@/lib/blogsStore";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const admin = await getAdmin();
  if (!admin) return Response.json({ error: "Not logged in" }, { status: 401 });

  const status = new URL(req.url).searchParams.get("status");
  const filter = ["pending", "approved", "rejected"].includes(status) ? { status } : {};

  const db = await getDb();
  const rows = await db
    .collection("pending_changes")
    .find({ type: "post", ...filter }, { projection: { _id: 0 } })
    .sort({ submitted_at: -1 })
    .limit(100)
    .toArray();

  // Load the live blogs these changes point to (or would collide with)
  const slugs = [...new Set(rows.map((r) => (r.target === "new post" ? r.new_post?.id : r.target)).filter(Boolean))];
  const blogsCol = await getBlogsCollection();
  const blogs = slugs.length
    ? await blogsCol.find({ slug: { $in: slugs } }, { projection: { image: 0 } }).toArray()
    : [];
  const bySlug = new Map(blogs.map((b) => [b.slug, b]));

  const items = rows.map((r) => {
    const isNew = r.target === "new post";
    const slug = isNew ? r.new_post?.id : r.target;
    const blog = bySlug.get(slug);
    const currentVersion = blog ? blogVersion(blog) : null;

    // New blog: stale when the URL is now taken. Edit: stale when the blog is gone or changed.
    const stale = isNew ? Boolean(blog) : !blog || !r.base_version || currentVersion !== r.base_version;

    return {
      ...r,
      kind: isNew ? "new" : r.proposed_body !== undefined && r.proposed_body !== null ? "body" : "seo",
      blog_title: isNew ? r.new_post?.name : blog?.title || r.target_name || r.target,
      blog_path: slug ? `/blogs/${slug}` : "",
      current_version: currentVersion,
      stale: r.status === "pending" && stale,
    };
  });

  return Response.json({ items });
}