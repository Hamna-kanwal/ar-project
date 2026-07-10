"use client";
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import CtaBanner from '../../Components/CTA';

const serviceDetails = [
  {
    title: "How fast can you reach me?  ",
    desc: "We know a heating or gas fault can turn serious fast. We aim to reach you soon, make the area safe, and sort the fault.  ",
    img: "/heatingstallation2.jpg"
  },
  {
    title: "Are you safe to call for gas faults?  ",
    desc: "Our Gas Safe engineers deal with leaks and faults the right way. We keep you and your home safe, then get things working again.  ",
    img: "/heatingstallation3.jpg"
  }
];

const faqs = [
  { q: "I smell gas. What do I do? ", a: "Open windows, do not touch switches, turn off the gas at the meter if you can, and call the gas emergency line on 0800 111 999. Then call us.  " },
  { q: "Do you come out at short notice? ", a: "Yes. We work to reach you fast when a fault cannot wait." },
  { q: "What faults do you cover? ", a: "Gas leaks, dead boilers, burst pipes, and more." },
];

export default function ServicesAndFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <NextImage
          src="/heatingstallation1.jpg"
          alt="Boiler breakdown and repair background"
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
             

Emergency<span className="text-orange-500">  Servicves </span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
A gas leak, a dead boiler, or water where water should not be. Some jobs cannot wait. Call us and we come fast. 

We make things safe, find the fault, and fix the problem, so your home is back to normal soon. 
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
                <NextImage
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{s.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className={`border-2 rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'border-orange-500' : 'border-gray-200'}`}
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className={`w-full p-6 text-left font-semibold flex justify-between items-center transition-colors duration-300 ${isOpen ? 'bg-orange-50' : 'bg-white hover:bg-gray-50'}`}
                  >
                    <span className="text-gray-900 font-bold">{faq.q}</span>
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold transition-transform duration-300 ${isOpen ? 'bg-orange-500' : 'bg-orange-500'}`}>
                      {isOpen ? '×' : '+'}
                    </span>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 pt-0 text-gray-600 bg-white">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}