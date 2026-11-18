import { getPage } from "@/lib/pages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.arheatingservice.co.uk/";

// Purani values: DB mein "blogs" na mile (ya field khali ho) to yehi use hongi
const fallback = {
  title: "Heating and Boiler Advice | AR Heating Blog",
  description:
    "Plain advice on boilers, radiators, power flushing and heating costs from the Gas Safe engineers at AR Heating in Watford.",
  canonical: "https://www.arheatingservice.co.uk/blogs",
  image: "https://www.arheatingservice.co.uk/logo-footer.webp",
};

export async function generateMetadata() {
  const page = await getPage("blogs");
  const seo = page?.seo || {};

  const title = seo.meta_title || fallback.title;
  const description = seo.meta_description || fallback.description;
  const canonical = seo.canonical_url || fallback.canonical;
  const image = seo.og_image || fallback.image;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    ...(seo.robots ? { robots: seo.robots } : {}),
    openGraph: {
      title: seo.og_title || title,
      description: seo.og_description || description,
      url: canonical,
      images: [image],
      type: "website",
    },
    alternates: { canonical },
  };
}

export default function BlogsLayout({ children }) {
  return children;
}
