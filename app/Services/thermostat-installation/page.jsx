import { getPageCached } from "@/lib/pageCache";
import ThermostatInstallationClient from "./ThermostatInstallationClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function ThermostatInstallationPage() {
  let content = null;

  try {
    const page = await getPageCached("services-thermostat-installation");
    content = page?.body ?? null;
  } catch (err) {
    console.error("thermostat page: could not load body", err);
    content = null;
  }

  return <ThermostatInstallationClient content={content} />;
}