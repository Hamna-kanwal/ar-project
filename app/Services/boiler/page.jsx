"use client";
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import CtaBanner from '../../Components/CTA';

const serviceDetails = [
  {
    title: "Why does my boiler need a yearly service?",
    desc: "A yearly check spots small faults before they grow. A well kept boiler burns clean, uses less gas, and breaks down far less often. Many boiler warranties also ask for a yearly service to stay valid.",
    img: "/boiler11.jpg",
    // Blue glass theme styling
    bgGlass: "bg-sky-50/80 backdrop-blur-md border-sky-100",
    accentColor: "text-[#027cc1]"
  },
  {
    title: "What do you check in a service?",
    desc: "We look at the main parts, clean what needs a clean, and test the gas pressure and flow. We make sure your boiler burns in a safe way with no leaks. You get a clear report at the end and a heads up on anything worth a watch.",
    img: "/boiler12.jpg",
    // Orange glass theme styling
    bgGlass: "bg-orange-50/80 backdrop-blur-md border-orange-100",
    accentColor: "text-orange-500"
  }
];

const faqs = [
  { q: "How often should I service my boiler?", a: "Once a year is best. A yearly check keeps your boiler safe and your warranty valid. " },
  { q: "How long does a service take? ", a: "Most services take under an hour. We work fast and leave no mess." },
  { q: "Does a service keep my warranty valid? ", a: "In most cases, yes. Many makers ask for a yearly service to keep the warranty live. Keep your record safe. " },
  { q: "Do you check for carbon monoxide? ", a: "Yes. We make sure your boiler burns safe and does not leak fumes into your home. " },
];

export default function ServicesAndFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <NextImage
          src="/boiler.jpg"
          alt="Boiler service background"
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-[#027cc1]">
            Boiler <span className="text-orange-500"> Services </span>
          </h1>
          <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            A yearly boiler check keeps your home safe and your boiler running well. A small spend now saves a big bill later.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/contact" className="bg-orange-500 text-white px-7 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">Get my free quote</Link>
            <a href="tel:+447800657141" className="border-2 border-[#027cc1] text-[#027cc1] px-7 py-3 rounded-lg font-bold hover:bg-[#027cc1] hover:text-white transition-colors">Call: +44 7800 657141</a>
          </div>
        </div>
      </section>

      {/* Modern Alternating Glass Cards Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {serviceDetails.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={i} 
                className={`rounded-3xl p-6 md:p-10 shadow-lg border backdrop-blur-xl transition-all duration-300 hover:shadow-xl ${s.bgGlass} flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Image Container */}
                <div className="relative h-[320px] md:h-[380px] w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-md shrink-0">
                  <NextImage
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>

                {/* Content Container */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 px-2">
                  <h3 className={`text-2xl md:text-3xl font-bold ${s.accentColor}`}>
                    {s.title}
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="pt-2">
                    <Link 
                      href="/contact" 
                      className={`inline-flex items-center font-bold text-sm hover:underline ${s.accentColor}`}
                    >
                      Enquire about this service &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-orange-500 shadow-sm' : 'border-gray-200'}`}
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className={`w-full p-5 text-left font-semibold flex justify-between items-center transition-colors ${isOpen ? 'bg-orange-50/50 text-orange-600' : 'bg-white hover:bg-gray-50 text-gray-900'}`}
                  >
                    <span>{faq.q}</span>
                    <span className={`w-7 h-7 flex items-center justify-center rounded-full text-white text-sm font-bold transition-transform ${isOpen ? 'bg-orange-500 rotate-45' : 'bg-orange-500'}`}>
                      +
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5 pt-0 text-gray-600 bg-white">
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