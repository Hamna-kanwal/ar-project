import { unstable_cache } from 'next/cache';
import { dbConnect } from '@/lib/db';
import Blog from '@/models/Blog';

export const getPublicBlogs = unstable_cache(
  async () => {
    await dbConnect();
    const blogs = await Blog.find()
      .select('title slug excerpt updatedAt')
      .sort({ createdAt: -1 })
      .lean();

    return blogs.map(({ title, slug, excerpt, updatedAt }) => ({
      title,
      slug,
      excerpt,
      updatedAt: updatedAt?.toISOString() ?? null,
    }));
  },
  ['public-blogs'],
  { revalidate: 300, tags: ['public-blogs'] }
);

export const getPublicBlog = unstable_cache(
  async (slug) => {
    await dbConnect();
    const blog = await Blog.findOne({ slug })
      .select('title slug excerpt description pagetitle pageDescription keywords')
      .lean();

    if (!blog) return null;

    return {
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      description: blog.description,
      pagetitle: blog.pagetitle,
      pageDescription: blog.pageDescription,
      keywords: blog.keywords,
      updatedAt: blog.updatedAt?.toISOString() ?? null,
    };
  },
  ['public-blog'],
  { revalidate: 300, tags: ['public-blogs'] }
);
