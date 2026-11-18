import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("harrow-plumber");

export default function HarrowPlumberLayout({ children }) {
  return (
    <>
      <JsonLd id="harrow-plumber" />
      {children}
    </>
  );
}