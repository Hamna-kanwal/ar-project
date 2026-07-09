"use client";
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { Zap, Users, Home, Wrench, Settings } from 'lucide-react';

const serviceDetails = [
  {
    title: "How do I know I need a new boiler?",
    desc: "Boilers rarely quit all at once. Most drop hints first. Watch for higher bills for no clear reason, radiators slow to warm, odd bangs or gurgles, a yellow flame in place of a blue one, and repair bills piling up. A boiler past ten years old on a second or third fix is often near the end.",
    img: "/installation.jpg"
  },
  {
    title: "Which boiler is best for my home?",
    desc: "The best boiler is the one built for your home and your water use. A combi heats water on demand with no tank. A system boiler feeds many taps at once. A regular boiler suits older homes with a tank in the loft. We look at your home and help you choose.",
    img: "/Boiler_servicing.jpg"
  }
];
const boilerData = [
  {
    title: "Combi",
    bestFor: "Flats and small homes",
    tank: "No tank",
    points: "Quick fits, saves space, cheap to run",
    icon: <Zap className="text-[#f97316]" size={32} />
  },
  {
    title: "System",
    bestFor: "Busy family homes",
    tank: "Yes, a cylinder",
    points: "Runs many taps at once, steady flow",
    icon: <Settings className="text-[#f97316]" size={32} />
  },
  {
    title: "Regular",
    bestFor: "Older homes with a loft tank",
    tank: "Yes, tank and cylinder",
    points: "Suits homes with the old set up in place",
    icon: <Home className="text-[#f97316]" size={32} />
  }
];

const faqs = [
  { q: "How often should I service my boiler?", a: "Once a year is best. A yearly check keeps your boiler safe and your warranty valid." },
  { q: "How long does a service take?", a: "Most services take under an hour. We work fast and leave no mess." },
  { q: "Does a service keep my warranty valid?", a: "In most cases, yes. Many makers ask for a yearly service to keep the warranty live. Keep your record safe." },
  { q: "Do you check for carbon monoxide?", a: "Yes. We make sure your boiler burns safe and does not leak fumes into your home." },
];

export default function ServicesAndFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      {/* Hero Section - White Blur Glassmorphism */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/boiler.jpg')" }} />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md" /> 
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            Boiler <span className="text-orange-500">Installation</span> 
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
            A new boiler keeps your home warm and your hot water flowing. When your old one gives up, you want a quick, clean fit from people you trust. 
            We help you pick the right boiler, give you a fixed price up front, and finish most fits in one day. No mess, no fuss.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/contact" className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600">Get my free quote</Link>
            <a href="tel:+447800657141" className="border-2 border-[#027cc1] text-[#027cc1] px-8 py-3 rounded-lg font-bold hover:bg-[#027cc1] hover:text-white">Call: +44 7800 657141</a>
          </div>
        </div>
      </section>

      {/* Zig-Zag Service Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {serviceDetails.map((s, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="relative h-[350px] w-full rounded-2xl overflow-hidden shadow-xl">
                <NextImage src={s.img} alt={s.title} fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{s.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

  <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-[#027cc1] text-center mb-12">Compare Our Boiler Types</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {boilerData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-3xl border-2 border-[#f97316] shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Orange Border Icon Area */}
            <div className="mb-6 flex justify-center bg-[#f97316]/10 w-20 h-20 rounded-2xl items-center mx-auto border border-[#f97316]/20">
              {item.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-[#027cc1] text-center mb-6">{item.title}</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex flex-col border-b border-gray-100 pb-3">
                <span className="font-bold text-[#027cc1] uppercase text-xs">Best for:</span> 
                <span className="text-gray-700 font-medium">{item.bestFor}</span>
              </div>
              <div className="flex flex-col border-b border-gray-100 pb-3">
                <span className="font-bold text-[#027cc1] uppercase text-xs">Hot water tank:</span> 
                <span className="text-gray-700 font-medium">{item.tank}</span>
              </div>
              <div className="flex flex-col pb-3">
                <span className="font-bold text-[#027cc1] uppercase text-xs">Good points:</span> 
                <span className="text-gray-700 font-medium">{item.points}</span>
              </div>
            </div>

            {/* Button */}
          
          </div>
        ))}
      </div>
    </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className={`border-2 rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'border-orange-500' : 'border-gray-200'}`}>
                  <button onClick={() => setOpenIndex(openIndex === i ? -1 : i)} className={`w-full p-6 text-left font-semibold flex justify-between items-center transition-colors duration-300 ${isOpen ? 'bg-orange-50' : 'bg-white hover:bg-gray-50'}`}>
                    <span className="text-gray-900 font-bold">{faq.q}</span>
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold transition-transform duration-300 ${isOpen ? 'bg-orange-500' : 'bg-orange-500'}`}>
                      {isOpen ? '×' : '+'}
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 pt-0 text-gray-600 bg-white">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}