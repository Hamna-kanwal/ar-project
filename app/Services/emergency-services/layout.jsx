import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("services-emergency-services");

export default function ServiceLayout({ children }) {
  return (
    <>
      <JsonLd id="services-emergency-services" />
      {children}
    </>
  );
}
