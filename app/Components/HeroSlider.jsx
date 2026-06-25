"use client";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const SLIDES = [
  { 
    title: "Heating Installation", 
    desc: "We can offer free no obligation quotes and the best possible advice on different types of heating systems, boilers and the best options that will suit your needs.", 
    img: "/slide3.jpg", 
    buttonText: "Heating Installation", 
    buttonLink: "/heating-installation" 
  },
  { 
    title: "General Installation", 
    desc: "AR Boiler Heating offers a range of general services to complement our boiler, heating, and plumbing offerings.", 
    img: "/slide4.jpg", 
    buttonText: "General Installation", 
    buttonLink: "/general-installation" 
  },
  { 
    title: "Heating & Plumbing", 
    desc: "AR Heating offers an extensive range of premium quality central heating design, installation, repairs and associated plumbing services.", 
    img: "/slide5.jpg", 
    buttonText: "Heating & Plumbing", 
    buttonLink: "/heating-plumbing" 
  },
  { 
    title: "Power Flushing", 
    desc: "A Powerflush is a process for your boiler that removes any dirt, sludge, rust and debris accumulated within your system over time.", 
    img: "/HeatingHot.jpg", 
    buttonText: "Power Flushing", 
    buttonLink: "/power-flushing" 
  },
  { 
    title: "Megaflo Cylinder Installation", 
    desc: "Are you looking to install a Megaflo unvented cylinder heating system? We provide a professional and cost effective solution.", 
    img: "/megaflow-slide.jpg", 
    buttonText: "Megaflo Installation", 
    buttonLink: "/megaflo-installation" 
  },
  { 
    title: "Hive Thermostat Installation", 
    desc: "AR Heating Services Gas Safe Registered engineers are qualified for Hive installations, we can install Hive on its own and for a new boiler installation.", 
    img: "/nestheat.jpg", 
    buttonText: "Hive Thermostat Installation", 
    buttonLink: "/hive-installation" 
  },
  { 
    title: "Boiler Installation", 
    desc: "AR Heating Service provide excellent services for installation of new boilers. Our expert Gas Safe engineers specialise in fitting world class eco-efficient boilers.", 
    img: "/slide2.jpg", 
    buttonText: "Boiler Installation", 
    buttonLink: "/boiler-installation" 
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
    <section className="relative overflow-hidden bg-[#003b5c] min-h-[60vh] w-full">
      {/* 1. Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === selectedIndex ? "opacity-90" : "opacity-0"}`} 
          >
            <Image src={slide.img} alt="Background" fill className="object-cover" priority />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003b5c] via-[#003b5c]/90 to-transparent z-[1]" />
      </div>

      {/* 2. Carousel Layer with Margin-Bottom & White Boundary */}
      <div className="relative z-10 pt-16 lg:pt-24 mb-16" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 px-4 md:px-12 flex justify-center xl:justify-start items-center min-h-[50vh]">
              {/* Added 'border border-white' for boundary */}
              <div className="w-full max-w-4xl bg-white/[0.03] backdrop-blur-sm border border-white rounded-[2.5rem] p-10 md:p-14 text-center xl:text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-200 leading-tight mb-6 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto xl:mx-0 font-light">
                  {slide.desc}
                </p>
                <Link 
                  href={slide.buttonLink} 
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-gray-200 font-medium rounded-full transition-all active:scale-95 border border-white/10"
                >
                  {slide.buttonText} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h1>hamna</h1>

      {/* 3. Pagination Dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 transition-all duration-300 rounded-full ${index === selectedIndex ? "w-10 bg-orange-400" : "w-3 bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  );
}