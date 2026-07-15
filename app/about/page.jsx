'use client';
import { useState } from 'react';
import { ShieldCheck, MapPin, BadgeDollarSign, HeartHandshake, Sparkles, Zap, Phone, LayoutGrid } from 'lucide-react';
import CtaBanner from '../Components/CTA';

const faqs = [
  { q: "Are you Gas Safe registered?", a: "Yes. Our number is 574111. Check us on the Gas Safe Register any time." },
  { q: "Where are you based?", a: "In Watford, at Unit 24, The Roundway, WD18 6LB. We cover Watford and the towns close by." },
  { q: "Do you give free quotes?", a: "Yes. We give free, fixed price quotes with honest advice, and no pressure to go ahead." },
  { q: "Do you offer emergency help?", a: "Yes. Call us when a heating or gas fault cannot wait, and we work to reach you fast." },
];

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/boiler.jpg')" }} />
        <div className="absolute inset-0 bg-white/80" /> 
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            Why AR<span className="text-orange-500"> Heating</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium leading-relaxed">
        AR Heating & Plumbing is a Gas Safe registered heating and plumbing team in Watford. Fixed prices, honest advice, and tidy work across Watford and the towns close by.
You want a heating and plumbing team you can trust in your home. We are a local, Gas Safe registered team based in Watford, and we treat every job with care.
From a new boiler to a quick repair, we give you fixed prices, plain advice, and clean work. Here is why homes across Watford pick us.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InfoCard icon={<ShieldCheck size={32} />} title="Gas Safe Registered" text="Every gas job we do is by the book. Our Gas Safe number is 574111, and you can check us on the Gas Safe Register." />
          <InfoCard icon={<MapPin size={32} />} title="Local to Watford" text="We are based in Watford and work across the towns close by. A local team means a quick reply and a face you can trust." />
          <InfoCard icon={<BadgeDollarSign size={32} />} title="Fixed Prices" text="We give you a clear, fixed price before we start. No hidden costs, no surprise on the bill." />
          <InfoCard icon={<HeartHandshake size={32} />} title="Honest Advice" text="If a repair beats a new fit, we say so. We would rather keep you for years than sell you more than you need." />
          <InfoCard icon={<Sparkles size={32} />} title="Tidy Work" text="We treat your home with care and clean up when we finish. We leave your home clean, with the job done." />
          <InfoCard icon={<Zap size={32} />} title="Fast Help" text="Heating faults do not wait, so nor do we. Call us and we work to reach you soon." />
          <InfoCard icon={<LayoutGrid size={32} />} title="One team for the whole home" text="From boilers to plumbing to smart controls, we cover a wide range of jobs. One call sorts the lot." />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10 text-black">Frequently Asked Question</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`border-2 rounded-xl overflow-hidden transition-all ${openIndex === i ? 'border-orange-500' : 'border-gray-200'}`}>
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className={`w-full p-6 text-left font-semibold flex justify-between items-center ${openIndex === i ? 'bg-orange-50' : 'bg-white'}`}
                >
                  <span className="text-gray-900 font-bold">{faq.q}</span>
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                    {openIndex === i ? '×' : '+'}
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="p-6 pt-0 text-gray-600">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

          <CtaBanner />
    </main>
  );
}

const InfoCard = ({ icon, title, text }) => (
  <div className="p-6 bg-white border-t-4 border-orange-500 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
    <div className="text-[#027cc1] mb-4">{icon}</div>
    <h3 className="text-lg font-bold text-[#027cc1] mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);