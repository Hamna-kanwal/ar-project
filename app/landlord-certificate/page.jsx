"use client"; // Yeh line error fix karne ke liye zaroori hai

import React, { useState } from 'react';
import { Phone, MessageCircle, CalendarClock, Wrench, CheckCircle, Star } from 'lucide-react';

const LandlordGasSafety = () => {
  const [openIndex, setOpenIndex] = useState(0);

  // CP12 Specific FAQs integration
  const faqs = [
    { q: "How long does a gas safety check take?", a: "Usually 30 to 60 minutes, depending on how many gas appliances are in the property — a boiler, cooker, and fireplace together will take longer than a single appliance." },
    { q: "What happens if an appliance fails the inspection?", a: "If something's unsafe, our engineer isolates it on the spot to protect your tenants. You'll get a clear explanation of what's wrong and an upfront quote for the repair — no surprises, no pressure" },
    { q: "Can letting agents pass on tenant details directly?", a: "Yes. We already work this way with agencies across Harrow, Watford, West and Greater London. Send over the tenant's contact details and we handle scheduling from there." },
    { q: "How much does a CP12 cost?", a: "A CP12 roughly costs between £80 to £120." },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section style={{ backgroundColor: '#027cc1' }} className="text-white py-16 px-6  text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-14">Landlord Gas Safety Certificates (CP12)</h1>
        <p className="text-xl font-semibold text-white">London, Watford & Harrow</p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="tel:[YOUR_NUMBER]" className="flex items-center gap-2 text-white font-bold py-3 px-8 rounded-lg transition" style={{ backgroundColor: '#e95000' }}>
            <Phone size={20} /> Call Us Now
          </a>
          <a href="https://wa.me/[YOUR_NUMBER]" className="flex items-center gap-2 bg-white font-bold py-3 px-8 rounded-lg transition" style={{ color: '#027cc1' }}>
            <MessageCircle size={20} /> WhatsApp Us
          </a>
        </div>
      </section>

      <main className="max-w-5xl mx-auto py-12 px-6">
        {/* Intro Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#027cc1' }}>Keeping Your Tenants Safe is the Law</h2>
          <p className="mb-4">If you're a landlord or letting agent, keeping your tenants safe isn't optional, it's the law. Under the Gas Safety (Installation and Use) Regulations 1998, every rental property needs a valid gas safety certificate (CP12), renewed every 12 months.</p>
          <p>AR Heating Services has been carrying out landlord gas safety inspections across Watford, Harrow, London and the surrounding areas for the last 18 years. We're Gas Safe registered registration number 574111, and we've certified 8000 properties / CP12s for local landlords and letting agents to date. Our job is simple: keep your properties legal, your tenants safe, and the whole process off your to-do list.</p>
        </section>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4" style={{ borderTopColor: '#e95000' }}>
            <CalendarClock className="mb-3" style={{ color: '#e95000' }} size={40} />
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#027cc1' }}>Booking Made Easy</h3>
            <p className="mb-2">Chasing tenants to find a time that works for everyone eats up a whole afternoon. So don't  just send us their contact details, and we'll take it from there.</p>
            <p>We already do this for letting agencies across Wembley, Watford, Harrow and other partner areas. If you manage multiple properties, ask us about batch scheduling  we can align renewal dates across a portfolio so you're not chasing separate appointments every month.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4" style={{ borderTopColor: '#027cc1' }}>
            <Wrench className="mb-3" style={{ color: '#027cc1' }} size={40} />
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#027cc1' }}>Qualified Engineers</h3>
            <p>Every inspection is carried out by a lead engineer, a Gas Safe registered engineer with 11 years of experience across residential and rental properties.</p>
          </div>
        </div>

        {/* What We Cover Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#027cc1' }}>What Does a CP12 Inspection Cover?</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3"><CheckCircle className="text-orange-600 mt-1" size={20} /> Legal compliance: A proper certificate confirming your property meets current UK housing and safety regulations.</li>
            <li className="flex items-start gap-3"><CheckCircle className="text-orange-600 mt-1" size={20} /> Carbon monoxide checks: Testing to catch hidden leaks before they become dangerous.</li>
            <li className="flex items-start gap-3"><CheckCircle className="text-orange-600 mt-1" size={20} /> Efficiency checks: Making sure appliances run efficiently, which helps keep tenants' energy bills down.</li>
            <li className="flex items-start gap-3"><CheckCircle className="text-orange-600 mt-1" size={20} /> Pressure and ignition safety: Confirming gas pressure is correct and everything ignites safely.</li>
            <li className="flex items-start gap-3"><CheckCircle className="text-orange-600 mt-1" size={20} /> Early problem spotting: Catching small issues in boilers or pipework before they become expensive repairs.</li>
          </ul>
        </section>

        {/* Coverage Table */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#027cc1' }}>Where We Cover</h3>
          <div className="overflow-x-auto bg-white shadow-sm">
            <table className="w-full text-left">
              <thead style={{ backgroundColor: '#027cc1' }} className="text-white">
                <tr>
                  <th className="p-4">Area</th>
                  <th className="p-4">Towns Covered</th>
                  <th className="p-4">Turnaround</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-4 font-semibold">Harrow & surrounding</td><td className="p-4">Harrow, Pinner, Stanmore, Northolt</td><td className="p-4 font-bold" style={{ color: '#e95000' }}>Digital CP12 within 24hrs</td></tr>
                <tr className="border-b"><td className="p-4 font-semibold">Watford & surrounding</td><td className="p-4">Watford, Edgware</td><td className="p-4 font-bold" style={{ color: '#e95000' }}>Digital CP12 within 24hrs</td></tr>
                <tr><td className="p-4 font-semibold">West & Greater London</td><td className="p-4">London, Wembley, Ealing, Southall, Uxbridge</td><td className="p-4 font-bold" style={{ color: '#e95000' }}>Digital CP12 within 24hrs</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Landlords Say Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#027cc1' }}>What Landlords Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Sarah, Landlord in Pinner", text: "Reliable and fast! Got my CP12 sorted within 24 hours without any hassle." },
              { name: "Mark, Agency Manager", text: "We use AR Heating for all our properties. Batch scheduling saves us so much time." },
              { name: "John, Watford Landlord", text: "Professional engineers and very clear communication. Highly recommended." }
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-b-4 border-orange-500">
                <div className="flex text-orange-500 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-4">"{review.text}"</p>
                <h4 className="font-bold text-blue-900">— {review.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#027cc1' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className={`border-2 rounded-xl overflow-hidden transition-all ${isOpen ? 'border-orange-600' : 'border-gray-200'}`}>
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full p-6 text-left font-semibold flex justify-between items-center bg-white hover:bg-gray-50"
                  >
                    <span className="text-gray-900">{faq.q}</span>
                    <span className="font-bold text-xl" style={{ color: '#e95000' }}>{isOpen ? '×' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="p-6 pt-0 text-gray-600 bg-white">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandlordGasSafety;