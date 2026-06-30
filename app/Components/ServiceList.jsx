"use client";

import React, { useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-autoplay';
import { 
  ChevronLeft, ChevronRight, Wrench, Flame, Droplets, Thermometer, 
  ShieldCheck, Zap, AlertTriangle, Settings, Cpu, Anchor, 
  Sparkles, Filter, Briefcase, Home, ThermometerSun, Monitor, Disc 
} from 'lucide-react';

const SERVICES = [
  { name: "Boiler Installation", desc: "We provide expert installation for all types of boilers, ensuring efficiency and safety for your home.", icon: <Wrench />, link: "/boiler-installation" },
  { name: "Boiler Services", desc: "Annual maintenance checks to keep your heating system running safely and efficiently all year.", icon: <Settings />, link: "/boiler-services" },
  { name: "Heating Installation", desc: "Premium central heating design and installation services tailored to your specific home requirements.", icon: <Flame />, link: "/heating-installation" },
  { name: "Boiler Repair", desc: "Fast and reliable emergency response for all boiler breakdowns and heating system failures.", icon: <AlertTriangle />, link: "/repair" },
  { name: "Central Heating", desc: "Comprehensive system design, installation, and fitting for optimal home comfort.", icon: <ThermometerSun />, link: "/central-heating" },
  { name: "Underfloor Heating", desc: "Professional installation of efficient, comfortable, and modern floor heating solutions.", icon: <Home />, link: "/underfloor-heating" },
  { name: "General Installation", desc: "Expert advice and installation for gas cookers and various heating system components.", icon: <Briefcase />, link: "/general-installation" },
  { name: "Thermostat Install", desc: "Installation of modern smart thermostats for better energy management and control.", icon: <Thermometer />, link: "/thermostat" },
  { name: "Landlord Certificate", desc: "Gas Safe registered engineer inspections and certification for rental properties.", icon: <ShieldCheck />, link: "/landlord-certificate" },
  { name: "Emergency Services", desc: "Available 24/7 for emergency plumbing and heating disasters to keep your home safe.", icon: <Zap />, link: "/emergency" },
  { name: "General Plumbing", desc: "Expert solutions for all plumbing repairs, from leaking pipes to major system issues.", icon: <Droplets />, link: "/plumbing" },
  { name: "Power Flushing", desc: "Deep cleaning process to remove sludge and debris, improving your boiler's performance.", icon: <Filter />, link: "/power-flushing" },
  { name: "Hive Thermostat", desc: "Advanced smart home climate control installation for your ultimate convenience.", icon: <Cpu />, link: "/hive-thermostat" },
  { name: "Megaflo Cylinder", desc: "Professional and cost-effective installation of Megaflo unvented cylinder systems.", icon: <Anchor />, link: "/megaflo" },
  { name: "Gas Cooker", desc: "Safe, compliant installation services for all types of gas cooking appliances.", icon: <Flame />, link: "/gas-cooker" },
  { name: "Nest Thermostat", desc: "Intelligent learning thermostat installation to optimize your home heating habits.", icon: <Sparkles />, link: "/nest-thermostat" },
  { name: "Washing Machine", desc: "Quick, secure, and professional connection for your laundry appliances.", icon: <Monitor />, link: "/washing-machine" },
  { name: "Dishwasher Install", desc: "Reliable plumbing and connection services for your new kitchen dishwasher.", icon: <Disc />, link: "/dishwasher" },
];

// ... (imports wahi rahengi)

export default function ServicesList() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true, speed: 0.5, delay: 2000 })
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="max-w-[90rem] mx-auto px-16 relative">
        <h1 className="text-5xl font-bold text-[#0056b3] mb-12">Our Expertise</h1>
        
        <div className="overflow-hidden" ref={emblaRef}>
          {/* gap-4 add kiya taake boxes ke beech space rahe */}
          <div className="flex -ml-4">
            {SERVICES.map((item, index) => (
              // flex-[0_0_20%] ka matlab 1 row mein 5 cards
              <Link href={item.link} key={index} className="flex-[0_0_20%] pl-4">
                {/* h-72 se box chota ho gaya, p-6 padding kam kar di */}
                <div className="bg-[#0056b3] p-4 rounded-2xl flex flex-col items-center justify-center text-white hover:bg-[#004494] transition-all cursor-pointer shadow-lg h-72 group">
                  <div className="mb-4 p-4 bg-white/10 rounded-xl text-white group-hover:scale-110 transition-transform">
                    {React.cloneElement(item.icon, { size: 30 })}
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

        {/* Buttons ko thora adjust kiya */}
        <button onClick={scrollPrev} className="absolute left-2 top-1/2 p-2 text-[#0056b3] hover:text-[#003d7a]"><ChevronLeft size={40} /></button>
        <button onClick={scrollNext} className="absolute right-2 top-1/2 p-2 text-[#0056b3] hover:text-[#003d7a]"><ChevronRight size={40} /></button>
      </div>
    </section>
  );
}