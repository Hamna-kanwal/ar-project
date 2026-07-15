"use client";
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import CtaBanner from '../../Components/CTA';
import { Zap } from 'lucide-react';

const serviceDetails = [
  {
    title: "What is a landlord gas safety certificate (CP12)? ",
    desc: "A yearly gas safety check is a legal must for landlords. We check the boiler, cooker, and other gas fittings, then give you the paperwork you need. The record is known as a CP12. ",
    img: "/landlord2.jpg"
  },
  {
    title: "How quick is the check? ",
    desc: "We work around your tenants and get the check done with little fuss. You get your certificate fast, well before your due date. ",
    img: "/landlord3.jpg"
  }
];

const faqs = [
  { q: "How often do I need a gas safety check? ", a: "Once a year for each rented home, by law. " },
  { q: "Is a CP12 the same as a landlord certificate? ", a: "Yes. A CP12 is the record you get from a landlord gas safety check. " },
  { q: "How long is a CP12 valid? ", a: "One year. Book your next check before the date runs out. " },
  { q: "What if a fault turns up? ", a: "We tell you straight away and can often fix the fault the same day." },
];

export default function ServicesAndFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
        <NextImage
          src="/landlord1.jpg"
          alt="Boiler service background"
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl pt-28 md:pt-32">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            Landlord<span className="text-orange-500">certificate</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
           Renting out a home? The law says you need a gas safety check each year. We make the job quick and simple. 

We check your gas fittings and hand you your certificate, so you stay legal and your tenants stay safe. 
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/contact" className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition">Get my free quote</Link>
            <a href="tel:+447800657141" className="border-2 border-[#027cc1] text-[#027cc1] px-8 py-3 rounded-lg font-bold hover:bg-[#027cc1] hover:text-white transition">Call: +44 7800 657141</a>
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
  <section className="mb-12 mt-24 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-5xl mx-auto">
  <div className="mb-8">
    <h2 className="text-3xl font-extrabold" style={{ color: '#027cc1' }}>
      What The Check Covers
    </h2>
    <div className="w-20 h-1 bg-orange-500 mt-2 rounded-full"></div>
  </div>

  <ul className="grid md:grid-cols-2 gap-6">
    {[
      'Appliance checks: boiler, cooker, fire', 
      'Gas pipework tightness test', 
      'Carbon monoxide safety', 
      'Flues and air vent inspection', 
      'Safety cut-off device testing', 
      'Signed CP12 record provided'
    ].map((item, i) => (
      <li 
        key={i} 
        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-100 transition-all duration-300 group"
      >
        <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
          <Zap className="text-orange-500" size={20} />
        </div>
        <span className="text-gray-700 font-medium group-hover:text-blue-900 transition-colors">
          {item}
        </span>
      </li>
    ))}
  </ul>
</section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className={`border-2 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-orange-500' : 'border-gray-200'}`}>
                  <button 
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className={`w-full p-6 text-left font-bold flex justify-between items-center ${isOpen ? 'bg-orange-50' : 'bg-white hover:bg-gray-50'}`}
                  >
                    {faq.q}
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold transition-transform">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="p-6 pt-0 text-gray-600">
                        {faq.a}
                      </div>
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