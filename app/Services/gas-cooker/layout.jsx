import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("services-gas-cooker");

export default function ServiceLayout({ children }) {
  return (
    <>
      <JsonLd id="services-gas-cooker" />
      {children}
    </>
  );
}
