"use client";
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';

const serviceDetails = [
  {
    title: "Why does my boiler need a yearly service?",
    desc: "A yearly check spots small faults before they grow. A well kept boiler burns clean, uses less gas, and breaks down far less often. Many boiler warranties also ask for a yearly service to stay valid.",
    img: "/installation.jpg"
  },
  {
    title: "What do you check in a service?",
    desc: "We look at the main parts, clean what needs a clean, and test the gas pressure and flow. We make sure your boiler burns in a safe way with no leaks. You get a clear report at the end and a heads up on anything worth a watch.",
    img: "/Boiler_servicing.jpg"
  }
];

const faqs = [
  { q: "What does AR Heating Service provide?", a: "AR Heating Service provides a full range of boiler services including installation, repairs, and annual servicing." },
  { q: "How often should you carry out a boiler service check?", a: "We recommend a full boiler service every 12 months to ensure safety and efficiency." },
  { q: "Do you issue a Landlord Gas Safety Certificate?", a: "Yes, we issue Landlord Gas Safety Certificates (CP12) after completing a full inspection." }
];

export default function ServicesAndFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/boiler.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-white/70" /> 
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-[#027cc1]">
            Boiler <span className="text-orange-500"> Services</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mt-6 font-medium leading-relaxed">
            A yearly boiler check keeps your home safe and your boiler running well. A small spend now saves a big bill later. 
            Our Gas Safe engineers give your boiler a full once over.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/contact" className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30">
              Get my free quote
            </Link>
            <a href="tel:+447800657141" className="border-2 border-[#027cc1] text-[#027cc1] px-8 py-4 rounded-xl font-bold hover:bg-[#027cc1] hover:text-white transition-all">
              Call: +44 7800 657141
            </a>
          </div>
        </div>
      </section>

      {/* Premium Service Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {serviceDetails.map((s, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-orange-100 rounded-3xl rotate-3 opacity-50 transition-transform group-hover:rotate-6" />
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                  <NextImage src={s.img} alt={s.title} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">{s.title}</h2>
                <div className="w-20 h-1.5 bg-orange-500 rounded-full" />
                <p className="text-lg text-gray-600 leading-relaxed">{s.desc}</p>
                <Link href="/contact" className="inline-block text-[#027cc1] font-bold text-lg hover:text-orange-600 transition-colors">
                  Book this service →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'border-orange-500 shadow-md' : 'border-gray-200'}`}>
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)} 
                  className="w-full p-6 text-left font-bold text-lg flex justify-between items-center bg-white hover:bg-gray-50"
                >
                  {faq.q}
                  <span className={`text-2xl transition-transform ${openIndex === i ? 'rotate-45 text-orange-500' : 'text-gray-400'}`}>+</span>
                </button>
                {openIndex === i && (
                  <div className="p-6 pt-0 text-gray-600 bg-white border-t border-gray-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}