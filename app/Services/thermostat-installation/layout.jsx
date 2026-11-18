import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("services-thermostat-installation");

export default function ServiceLayout({ children }) {
  return (
    <>
      <JsonLd id="services-thermostat-installation" />
      {children}
    </>
  );
}
