import HeroSlider from "./Components/HeroSlider";
import ServiceList from "./Components/ServiceList";
import AboutSection from "./Components/AboutSection";
import TrustSection from "./Components/Badge"
import Strategy from "./Components/Strategy";
import FAQSection from "./Components/Faqs" // Aapki file mein ye 'WhyChooseUs' hai, so use 'WhyChooseUs'

import CTA from "./Components/CTA";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <ServiceList />
      <AboutSection />
      <TrustSection />
      <Strategy /> 
      <FAQSection />
      <CTA />
    </>
  );
}