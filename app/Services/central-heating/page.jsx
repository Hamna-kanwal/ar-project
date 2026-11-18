import { getPageCached } from "@/lib/pageCache";
import CentralHeatingClient from "./CentralHeatingClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function CentralHeatingPage() {
  let content = null;

  try {
    const page = await getPageCached("services-central-heating");
    content = page?.body ?? null;
  } catch (err) {
    console.error("central heating page: could not load body", err);
    content = null;
  }

  return <CentralHeatingClient content={content} />;
}