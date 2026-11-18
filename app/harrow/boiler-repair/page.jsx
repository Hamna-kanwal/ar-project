import { getPageCached } from "@/lib/pageCache";
import HarrowBoilerRepairClient from "./HarrowBoilerRepairClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function HarrowBoilerRepairPage() {
  let content = null;

  try {
    const page = await getPageCached("harrow-boiler-repair");
    content = page?.body ?? null;
  } catch (err) {
    console.error("harrow boiler repair page: could not load body", err);
    content = null;
  }

  return <HarrowBoilerRepairClient content={content} />;
}