"use client";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const SLIDES = [
  { title: "Boiler Installation in Watford & Harrow", desc: "New A-rated combi and system boilers from Worcester Bosch, Vaillant, Ideal and Baxi installed by Gas Safe engineers with warranties up to 10 years.", img: "/heating_installation.jpg", buttonText: "Heating Installation", buttonLink: "/heating-installation" },
  { title: "Gas Appliance & General Installation", desc: "Gas cookers, hobs, washing machines and dishwashers installed safely and compliantly by qualified engineers alongside our boiler, heating and plumbing services.", img: "/general_installation.jpg", buttonText: "General Installation", buttonLink: "/general-installation" },
  { title: "Heating & Plumbing", desc: "From leaking taps to complete system repairs — premium central heating and plumbing services across Watford, Harrow and Hemel Hempstead, with same-day appointments available.", img: "/plumbing.jpg", buttonText: "Heating & Plumbing", buttonLink: "/heating-plumbing" },
  { title: "Power Flushing Specialists", desc: "Cold radiators or a noisy boiler? Our power flush removes sludge, rust and debris from your heating system restoring heat output and extending your boiler's life.", img: "/power.jpg", buttonText: "Power Flushing", buttonLink: "/power-flushing" },
  { title: "Megaflo Unvented Cylinder Installation", desc: "High-pressure hot water for busy homes. G3-qualified engineers supply and install Megaflo unvented cylinders professional, certified and cost-effective.", img: "/megaflow-slide.jpg", buttonText: "Megaflo Installation", buttonLink: "/megaflo-installation" },
  { title: "Hive Smart Thermostat Installation", desc: "Control your heating from your phone and cut energy bills. Gas Safe engineers install and configure Hive standalone or with your new boiler.", img: "/nestheat.jpg", buttonText: "Hive Thermostat Installation", buttonLink: "/hive-installation" },
  { title: "Gas Appliance & General Installation", desc: " Gas cookers, hobs, washing machines and dishwashers installed safely and compliantly by qualified engineers alongside our boiler, heating and plumbing services.", img: "/slide2.jpg", buttonText: "Boiler Installation", buttonLink: "/boiler-installation" },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, 
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );
  
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
    <section className="relative overflow-hidden bg-white h-full w-full">
      {/* 1. Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === selectedIndex ? "opacity-100" : "opacity-0"}`} 
          >
            <Image 
              src={slide.img} 
              alt="Background" 
              fill 
              className="object-cover scale-x-[-1]" 
              priority 
            />
          </div>
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-[1]" />
      </div>

      {/* 2. Carousel Layer */}
      <div className="relative z-10 pt-16 lg:pt-24 mb-16" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 px-4 md:px-12 flex justify-center xl:justify-start items-center min-h-[50vh]">
              <div className="w-full max-w-4xl bg-white/0 backdrop-blur-md border-2 border-[#027cc1] rounded-[2.5rem] p-2 md:p-10 text-center xl:text-left shadow-lg">
                <h1 className="text-2xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-800 text-lg mb-4 max-w-xl mx-auto xl:mx-0 font-medium">
                  {slide.desc}
                </p>
                <Link 
                  href={slide.buttonLink} 
                  className="inline-flex items-center px-8 py-4 bg-[#027cc1] hover:bg-[#0266a1] text-white font-semibold rounded-full transition-all active:scale-95 shadow-md"
                >
                  {slide.buttonText} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Pagination Dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 transition-all duration-300 rounded-full ${index === selectedIndex ? "w-10 bg-[#027cc1]" : "w-3 bg-gray-400"}`}
          />
        ))}
      </div>
    </section>
  );
}