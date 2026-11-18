import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("about-us");

export default function AboutLayout({ children }) {
  return (
    <>
      <JsonLd id="about-us" />
      {children}
    </>
  );
}