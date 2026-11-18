import { getPageCached } from "@/lib/pageCache";
import EmergencyServicesClient from "./EmergencyServicesClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function EmergencyServicesPage() {
  let content = null;

  try {
    const page = await getPageCached("services-emergency-services");
    content = page?.body ?? null;
  } catch (err) {
    console.error("emergency services page: could not load body", err);
    content = null;
  }

  return <EmergencyServicesClient content={content} />;
}
