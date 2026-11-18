"use client";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import defaults from "../_defaults/home.json";

export const SLIDES = defaults.hero.slides;

export default function HeroSlider({ content }) {
  const slides = Array.isArray(content?.slides) && content.slides.length > 0 ? content.slides : SLIDES;

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
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
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
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-[1]" />
      </div>

      <div className="relative z-10 pt-16 mt-10 lg:pt-24 mb-16" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 px-4 md:px-12 flex justify-center xl:justify-start items-center min-h-[50vh]">
              <div className="w-full max-w-4xl bg-white/0 backdrop-blur-md border-2 border-[#027cc1] rounded-[2.5rem] p-8 md:p-10 text-center xl:text-left shadow-lg">
                <h1 className=" text-xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
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

      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
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