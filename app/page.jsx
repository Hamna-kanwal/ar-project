import { getPageCached } from "@/lib/pageCache";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";
import HeroSlider from "./Components/HeroSlider";
import ServiceList from "./Components/ServiceList";
import VideoSection from "./Components/VideoSection";
import AboutSection from "./Components/AboutSection";
import TrustSection from "./Components/Badge";
import Strategy from "./Components/Strategy";
import FAQSection from "./Components/Faqs";
import CTA from "./Components/CTA";

export const generateMetadata = () => buildMetadata("home");

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function Home() {
  let content = null;

  try {
    const page = await getPageCached("home");
    content = page?.body ?? null;
  } catch (err) {
    console.error("home page: could not load body", err);
    content = null;
  }

  return (
    <>
      <JsonLd id="home" />
      <HeroSlider content={content?.hero} />
      <ServiceList content={content?.services} />
      <VideoSection content={content?.video} />
      <AboutSection content={content?.about} />
      <TrustSection content={content?.trust} />
      <Strategy content={content?.strategy} />
      <FAQSection content={content?.faqs} />
      <CTA content={content?.cta} />
    </>
  );
}