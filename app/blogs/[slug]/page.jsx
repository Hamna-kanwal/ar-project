import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import { getPublicBlog } from '@/lib/blogs';

const SITE_URL = 'https://www.arheatingservice.co.uk';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getPublicBlog(slug);

  if (!blog) {
    return {
      title: 'Blog post not found',
      robots: { index: false, follow: false },
    };
  }

  const title = blog.pagetitle?.trim() || undefined;
  const description = blog.pageDescription?.trim() || undefined;

  const canonical = `${SITE_URL}/blogs/${slug}`;
  const image = `${SITE_URL}/api/blogs/${encodeURIComponent(slug)}/image${
    blog.updatedAt ? `/${encodeURIComponent(blog.updatedAt)}` : ''
  }`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getPublicBlog(slug);

  if (!blog) notFound();

  const schemaGraph = [
    {
      '@type': 'Article',
      headline: blog.pagetitle?.trim() || undefined,
      description: blog.pageDescription?.trim() || undefined,
      image: `${SITE_URL}/api/blogs/${encodeURIComponent(slug)}/image`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/blogs/${slug}`,
      },
      author: {
        '@type': 'Organization',
        name: 'AR Heating Service',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'AR Heating Service',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logoo.webp`,
        },
      },
    },
  ];

  if (blog.faqs && blog.faqs.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      mainEntity: blog.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question || faq.name,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer || faq.text,
        },
      })),
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogDetailClient blog={blog} />
    </>
  );
}