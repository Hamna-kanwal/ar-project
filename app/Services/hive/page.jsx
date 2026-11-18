import { getPageCached } from "@/lib/pageCache";
import HiveClient from "./HiveClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function HivePage() {
  let content = null;

  try {
    const page = await getPageCached("services-hive");
    content = page?.body ?? null;
  } catch (err) {
    console.error("hive page: could not load body", err);
    content = null;
  }

  return <HiveClient content={content} />;
}