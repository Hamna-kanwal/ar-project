"use client";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const SLIDES = [
  { title: "Boiler Installation in Watford & Harrow", desc: "New A-rated combi and system boilers from Worcester Bosch, Vaillant, Ideal and Baxi installed by Gas Safe engineers.", img: "/heating_installation.jpg", buttonText: "Heating Installation", buttonLink: "/heating-installation" },
  { title: "Gas Appliance & General Installation", desc: "Gas cookers, hobs, washing machines and dishwashers installed safely and compliantly.", img: "/general_installation.jpg", buttonText: "General Installation", buttonLink: "/general-installation" },
  { title: "Heating & Plumbing", desc: "From leaking taps to complete system repairs — premium central heating and plumbing services.", img: "/plumbing.jpg", buttonText: "Heating & Plumbing", buttonLink: "/heating-plumbing" },
  { title: "Power Flushing Specialists", desc: "Cold radiators or a noisy boiler? Our power flush removes sludge, rust and debris.", img: "/power.jpg", buttonText: "Power Flushing", buttonLink: "/power-flushing" },
  { title: "Megaflo Unvented Cylinder Installation", desc: "High-pressure hot water for busy homes. G3-qualified engineers supply and install.", img: "/megaflow-slide.jpg", buttonText: "Megaflo Installation", buttonLink: "/megaflo-installation" },
  { title: "Hive Smart Thermostat Installation", desc: "Control your heating from your phone and cut energy bills.", img: "/nestheat.jpg", buttonText: "Hive Thermostat Installation", buttonLink: "/hive-installation" },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
   <section className="relative w-full h-[100vh] overflow-hidden bg-white pt-24">
      {/* 1. Background Layer */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === selectedIndex ? "opacity-100" : "opacity-0"}`} 
          >
            <Image src={slide.img} alt="Background" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30" /> {/* Overlay for text readability */}
          </div>
        ))}
      </div>

      {/* 2. Content Carousel */}
      <div className="relative z-10 w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 flex items-center px-4 md:px-12">
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl max-w-xl border-l-8 border-[#027cc1] shadow-2xl">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{slide.title}</h1>
                <p className="text-gray-700 text-lg mb-8">{slide.desc}</p>
                <Link href={slide.buttonLink} className="inline-flex items-center px-8 py-4 bg-[#027cc1] text-white rounded-full font-bold hover:bg-[#0266a1] transition-all">
                  {slide.buttonText} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-3 rounded-full transition-all duration-300 ${index === selectedIndex ? "w-10 bg-[#027cc1]" : "w-3 bg-white"}`}
          />
        ))}
      </div>
    </section>
  );
}