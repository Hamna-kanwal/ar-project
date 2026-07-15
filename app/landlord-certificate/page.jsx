"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // یہاں تبدیلی کی ہے
import { Phone, MessageCircle, CalendarClock, Wrench, CheckCircle, Star } from 'lucide-react';


const LandlordGasSafety = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "How long does a gas safety check take?", a: "Usually 30 to 60 minutes, depending on how many gas appliances are in the property." },
    { q: "What happens if an appliance fails the inspection?", a: "If something's unsafe, our engineer isolates it on the spot. You'll get a clear explanation and an upfront quote for the repair." },
    { q: "Can letting agents pass on tenant details directly?", a: "Yes. We work this way with agencies across Watford, Harrow, and London." },
    { q: "How much does a CP12 cost?", a: "A CP12 roughly costs between £80 to £120." },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <section className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
        <Image
          src="/certificate.jpg"
          alt="Gas Safety Certificates"
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1] drop-shadow-lg">
            Landlord Gas Safety <span className="text-orange-500">Certificates</span>
          </h1>
        </div>
      </section>

      <main className="max-w-5xl mx-auto py-12 px-6">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#027cc1' }}>Keeping Your Tenants Safe is the Law</h2>
          <p className="mb-4">If you're a landlord or letting agent, keeping your tenants safe isn't optional, it's the law. Under the Gas Safety (Installation and Use) Regulations 1998, every rental property needs a valid gas safety certificate (CP12), renewed every 12 months.</p>
          <p>AR Heating Services has been carrying out landlord gas safety inspections for 18 years. We're Gas Safe registered (574111) and have certified 8000+ properties. Our job is simple: keep your properties legal and your tenants safe.</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4" style={{ borderTopColor: '#e95000' }}>
            <CalendarClock className="mb-3" style={{ color: '#e95000' }} size={40} />
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#027cc1' }}>Booking Made Easy</h3>
            <p>Send us the tenant's contact details, and we'll take it from there. We offer batch scheduling for property portfolios.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4" style={{ borderTopColor: '#027cc1' }}>
            <Wrench className="mb-3" style={{ color: '#027cc1' }} size={40} />
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#027cc1' }}>Qualified Engineers</h3>
            <p>Every inspection is carried out by a Gas Safe registered engineer with 11+ years of experience.</p>
          </div>
        </div>

        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#027cc1' }}>What Does a CP12 Inspection Cover?</h3>
          <ul className="space-y-4">
            {['Legal compliance certificate', 'Carbon monoxide safety checks', 'Appliance efficiency testing', 'Pressure and ignition safety', 'Early fault detection'].map((item, i) => (
              <li key={i} className="flex items-start gap-3"><CheckCircle className="text-orange-600 mt-1" size={20} /> {item}</li>
            ))}
          </ul>
        </section>

        <section className="py-10">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#027cc1' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`border-2 rounded-xl overflow-hidden transition-all ${openIndex === i ? 'border-orange-600' : 'border-gray-200'}`}>
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full p-6 text-left font-semibold flex justify-between items-center bg-white hover:bg-gray-50"
                >
                  <span>{faq.q}</span>
                  <span className="font-bold text-xl" style={{ color: '#e95000' }}>{openIndex === i ? '×' : '+'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="p-6 pt-0 text-gray-600 bg-white">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandlordGasSafety;