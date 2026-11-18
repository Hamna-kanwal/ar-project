import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("services-megaflo");

export default function ServiceLayout({ children }) {
  return (
    <>
      <JsonLd id="services-megaflo" />
      {children}
    </>
  );
}
