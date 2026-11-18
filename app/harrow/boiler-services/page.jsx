import { getPageCached } from "@/lib/pageCache";
import HarrowBoilerServiceClient from "./HarrowBoilerServiceClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function HarrowBoilerServicePage() {
  let content = null;

  try {
    const page = await getPageCached("harrow-boiler-service");
    content = page?.body ?? null;
  } catch (err) {
    console.error("harrow boiler service page: could not load body", err);
    content = null;
  }

  return <HarrowBoilerServiceClient content={content} />;
}