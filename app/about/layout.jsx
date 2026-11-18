import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("about");

export default function AboutLayout({ children }) {
  return (
    <>
      <JsonLd id="about" />
      {children}
    </>
  );
}