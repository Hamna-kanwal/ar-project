import { getPageCached } from "@/lib/pageCache";
import LandlordClient from "./LandlordClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function LandlordPage() {
  let content = null;

  try {
    const page = await getPageCached("landlord-gas-safety");
    content = page?.body ?? null;
  } catch (err) {
    console.error("landlord page: could not load body", err);
    content = null;
  }

  return <LandlordClient content={content} />;
}