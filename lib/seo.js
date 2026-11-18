import { getPageCached } from "@/lib/pageCache";

export async function buildMetadata(id) {
  const page = await getPageCached(id);
  const seo = page?.seo;
  if (!seo) return {};

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    ...(seo.robots ? { robots: seo.robots } : {}),
    openGraph: {
      title: seo.og_title || seo.meta_title,
      description: seo.og_description || seo.meta_description,
      url: seo.canonical_url,
      images: seo.og_image ? [seo.og_image] : [],
      type: "website",
    },
    alternates: { canonical: seo.canonical_url },
  };
}
