"use client";
import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Zap, PhoneCall, CheckCircle, MapPin, Lightbulb } from 'lucide-react';

export default function WhyARHeatingPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#027cc1] text-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-6">Why AR-Heating</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            AR Heating Services are your local and reliable expert plumbers and Heating Engineers in Harrow & Local areas. We specialise in all types of gas services including boiler & heating repair, installation, and servicing. We provide engineers who are always available, and we have a 24/7 Emergency Call out service.
            
           Whether you are looking to have major works or something small and simple to be repaired or installed, Harrow Boiler Heating Services can help.


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