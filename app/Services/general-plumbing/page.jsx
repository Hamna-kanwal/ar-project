"use client";
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import CtaBanner from '../../Components/CTA';

const serviceDetails = [
  {
    title: "What plumbing jobs do you fix?  ",
    desc: "Leaks, blocked drains, dodgy taps, and low pressure. We handle the common faults fast, before a small drip turns into a big bill. ",
    img: "/plumbing2.jpg"
  },
  {
    title: "Are your prices clear? ",
    desc: "We quote before we start and stick to the price. No mess, no surprise costs, no job too small.  ",
    img: "/plumbing3.jpg"
  }
];

const faqs = [
  { q: "Do you fix leaks fast?", a: "Yes. A leak can cause real harm, so we work quick to stop and fix the problem. " },
  { q: "Can you clear a blocked drain? ", a: "Yes. We clear blocks and check why the block formed." },
  { q: "Is there a call out charge? ", a: "We are clear on any charge up front, so you know the cost before we come. " },
];

export default function ServicesAndFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
        <NextImage
          src="/plumbing1.jpg"
          alt="Heating installation background"
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            General Plumbing<span className="text-orange-500 whitespace-nowrap"> & Repair</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
           From a dripping tap to a burst pipe, we cover the day to day plumbing jobs to keep your home running. 

We turn up on time, fix the fault, and leave the place clean. 
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