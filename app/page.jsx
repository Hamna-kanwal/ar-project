import { HeroSlider } from "./Components/HeroSlider";
import { ServiceList } from "./Components/ServiceList";
import { WhyChooseUs } from "./Components/Strategy";
import { AboutSection } from "./Components/AboutSection";
import { CTA } from "./Components/Cta";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <ServiceList />
      <Strategy />
      <AboutSection />
      <Cta />
    </>
  );
}