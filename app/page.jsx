import {HeroSlider} from "./Components/HeroSlider"
import {ServicesList} from "./Components/ServiceList";
import {WhyChooseUs} from "./Components/Strategy";
import {AboutSection} from "./Components/AboutSection";
import {CTA} from "./Components/Cta";

export default function Home() {
  return (
    <>
       <HeroSlider/>
      <ServicesList/>
      <WhyChooseUs/>
      <AboutSection/>
      <CTA/>
      
    </>
  );
}