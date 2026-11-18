
import { createHash } from "node:crypto";
import { SEO_FIELDS, fullSeo } from "@/lib/seoBridge";
import { dbConnect } from "@/lib/db";
import Blog from "@/models/Blog";

// Same collection and database that Manage Blogs uses
export async function getBlogsCollection() {
  await dbConnect();
  return Blog.collection;
}

// Existing blog SEO field mapping
const DIRECT = {
  meta_title: "pagetitle",
  meta_description: "pageDescription",
};

export const blogFieldFor = (field) =>
  DIRECT[field] ?? `seo.${field}`;

export function getPath(obj, path) {
  return path
    .split(".")
    .reduce(
      (acc, key) => (acc == null ? undefined : acc[key]),
      obj
    );
}

// Version hash of editable blog content and SEO fields
export function blogVersion(blog) {
  const extras = SEO_FIELDS.filter((field) => !DIRECT[field]).map(
    (field) => blog.seo?.[field] ?? ""
  );

  const parts = [
    blog.title,
    blog.slug,
    blog.excerpt,
    blog.description,
    blog.pagetitle,
    blog.pageDescription,
    blog.keywords,
    ...extras,
  ];

  return createHash("sha1")
    .update(JSON.stringify(parts.map((part) => part ?? "")))
    .digest("hex")
    .slice(0, 12);
}

const toIso = (value) => {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

// Blog document -> SEO bridge API shape
export function toApi(blog) {
  const seo = fullSeo(blog.seo);

  seo.meta_title = blog.pagetitle ?? "";
  seo.meta_description = blog.pageDescription ?? "";

  return {
    id: blog.slug,
    path: `/blogs/${blog.slug}`,
    name: blog.title ?? "",
    status: "published",
    version: blogVersion(blog),
    seo,
    body: blog.description ?? "",
    updated_at: toIso(
      blog.updatedAt ?? blog.updated_at ?? blog.createdAt
    ),
  };
}

export function makeExcerpt(html) {
  const text = String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 160
    ? `${text.slice(0, 157).trim()}...`
    : text;
}

// Pending new blog -> document used by Manage Blogs
export function newBlogDoc(np, now) {
  const {
    meta_title,
    meta_description,
    ...rest
  } = np.seo || {};

  const date = new Date(now);

  return {
    title: np.name,
    slug: np.id,
    excerpt: makeExcerpt(np.body),
    description: np.body,

    // Featured image URL supplied through MCP
    image: np.image,

    pagetitle: meta_title || "",
    pageDescription: meta_description || "",
    keywords: "",

    // Remaining SEO fields
    seo: rest,

    published: true,

    createdAt: date,
    updatedAt: date,
  };
}
