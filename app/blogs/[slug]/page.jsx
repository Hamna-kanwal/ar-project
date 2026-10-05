import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import { getPublicBlog } from '@/lib/blogs';

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getPublicBlog(slug);

  if (!blog) notFound();

  return <BlogDetailClient blog={blog} />;
}
