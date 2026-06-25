import { HeroSlider } from "./Components/HeroSlider";
import { ServiceList } from "./Components/ServiceList";
import { Strategy } from "./Components/Strategy";
import { AboutSection } from "./Components/AboutSection";
import { Cta } from "./Components/Cta";

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