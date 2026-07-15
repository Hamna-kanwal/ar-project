"use client";

import React, { useState } from 'react';
import { FileText, Clock, CheckCircle2, ChevronDown, ChevronUp, Wrench } from 'lucide-react';

export default function LandlordGasSafety() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="bg-white text-slate-800 font-sans">
      {/* Hero Section */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: '#027cc1' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Landlord Gas Safety Certificates (CP12)</h1>
      </section>

      <main className="max-w-4xl mx-auto py-12 px-6 space-y-16">
        
        {/* Section 1: Definition */}
        <section className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold" style={{ color: '#027cc1' }}>What is a landlord gas safety certificate (CP12)?</h2>
            <p className="leading-relaxed text-lg">A yearly gas safety check is a legal must for landlords. We check the boiler, cooker, and other gas fittings, then give you the paperwork you need. The record is known as a CP12.</p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center bg-slate-100 p-8 rounded-xl">
            <FileText size={64} style={{ color: '#e95000' }} />
          </div>
        </section>

        {/* Section 2: Speed */}
        <section className="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold" style={{ color: '#027cc1' }}>How quick is the check?</h2>
            <p className="leading-relaxed text-lg">We work around your tenants and get the check done with little fuss. You get your certificate fast, well before your due date.</p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center bg-slate-100 p-8 rounded-xl">
            <Clock size={64} style={{ color: '#e95000' }} />
          </div>
        </section>

        {/* What the check covers */}
        <section className="bg-slate-900 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#e95000' }}>WHAT THE CHECK COVERS</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Each gas appliance: boiler, cooker, and fire",
              "The gas pipework, checked for tightness",
              "Safe burning of gas, with a check for carbon monoxide",
              "Flues and air vents, clear and safe",
              "Safety cut off devices, tested to work",
              "A signed CP12 record for your files"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg">
                <CheckCircle2 size={20} style={{ color: '#e95000' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#027cc1' }}>FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-4">
            {[
              { q: "How often do I need a gas safety check?", a: "Once a year for each rented home, by law." },
              { q: "Is a CP12 the same as a landlord certificate?", a: "Yes. A CP12 is the record you get from a landlord gas safety check." },
              { q: "How long is a CP12 valid?", a: "One year. Book your next check before the date runs out." },
              { q: "What if a fault turns up?", a: "We tell you straight away and can often fix the fault the same day." }
            ].map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="w-full p-5 text-left font-bold flex justify-between items-center hover:bg-slate-50"
                >
                  {faq.q}
                  {activeIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeIndex === i && <div className="p-5 pt-0 text-slate-600 bg-slate-50 border-t">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}