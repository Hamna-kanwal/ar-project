// app/sitemap.ts

import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.arheatingservice.co.uk';

  // 1. Static Pages
  const staticPages = [
    { route: '', priority: 1.0 },
    { route: '/about', priority: 0.8 },
    { route: '/blogs', priority: 0.8 },
    { route: '/contact', priority: 0.7 },
    { route: '/location', priority: 0.6 },
    { route: '/terms', priority: 0.3 },
    { route: '/privacy-policy', priority: 0.3 },
    { route: '/Services/boiler-installation', priority: 0.9 },
    { route: '/Services/heating-installation', priority: 0.9 },
    { route: '/Services/power-flushing', priority: 0.8 },
    { route: '/Services/central-heating', priority: 0.7 },
    { route: '/Services/general-plumbing', priority: 0.7 },
    { route: '/Services/general-installation', priority: 0.7 },
    { route: '/Services/emergency-services', priority: 0.7 },
    { route: '/Services/boiler-breakdown', priority: 0.7 },
    { route: '/Services/landlord', priority: 0.6 },
    { route: '/Services/boiler', priority: 0.6 },
    { route: '/Services/thermostat-installation', priority: 0.6 },
    { route: '/Services/nest', priority: 0.5 },
    { route: '/Services/hive', priority: 0.5 },
    { route: '/Services/underfloor-heating', priority: 0.5 },
    { route: '/Services/dishwasher', priority: 0.5 },
    { route: '/Services/washing-machine', priority: 0.5 },
    { route: '/Services/gas-cooker', priority: 0.5 },
    { route: '/Services/megaflo', priority: 0.5 },
  ].map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
   changeFrequency: (route === '' ? ('weekly' as const) : ('monthly' as const)),
    priority,
  }));

  try {
    // 2. Dynamic Blogs — apni existing /api/blogs API se fetch
    const res = await fetch(`${baseUrl}/api/blogs`, {
      next: { revalidate: 3600 }, // Har 1 ghante baad sitemap refresh hoga
    });

    const data = await res.json();
    const blogs = data.blogs || [];

    const blogPages = (Array.isArray(blogs) ? blogs : []).map((post: any) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...blogPages];

  } catch (error) {
    console.error('Sitemap generation error:', error);
    // Agar API fetch fail ho jaye, kam az kam static pages zaroor return honge
    return staticPages;
  }
}