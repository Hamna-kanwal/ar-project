"use client";
import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Zap, PhoneCall, CheckCircle, MapPin, Lightbulb } from 'lucide-react';

export default function WhyARHeatingPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
    {/* Hero Section */}
<section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
  {/* The Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center" 
    style={{ backgroundImage: "url('/boiler.jpg')" }} 
  />
  
  {/* The Subtle White Overlay (bg-white/60 gives a light wash) */}
  <div className="absolute inset-0 bg-white/80" /> 

  <div className="relative z-10 text-center px-6 max-w-4xl">
    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
      Why AR-Heating
      
    </h1>
    <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
      If your business wants to understand its energy or water costs more clearly, our experts can provide <span className="italic underline">independent review and guidance.</span>
    </p>
  </div>
</section>

      {/* Main Content Area - GAP BARA DIYA */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
        
        {/* Left: Main Content */}
        <div className="md:col-span-2 space-y-12">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
             The Customer Care Centre lines are open 24 hours a day, 365 days a year.

We provide best Customer Care to deal with all emergency, general service and preventative maintenance calls quickly and efficiently.

Our integrated IT system enables us to identify, locate and assign appropriately skilled operatives to attend each call out. Our resources enable us to respond quickly to emergency situations and fault reports.
            </p>
          </div>
          
          {/* Enhanced Customer Care Section */}
          <div className="bg-white p-2 rounded-3xl border border-blue-100 shadow-xl grid md:grid-cols-2 gap-0 items-center overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-[#027cc1]">Customer Care and Communication Centre</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                The Customer Care Centre lines are open 24 hours a day, 365 days a year. 
                We provide best Customer Care to deal with all emergency, general service and preventative maintenance calls quickly and efficiently.
              </p>
            </div>
            <div className="relative h-full min-h-[250px] w-full">
              <Image 
                src="/about.jpg" // Replace with your image
                alt="Customer Care" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Right: Sidebar - Cards ko thora "Fat" (spacious) banaya */}
        <div className="space-y-10">
          <div className="p-8 border border-gray-100 rounded-3xl shadow-lg bg-white">
            <h3 className="font-bold text-xl mb-6 text-[#027cc1] border-l-4 border-orange-500 pl-3">Our Services</h3>
            <ul className="space-y-4 text-sm text-gray-700">
              {["Heating Installation", "Boiler Installation", "Boiler Repairs", "Boiler Servicing", "General Plumbing & Repair", "Gas Cooker Installation"].map(item => (
                <li key={item} className="flex items-center gap-3 py-2 border-b border-gray-50 hover:text-[#027cc1] transition-colors">
                    <CheckCircle size={18} className="text-green-500"/> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-xl mb-6 text-[#027cc1] border-l-4 border-orange-500 pl-3">Help & Advice</h3>
            <ul className="space-y-5">
              {[
                { name: "Areas we cover", icon: <MapPin className="text-[#027cc1]" /> },
                { name: "Contact our team", icon: <PhoneCall className="text-[#027cc1]" /> },
                { name: "Heating Tips", icon: <Lightbulb className="text-orange-500" /> },
                { name: "Safety Tips", icon: <ShieldCheck className="text-green-600" /> },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 transition-all cursor-pointer">
                  <span className="p-3 bg-gray-100 rounded-xl">{item.icon}</span>
                  <span className="font-medium text-gray-700">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


    </main>
  );
}