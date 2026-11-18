import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("contact");

export default function ContactLayout({ children }) {
  return (
    <>
      <JsonLd id="contact" />
      {children}
    </>
  );
}