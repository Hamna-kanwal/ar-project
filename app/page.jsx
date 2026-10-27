import HeroSlider from "./Components/HeroSlider";
import ServiceList from "./Components/ServiceList";
import VideoSection from "./Components/VideoSection";
import AboutSection from "./Components/AboutSection";
import TrustSection from "./Components/Badge"
import Strategy from "./Components/Strategy";
import FAQSection from "./Components/Faqs"
import CTA from "./Components/CTA";

export const metadata = {
  title: 'Gas Safe Heating Engineers in Watford | AR Heating',
  description: 'Boiler installation, repair and servicing in Watford and Harrow. Gas Safe No. 574111. Free fixed price quotes. Emergency callouts 24 hours.',
  openGraph: {
    title: 'Gas Safe Heating Engineers in Watford | AR Heating',
    description: 'Boiler installation, repair and servicing in Watford and Harrow. Gas Safe No. 574111. Free fixed price quotes. Emergency callouts 24 hours.',
    url: 'https://www.arheatingservice.co.uk/',
    images: [
      {
        url: 'https://www.arheatingservice.co.uk/heating_installation.webp',
      },
    ],
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <HeroSlider />
      <ServiceList />
      <VideoSection/>
      <AboutSection />
      <TrustSection />
      <Strategy /> 
      <FAQSection />
      <CTA />
    </>
  );
}