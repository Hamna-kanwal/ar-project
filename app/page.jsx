import { Navbar } from "./Components/navbar";  
import {ServicesList} from "./Components/ServiceList";
import {WhyChooseUs} from "./Components/Strategy";
import {AboutSection} from "./Components/AboutSection"



export default function Home() {
  return (
    <>
      <Navbar />
      <ServicesList/>
      <WhyChooseUs/>
      <AboutSection/>
      
    </>
  );
}