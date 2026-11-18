import { getPageCached } from "@/lib/pageCache";
import DishwasherClient from "./DishwasherClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function DishwasherPage() {
  let content = null;

  try {
    const page = await getPageCached("services-dishwasher");
    content = page?.body ?? null;
  } catch (err) {
    console.error("dishwasher page: could not load body", err);
    content = null;
  }

  return <DishwasherClient content={content} />;
}
