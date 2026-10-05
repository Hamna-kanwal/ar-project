import Image from 'next/image';
import Link from 'next/link';
import { getPublicBlogs } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

function BlogCard({ title, excerpt, slug, updatedAt, priority }) {
  const imageVersion = updatedAt ? `/${encodeURIComponent(updatedAt)}` : '';
  const imageSrc = `/api/blogs/${encodeURIComponent(slug)}/image${imageVersion}`;

  return (
    <article className="group mt-12 overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-56 w-full overflow-hidden">
        <Link
          href={`/blogs/${slug}`}
          aria-label={`Read ${title}`}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-blue-900/60 to-transparent" />
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
      </div>

      <div className="bg-gradient-to-b from-white to-gray-50 p-8">
        <h2 className="mb-3 text-center text-xl font-extrabold uppercase tracking-tight text-[#027cc1]">
          {title}
        </h2>
        <p className="mb-6 line-clamp-3 text-center text-sm leading-relaxed text-gray-600">
          {excerpt}
        </p>

        <div className="text-center">
          <Link
            href={`/blogs/${slug}`}
            className="text-xs font-bold uppercase tracking-widest text-gray-800 transition-colors hover:text-orange-700"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function BlogGrid() {
  const posts = await getPublicBlogs();

  return (
    <main className="bg-slate-100 px-6 py-20">
      <header className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-bold text-[#027cc1]">Our Latest Insights</h1>
        <div className="mx-auto h-1.5 w-20 rounded-full bg-orange-500" />
      </header>

      {posts.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <p className="text-lg">No published blogs found.</p>
          <p className="text-sm">Create your first blog post from the admin dashboard!</p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              updatedAt={post.updatedAt}
              priority={index === 0}
            />
          ))}
        </div>
      )}
    </main>
  );
}
