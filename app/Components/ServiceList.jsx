"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-autoplay";
import {
  ChevronLeft, ChevronRight, Wrench, Flame, Droplets, Thermometer,
  ShieldCheck, Zap, AlertTriangle, Cpu, Anchor,
  Sparkles, Filter, Briefcase, Home, ThermometerSun, Monitor, Disc
} from "lucide-react";
import defaults from "../_defaults/home.json";

// Icons stay in code and are matched to database items by position
const ICONS = [
  <Wrench />, <Flame />, <AlertTriangle />, <ThermometerSun />, <Home />, <Briefcase />,
  <Thermometer />, <ShieldCheck />, <Zap />, <Droplets />, <Filter />, <Cpu />,
  <Anchor />, <Flame />, <Sparkles />, <Monitor />, <Disc />,
];

export default function ServicesList({ content }) {
  const heading = content?.heading || defaults.services.heading;
  const items = Array.isArray(content?.items) && content.items.length > 0 ? content.items : defaults.services.items;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true, speed: 0.5, delay: 2000 })
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-10 relative overflow-hidden bg-white">
      <div className="max-w-[90rem] mx-auto px-16 relative">
        <h2 className="text-5xl font-bold text-[#027cc1] mb-12">{heading}</h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {items.map((item, index) => (
              <Link href={item.link} key={index} className="pl-4 flex-[0_0_100%] sm:flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] xl:flex-[0_0_20%]">
                <div className="bg-[#027cc1] p-4 rounded-2xl flex flex-col items-center justify-center text-white hover:bg-[#004494] transition-all cursor-pointer shadow-lg h-72 group">
                  <div className="mb-4 p-4 bg-white/10 rounded-xl text-white group-hover:scale-110 transition-transform">
                    {React.cloneElement(ICONS[index % ICONS.length], { size: 30 })}
                  </div>
                  <h3 className="font-bold text-center text-lg mb-2 leading-tight">{item.name}</h3>
                  <p className="text-xs text-white/90 text-center leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button onClick={scrollPrev} className="absolute left-2 top-1/2 p-2 text-[#0056b3] hover:text-[#003d7a]"><ChevronLeft size={40} /></button>
        <button onClick={scrollNext} className="absolute right-2 top-1/2 p-2 text-[#0056b3] hover:text-[#003d7a]"><ChevronRight size={40} /></button>
      </div>
    </section>
  );
}