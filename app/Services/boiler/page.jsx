"use client";
import { useState } from 'react';
import { Wrench, Settings, Home } from 'lucide-react';
import NextImage from 'next/image'; // Image conflict resolve karne ke liye rename kiya

const services = [
  {
    title: "Boiler Installation",
    desc: "Our Gas Safe engineers specialise in fitting world-class eco-efficient boilers.",
    img: "/installation.jpg", 
    items: ["Vaillant, Potterton, Glo-Worm", "Ariston, Baxi, Worcester, Vokera", "Viessmann, Ferroli, Grant", "Free, no-obligation quote provided"],
    icon: <Wrench size={32} />
  },
  {
    title: "Boiler Repairs",
    desc: "Your boiler not working properly? Our expert engineers find the best solution.",
    img: "/boiler-repairs.jpg", 
    items: ["Diagnose the root cause accurately", "Find the correct solution", "Implement a lasting repair", "Affordable range of cost"],
    icon: <Settings size={32} />
  },
  {
    title: "Boiler Servicing",
    desc: "To ensure continued health and efficiency, we recommend a full service every 12 months.",
    img: "/Boiler_servicing.jpg", 
    items: ["Full appliance inspection", "Pressure and ventilation tested", "Safety regulations checked", "Any issues flagged and reported"],
    icon: <Home size={32} />
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
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/boiler.jpg')" }} 
        />
        <div className="absolute inset-0 bg-[#0056b3]/90" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Boiler <span className="text-orange-400">Services</span> 
          </h1>
          <p className="text-lg md:text-xl text-blue-50 leading-relaxed font-medium">
            Whatever the issue with your boiler, we can help. Our friendly and professional engineers 
            can assist with all manner of repairs, including low boiler pressure, a leaking boiler, 
            a boiler not igniting, a boiler making a banging noise, no hot water being produced, 
            central heating not firing up and central heating leaks. We also offer servicing, 
            making sure your boiler meets current safety regulations and is operating at full efficiency.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-12">Everything your boiler needs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all overflow-hidden">
                <div className="relative w-full h-48">
                  <NextImage src={s.img} alt={s.title} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <div className="text-orange-500 mb-6">{s.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                  <p className="text-gray-600 mb-6">{s.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {s.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">✓ {item}</li>
                    ))}
                  </ul>
                  <button className="border-2 border-orange-500 text-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition">
                    View More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            
            {/* Smooth Slide Animation using max-height */}
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
    </>
  );
}