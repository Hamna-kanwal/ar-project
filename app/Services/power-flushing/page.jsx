import { getPageCached } from "@/lib/pageCache";
import PowerFlushingClient from "./PowerFlushingClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function PowerFlushingPage() {
  let content = null;

  try {
    const page = await getPageCached("services-power-flushing");
    content = page?.body ?? null;
  } catch (err) {
    console.error("power flushing page: could not load body", err);
    content = null;
  }

  return <PowerFlushingClient content={content} />;
}