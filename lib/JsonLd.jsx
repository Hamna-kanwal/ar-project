import { getPageCached } from "@/lib/pageCache";
import { toSafeJsonLd } from "@/lib/jsonld";

// Layout mein <JsonLd id="services-hive" /> likho: DB mein schema ho to page par print hota hai
export default async function JsonLd({ id }) {
  const page = await getPageCached(id);
  const json = toSafeJsonLd(page?.seo?.schema_jsonld);
  if (!json) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
