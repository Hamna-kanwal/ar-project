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
  { name: "Boiler Installation", desc: "We can help you with solutions to a variety of problems. We can assist with all kind of repairs including low boiler pressure, a leaking boiler, a boiler not igniting, a boiler making a banging noise, no hot water being produced, central heating not firing up and central heating leaks.", icon: <Wrench />, link: "/boiler-installation" },
  { name: "Boiler Services", desc: "Annual maintenance to keep your system safe.", icon: <Settings />, link: "/boiler-services" },
  { name: "Heating Installation", desc: "We offer an extensive range of premium quality central heating design, installation, repairs, and associated plumbing services. AR Heating & Plumbing Services is focused on ensuring you get the best service possible and focus on devising and delivering effective.Complete heating solutions for your home.", icon: <Flame />, link: "/heating-installation" },
  { name: "Boiler Repair", desc: "Fast response for breakdowns and emergencies.", icon: <AlertTriangle />, link: "/repair" },
  { name: "Central Heating", desc: "Comprehensive system design and fitting.", icon: <ThermometerSun />, link: "/central-heating" },
  { name: "Underfloor Heating", desc: "Efficient and comfortable floor heating systems.", icon: <Home />, link: "/underfloor-heating" },
  { name: "General Installation", desc: "We also offer a range of general services to complement our boiler, heating, and plumbing offerings including advice on new, repair and maintenance of your gas cooker, power flushes to ensure optimum performance of your boiler and heating system using quality chemicals.", icon: <Briefcase />, link: "/general-installation" },
  { name: "Thermostat Install", desc: "Smart controls for better energy management.", icon: <Thermometer />, link: "/thermostat" },
  { name: "Landlord Certificate", desc: "AR Heating Services Gas Safe Registered engineers are qualified for Thermostat installations, we can install Hive annd Nest on its own and for a new boiler installation. AR Heating Services are your local and reliable expert plumbers and heating engineers in Harrow, Watford, Hemel Hempstead.", icon: <ShieldCheck />, link: "/landlord-certificate" },
  { name: "Emergency Services", desc: "We offer an emergency call-out service, which is available 24 hours a day. Disasters can range from the devastation of a burst pipe to the lethal effects of contaminated water and carbon monoxide poisoning. Our specialist heating engineers will be at hand to help you in any situation.", icon: <Zap />, link: "/emergency" },
  { name: "General Plumbing", desc: "Reliable repairs for leaks and pipework.", icon: <Droplets />, link: "/plumbing" },
  { name: "Power Flushing", desc: "A Powerflush is a process for your boiler that removes any dirt, sludge, rust and debris accumulated within your system over time. If action is not taken then it could cause blockages or corrosion and ultimately reduce the efficiency of your boiler", icon: <Filter />, link: "/power-flushing" },
  { name: "Hive Thermostat", desc: "Advanced smart home climate control.", icon: <Cpu />, link: "/hive-thermostat" },
  { name: "Megaflo Cylinder", desc: "Are you looking to install a Megaflo unvented cylinder heating system and do you need a experienced, qualified engineer then you can rely on us to provide a professional and cost effective solution. AR Heating Services are your local and reliable expert.", icon: <Anchor />, link: "/megaflo" },
  { name: "Gas Cooker", desc: "Safe and compliant gas appliance installation.", icon: <Flame />, link: "/gas-cooker" },
  { name: "Nest Thermostat", desc: "Intelligent learning thermostats installed.", icon: <Sparkles />, link: "/nest-thermostat" },
  { name: "Washing Machine", desc: "Quick and secure appliance setup.", icon: <Monitor />, link: "/washing-machine" },
  { name: "Dishwasher Install", desc: "Professional plumbing and connection.", icon: <Disc />, link: "/dishwasher" },
];

export function ServicesList() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true, speed: 0.5, delay: 2000 })
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section 
      className="py-20 relative overflow-hidden" 
      style={{ background: '#0056b3' }}
    >
      <div className="max-w-7xl mx-auto px-12 relative">
        <h1 className="text-5xl font-bold text-white mb-12">Our Expertise</h1>
        
        <div className="overflow-hidden" ref={emblaRef}>
          {/* marginLeft adjusted for 3 items spacing */}
          <div className="flex" style={{ marginLeft: '-32px' }}>
            {SERVICES.map((item, index) => (
              // flex-[0_0_33.333%] ensures 3 items per line
              <Link href={item.link} key={index} className="flex-[0_0_33.333%] pl-8">
                {/* h-80 makes the boxes slightly larger, p-10 adds more internal space */}
                <div className="bg-[#003d7a]/80 p-4 rounded-3xl flex flex-col items-center justify-center text-white hover:border-[#F27C21] transition-all cursor-pointer shadow-xl border border-white/10 h-80 group">
                  <div className="mb-6 p-5 bg-white/10 rounded-2xl text-[#f97316] group-hover:scale-110 transition-transform">
                    {React.cloneElement(item.icon, { size: 40 })}
                  </div>
                  <h3 className="font-bold text-center text-xl mb-3">{item.name}</h3>
                  <p className="text-sm text-white/80 text-center leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button onClick={scrollPrev} className="absolute left-0 top-1/2 p-2 text-white hover:text-white"><ChevronLeft size={48} /></button>
        <button onClick={scrollNext} className="absolute right-0 top-1/2 p-2 text-white hover:text-white"><ChevronRight size={48} /></button>
      </div>
    </section>
  );
}