import { getPageCached } from "@/lib/pageCache";
import GasCookerClient from "./GasCookerClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function GasCookerPage() {
  let content = null;

  try {
    const page = await getPageCached("services-gas-cooker");
    content = page?.body ?? null;
  } catch (err) {
    console.error("gas cooker page: could not load body", err);
    content = null;
  }

  return <GasCookerClient content={content} />;
}
