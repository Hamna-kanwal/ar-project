import { getPageCached } from "@/lib/pageCache";
import UnderfloorHeatingClient from "./UnderfloorHeatingClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function UnderfloorHeatingPage() {
  let content = null;

  try {
    const page = await getPageCached("services-underfloor-heating");
    content = page?.body ?? null;
  } catch (err) {
    console.error("underfloor heating page: could not load body", err);
    content = null;
  }

  return <UnderfloorHeatingClient content={content} />;
}
