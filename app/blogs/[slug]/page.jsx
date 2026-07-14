"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

function cleanBlogContent(html) {
  if (!html) return "";

  let cleaned = html;

  if (typeof window !== "undefined") {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    cleaned = txt.value;
  }

  return cleaned
    // Remove soft hyphens and invisible breaks
    .replace(/[\u00AD\u200B\u200C\u200D]/g, "")
    .replace(/&shy;/gi, "")
    // Strip newlines/tabs inside paragraph blocks and replace with single space
    .replace(/\s+/g, " ");
}

function FormattedTitle({ title }) {
  if (!title) return null;

  if (title.includes(":")) {
    const colonIndex = title.indexOf(":");
    const orangePart = title.substring(0, colonIndex + 1);
    const bluePart = title.substring(colonIndex + 1).trim();

    return (
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight flex flex-col items-center gap-2 text-center">
        <span className="text-[#ea5408]">{orangePart}</span>
        {bluePart && <span className="text-[#027cc1]">{bluePart}</span>}
      </h1>
    );
  }

  return (
    <h1 className="text-3xl md:text-5xl font-extrabold text-[#027cc1] mb-6 leading-tight text-center">
      {title}
    </h1>
  );
}

export default function BlogDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { slug } = params;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogDetail() {
      try {
        const res = await fetch(`/api/blogs/${slug}`);

        if (!res.ok) {
          console.error(`API returned status ${res.status}`);
          setBlog(null);
          return;
        }

        const data = await res.json();
        if (data.success) {
          setBlog(data.blog);
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error("Error fetching blog detail:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchBlogDetail();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 font-medium">
        Loading article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500 font-medium">
        <h2 className="text-2xl font-bold mb-4">Blog post not found!</h2>
        <Link href="/blogs" className="text-[#027cc1] underline">
          ← Return to All Blogs
        </Link>
      </div>
    );
  }

  const cleanContent = cleanBlogContent(blog.description);

  return (
    <article className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <header className="mb-10 text-center">
          <span className="text-black font-bold text-sm uppercase tracking-wider mb-2 block">
            {blog.tag || "Service Article"}
          </span>

          <FormattedTitle title={blog.title} />

          <div className="w-20 h-1.5 bg-[#027cc1] mx-auto rounded-full"></div>
        </header>

        {/* Featured Image */}
        {blog.image && (
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Render Cleaned Content */}
        <div
          className="blog-content text-gray-700 text-base md:text-lg w-full"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
          <Link
            href="/blogs"
            className="text-[#ea5408] font-bold hover:underline flex items-center"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    </article>
  );
}