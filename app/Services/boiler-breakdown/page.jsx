import { getPageCached } from "@/lib/pageCache";
import BoilerBreakdownClient from "./BoilerBreakdownClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function BoilerBreakdownPage() {
  let content = null;

  try {
    const page = await getPageCached("services-boiler-breakdown");
    content = page?.body ?? null;
  } catch (err) {
    console.error("boiler breakdown page: could not load body", err);
    content = null;
  }

  return <BoilerBreakdownClient content={content} />;
}