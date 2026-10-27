import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import { getPublicBlog } from '@/lib/blogs';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getPublicBlog(slug);

  if (!blog) return {};

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt || blog.description,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt || blog.description,
      url: `https://www.arheatingservice.co.uk/blogs/${slug}`,
      images: [
        {
          url: blog.imageUrl || `https://www.arheatingservice.co.uk/api/blogs/${slug}/image`,
        },
      ],
      type: 'article',
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
      headline: blog.title,
      description: blog.metaDescription || blog.excerpt || blog.description,
      image: blog.imageUrl || `https://www.arheatingservice.co.uk/api/blogs/${slug}/image`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.arheatingservice.co.uk/blogs/${slug}`,
      },
      author: {
        '@type': 'Organization',
        name: 'AR Heating Service',
        url: 'https://www.arheatingservice.co.uk',
      },
      publisher: {
        '@type': 'Organization',
        name: 'AR Heating Service',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.arheatingservice.co.uk/logoo.webp',
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