import { getPageCached } from "@/lib/pageCache";
import HarrowPlumberClient from "./HarrowPlumberClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function HarrowPlumberPage() {
  let content = null;

  try {
    const page = await getPageCached("harrow-plumber");
    content = page?.body ?? null;
  } catch (err) {
    console.error("harrow plumber page: could not load body", err);
    content = null;
  }

  return <HarrowPlumberClient content={content} />;
}