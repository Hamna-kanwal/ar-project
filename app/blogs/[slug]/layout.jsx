const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.arheatingservice.co.uk/";

function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/[\u00AD\u200B\u200C\u200D]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, max = 160) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

async function getBlog(slug) {
  try {
    const res = await fetch(`${SITE_URL}/api/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.blog : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog post not found",
      robots: { index: false, follow: false },
    };
  }

  const title = blog.metaTitle || blog.title;
  const description = truncate(
    blog.metaDescription || blog.excerpt || stripHtml(blog.description)
  );
  const canonical = `/blogs/${slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: blog.image ? [{ url: blog.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.image ? [blog.image] : undefined,
    },
  };
}

export default function BlogDetailLayout({ children }) {
  return children;
}