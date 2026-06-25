import HeroSlider from "./Components/HeroSlider";
import ServiceList from "./Components/ServiceList";
import Strategy from "./Components/Strategy"; // Aapki file mein ye 'WhyChooseUs' hai, so use 'WhyChooseUs'
import AboutSection from "./Components/AboutSection";
import CTA from "./Components/CTA";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <ServiceList />
      <Strategy /> 
      <AboutSection />
      <CTA />
    </>
  );
}