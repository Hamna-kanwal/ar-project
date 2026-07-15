"use client";
import React, { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Calendar, 
  CheckCircle, 
  FileText, 
  AlertTriangle, 
  Flame, 
  Gauge, 
  MapPin, 
  HelpCircle, 
  MessageSquare, 
  Phone,
  Code,
  Star
} from 'lucide-react';

const faqs = [
  { 
    q: "How long does a gas safety check take?", 
    a: "Usually 30 to 60 minutes, depending on how many gas appliances are in the property — a boiler, cooker, and fireplace together will take longer than a single appliance." 
  },
  { 
    q: "What happens if an appliance fails the inspection?", 
    a: "If something's unsafe, our engineer isolates it on the spot to protect your tenants. You'll get a clear explanation of what's wrong and an upfront quote for the repair — no surprises, no pressure." 
  },
  { 
    q: "Can letting agents pass on tenant details directly?", 
    a: "Yes. We already work this way with agencies across Harrow, Watford, West and Greater London. Send over the tenant's contact details and we handle scheduling from there." 
  },
  { 
    q: "How much does a CP12 cost?", 
    a: "A CP12 roughly costs between £80 to £120." 
  }
];

export default function GasSafetyPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      
      {/* Hero Section */}
      <section className="relative w-full h-[800px] flex items-center justify-center overflow-hidden">
        <NextImage
          src="/certification.jpg"
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
            Landlord Gas <span className="text-orange-500"> safety Certificate</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
            If you're a landlord or letting agent, keeping your tenants safe isn't optional, it's the law. Under the Gas Safety (Installation and Use) Regulations 1998, every rental property needs a valid gas safety certificate (CP12), renewed every 12 months.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/contact" className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600">Get my free quote</Link>
            <a href="tel:+447800657141" className="border-2 border-[#027cc1] text-[#027cc1] px-8 py-3 rounded-lg font-bold hover:bg-[#027cc1] hover:text-white">Call: +44 7800 657141</a>
          </div>
        </div>
      </section>

      {/* Experience & Stats Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto border-t-4 border-[#027cc1] bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                AR Heating Services
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                AR Heating Services has been carrying out landlord gas safety inspections across Watford, Harrow, London and the surrounding areas for the last 18 years. We're Gas Safe registered registration number 574111, and we've certified 8000 properties / CP12s for local landlords and letting agents to date.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed font-semibold">
                Our job is simple: keep your properties legal, your tenants safe, and the whole process off your to-do list.
              </p>
            </div>

            {/* Right Column: Stats */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-extrabold text-[#027cc1] mb-1">18</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Years Experience</span>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-extrabold text-[#ff6600] mb-1">8000</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Properties Certified</span>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 sm:col-span-2 flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-[#027cc1] shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Gas Safe Registered</h4>
                  <p className="text-xs text-gray-500">Registration Number: 574111</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Side-by-Side Info Sections */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Box 1: Booking Made Easy */}
          <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-[#ff6600] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-50 rounded-lg text-[#ff6600]">
                  <Calendar className="w-6 h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Booking Made Easy for Landlords
                </h2>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                Chasing tenants to find a time that works for everyone eats up a whole afternoon. So don't — just send us their contact details, and we'll take it from there. Our admin team gets in touch directly, works around their schedule, and books the inspection in without you lifting a finger.
              </p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                We already do this for letting agencies across Wembley, Watford, Harrow and other partner areas. If you manage multiple properties, ask us about batch scheduling we can align renewal dates across a portfolio so you're not chasing separate appointments every month.
              </p>
            </div>
          </div>

          {/* Box 2: Qualified Engineers */}
          <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-[#027cc1] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg text-[#027cc1]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Qualified Engineers, Every Time
                </h2>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Every inspection is carried out by a lead engineer, a Gas Safe registered engineer with 11 years of experience across residential and rental properties. When it comes to safety and compliance, we don't cut corners.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 hidden md:block">
              <span className="text-xs font-semibold text-[#027cc1] tracking-wider uppercase bg-blue-50 px-2.5 py-1 rounded">
                Gas Safe Registered • 574111
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* What Does a CP12 Inspection Cover */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#027cc1]">What Does a CP12 Inspection Cover?</h2>
          <p className="text-gray-500 mt-2">Our engineers carry out a full check of every gas appliance, flue, and pipe in the property:</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#027cc1] mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-950 mb-2">Legal compliance</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A proper certificate confirming your property meets current UK housing and safety regulations.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#ff6600] mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-950 mb-2">Carbon monoxide checks</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Testing to catch hidden leaks before they become dangerous.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#027cc1] mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-950 mb-2">Efficiency checks</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Making sure appliances run efficiently, which helps keep tenants' energy bills down.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#ff6600] mb-4">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-950 mb-2">Pressure and ignition safety</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Confirming gas pressure is correct and everything ignites safely.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#027cc1] mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-950 mb-2">Early problem spotting</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Catching small issues in boilers or pipework before they become expensive repairs.</p>
          </div>
        </div>
      </section>

      {/* Where We Cover Table Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <MapPin className="w-8 h-8 text-[#027cc1]" />
            <h2 className="text-3xl font-bold text-[#027cc1]">Where We Cover</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="bg-[#027cc1] text-white">
                  <th className="p-4 font-semibold">Area</th>
                  <th className="p-4 font-semibold">Towns Covered</th>
                  <th className="p-4 font-semibold">Turnaround</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-4 font-bold text-gray-900">Harrow & surrounding</td>
                  <td className="p-4 text-gray-600">Harrow, Pinner, Stanmore, Northolt</td>
                  <td className="p-4 font-semibold text-[#ff6600]">Digital CP12 within 24 hours</td>
                </tr>
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-4 font-bold text-gray-900">Watford & surrounding</td>
                  <td className="p-4 text-gray-600">Watford, Edgware</td>
                  <td className="p-4 font-semibold text-[#ff6600]">Digital CP12 within 24 hours</td>
                </tr>
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-4 font-bold text-gray-900">West & Greater London</td>
                  <td className="p-4 text-gray-600">London, Wembley, Ealing, Southall, Uxbridge</td>
                  <td className="p-4 font-semibold text-[#ff6600]">Digital CP12 within 24 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive FAQs Accordion Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-3 mb-10 ">
            
            <h2 className="text-3xl font-bold text-black">Frequently Asked Question</h2>
          </div>

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
                    <span className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold bg-orange-500 transition-transform duration-300">
                      {isOpen ? '×' : '+'}
                    </span>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 pt-0 text-gray-600 bg-white leading-relaxed text-sm md:text-base">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Landlord Reviews / Testimonials */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#027cc1] text-center mb-12">
            What Landlords Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-[#ff6600] text-left relative">
              <span className="text-5xl text-orange-200 font-serif absolute top-3 left-4 select-none opacity-40">“</span>
              <div className="relative z-10 pl-6">
                <div className="flex gap-1 mb-4 text-[#ff6600]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Excellent, hassle-free service. They contacted my tenants directly in Pinner, sorted out the keys, and sent the digital certificate the next morning."
                </p>
                <h4 className="font-bold text-[#027cc1]">— Sarah, landlord in Pinner</h4>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-[#ff6600] text-left relative">
              <span className="text-5xl text-orange-200 font-serif absolute top-3 left-4 select-none opacity-40">“</span>
              <div className="relative z-10 pl-6">
                <div className="flex gap-1 mb-4 text-[#ff6600]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "AR Heating looks after our entire Watford rental portfolio. Having synchronized renewal dates has saved us massive amounts of admin work."
                </p>
                <h4 className="font-bold text-[#027cc1]">— David K., Letting Agent in Watford</h4>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-[#ff6600] text-left relative">
              <span className="text-5xl text-orange-200 font-serif absolute top-3 left-4 select-none opacity-40">“</span>
              <div className="relative z-10 pl-6">
                <div className="flex gap-1 mb-4 text-[#ff6600]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Very professional team. They turned up on time in Harrow, did a thorough safety check on our boilers, and the CP12 was in my email within hours."
                </p>
                <h4 className="font-bold text-[#027cc1]">— James L., Landlord in Harrow</h4>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-[#ff6600] text-left relative">
              <span className="text-5xl text-orange-200 font-serif absolute top-3 left-4 select-none opacity-40">“</span>
              <div className="relative z-10 pl-6">
                <div className="flex gap-1 mb-4 text-[#ff6600]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Been using them for 5 years now for all my properties across Wembley and West London. Reliable, reasonably priced, and always Gas Safe registered."
                </p>
                <h4 className="font-bold text-[#027cc1]">— Amara, Letting Agent in Wembley</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      </div>
  );
}