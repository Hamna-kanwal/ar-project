import { getPageCached } from "@/lib/pageCache";
import WashingMachineClient from "./WashingMachineClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function WashingMachinePage() {
  let content = null;

  try {
    const page = await getPageCached("services-washing-machine");
    content = page?.body ?? null;
  } catch (err) {
    console.error("washing machine page: could not load body", err);
    content = null;
  }

  return <WashingMachineClient content={content} />;
}
