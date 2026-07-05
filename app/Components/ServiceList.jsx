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
  { name: "Boiler Installation", desc: " A-rated combi, system and conventional boilers installed with manufacturer warranties up to 10 years.", icon: <Wrench />, link: "/boiler-installation" },
  { name: "Boiler Services", desc: " Annual servicing that keeps your warranty valid, your bills lower and your family safe.", icon: <Settings />, link: "/boiler-services" },
  { name: "Heating Installation", desc: "Complete central heating design and installation, tailored to your home and budget.", icon: <Flame />, link: "/heating-installation" },
  { name: "Boiler Repair", desc: "Same day diagnosis and repair for all major boiler brands, error codes and breakdowns.", icon: <AlertTriangle />, link: "/repair" },
  { name: "Central Heating", desc: "Radiators, pipework and controls designed, fitted and balanced for even, efficient warmth.", icon: <ThermometerSun />, link: "/central-heating" },
  { name: "Underfloor Heating", desc: "Wet and electric underfloor heating installed for modern, energy-efficient comfort.", icon: <Home />, link: "/underfloor-heating" },
  { name: "General Installation", desc: "Safe, certified installation of gas cookers, hobs and heating system components.", icon: <Briefcase />, link: "/general-installation" },
  { name: "Thermostat Install", desc: "Smart and programmable thermostats fitted for better control and lower energy bills.", icon: <Thermometer />, link: "/thermostat" },
  { name: "Landlord Certificate", desc: "CP12 gas safety inspections for rental properties, with same-day certificates issued.", icon: <ShieldCheck />, link: "/landlord-certificate" },
  { name: "Emergency Services", desc: "24/7 emergency plumbers and heating engineers at your door in 60–90 minutes.", icon: <Zap />, link: "/emergency" },
  { name: "General Plumbing", desc: "Leaks, taps, toilets, pipework and bathroom repairs fixed fast by local plumbers.", icon: <Droplets />, link: "/plumbing" },
  { name: "Power Flushing", desc: "Deep system clean that removes sludge and rust to restore radiator and boiler performance", icon: <Filter />, link: "/power-flushing" },
  { name: "Hive Thermostat", desc: "Hive smart heating installed and paired to your phone before we leave.", icon: <Cpu />, link: "/hive-thermostat" },
  { name: "Megaflo Cylinder", desc: "G3-certified installation of Megaflo unvented cylinders for powerful mains-pressure hot water.", icon: <Anchor />, link: "/megaflo" },
  { name: "Gas Cooker", desc: " Gas Safe installation and connection of all cooker and hob types, fully compliant.", icon: <Flame />, link: "/gas-cooker" },
  { name: "Nest Thermostat", desc: "Google Nest learning thermostats are installed to cut heating costs automatically.", icon: <Sparkles />, link: "/nest-thermostat" },
  { name: "Washing Machine", desc: "Quick, secure plumbing and connection for new washing machines.", icon: <Monitor />, link: "/washing-machine" },
  { name: "Dishwasher Install", desc: "Reliable water supply, drainage and connection for your new dishwasher.", icon: <Disc />, link: "/dishwasher" },
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
        <h1 className="text-5xl font-bold text-[#027cc1] mb-12">Our Expertise</h1>
        
        <div className="overflow-hidden" ref={emblaRef}>
          {/* gap-4 add kiya taake boxes ke beech space rahe */}
          <div className="flex -ml-4">
            {SERVICES.map((item, index) => (
              <Link href={item.link} key={index} className="pl-4 flex-[0_0_100%] sm:flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] xl:flex-[0_0_20%]">
                <div className="bg-[#027cc1] p-4 rounded-2xl flex flex-col items-center justify-center text-white hover:bg-[#004494] transition-all cursor-pointer shadow-lg h-72 group">
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