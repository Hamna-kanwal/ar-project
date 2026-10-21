// File: app/Services/emergency-services/page.jsx
"use client";
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import CtaBanner from '../../Components/CTA';
import ReviewsSection from '../../Components/ReviewsSection';
import MeetYourEngineer from '../../Components/MeetYourEngineer';

const PHONE_DISPLAY = "07800 657141";
const PHONE_TEL = "+447800657141";
const WHATSAPP_NUMBER = "447800657141";

// Seasonal offer: keep false until the client confirms a real offer with an end date
const SHOW_OFFER = false;
const OFFER_TEXT = "Offer text and end date go here.";


const serviceDetails = [
  {
    title: "How fast can you reach me?",
    tab: "Response Time",
    image: "/e1.png",
    paras: [
      "We aim to have an engineer at your door within 60 to 90 minutes, or at a time which suits you. We are based in Watford, close to Harrow, Hemel Hempstead and St Albans, which is how we keep response times short. When you call, tell us what has happened and your postcode, and we will give you an arrival time."
    ],
    alt: "Emergency heating engineer arriving at a home in Watford"
  },
  {
    title: "What should I do if I smell gas?",
    tab: "Gas Leak",
    image: "/e2.png",
    paras: [
      "Your safety comes first. If you smell gas, follow these steps immediately:"
    ],
    list: [
      "Open doors and windows",
      "Do not use light switches, sockets or sparks",
      "Do not smoke or use naked flames",
      "Turn off the gas at the meter if you can",
      "Leave the property",
      "Call National Gas Emergency on 0800 111 999"
    ],
    parasAfter: [
      "Once the gas supply is made safe, call us. Our Gas Safe engineers find and fix the leak and test your appliances before turning things back on."
    ],
    alt: "Gas meter emergency control valve"
  },
  {
    title: "What should I do if a pipe bursts?",
    tab: "Burst Pipes",
    image: "/e3.png",
    paras: [
      "Turn off your water at the stop tap straight away. It is usually under the kitchen sink or where the water pipe enters your home. Switch off the electrics in any area where water is near sockets or lights, and turn off your boiler. Then call us. We stop the leak, repair the pipe and get your water back on."
    ],
    alt: "Engineer repairing a burst pipe in an emergency"
  },
  {
    title: "What emergencies do you cover?",
    tab: "Faults Covered",
    image: "/e4.png",
    paras: [
      "Our engineers handle urgent heating, gas and plumbing faults, including:"
    ],
    list: [
      "Gas leaks and gas smells",
      "No heating or no hot water",
      "Boiler breakdowns and lock outs",
      "Burst and leaking pipes",
      "Leaks through ceilings",
      "Overflowing toilets and cisterns",
      "Frozen condensate pipes"
    ],
    alt: "Emergency boiler repair at night"
  },
  {
    title: "Are you safe to call for gas faults?",
    tab: "Gas Safe",
    image: "/e5.png",
    paras: [
      "Yes. Every engineer who works on gas for us is Gas Safe registered under our registration, No. 574111. You can check our number on the Gas Safe Register. We follow the correct safety steps on every job, and will not turn an appliance back on until it is safe."
    ],
    alt: "Gas Safe registered emergency engineer"
  },
  {
    title: "Will I know the cost before you start?",
    tab: "Fixed Pricing",
    image: "/e6.png",
    paras: [
      "Yes. We tell you the cost before any work starts, even in an emergency. Our first job is to make your home safe. Then we explain the fault, give you a fixed price for the repair, and only go ahead with your OK."
    ],
    alt: "Emergency repair price explained before work starts"
  },
  {
    title: "Why choose AR Heating?",
    tab: "Why Choose Us",
    image: "/e7.png",
    paras: [
      "We are a local Watford company, trading since 2012, and every gas job is done under our Gas Safe registration, No. 574111. We give you a fixed price before we start any repair, turn up when we say we will, and leave your home as clean as we found it. If something is not worth doing, we tell you."
    ],
    alt: "Gas Safe registered AR Heating engineer"
  },
  {
    title: "How can I prevent a winter emergency?",
    tab: "Winter Tips",
    image: "/e8.png",
    paras: [
      "Many winter call outs can be avoided. Book a yearly boiler service before the cold weather. Lag pipes in lofts and garages. Know where your stop tap is and check it turns. Keep the heating on low when you go away in winter. If your condensate pipe freezes, pouring warm, not boiling, water over it can often get your boiler going again."
    ],
    alt: "Frozen pipe in winter in Watford"
  },
  {
    title: "Where do you cover?",
    tab: "Areas Covered",
    image: "/AREAS.png",
    paras: [
      "We are based at Unit 24, The Roundway, Watford, WD18 6LB, and cover emergencies across Watford, Bushey, Rickmansworth, Hemel Hempstead, St Albans, Harrow, Pinner, Stanmore, Edgware, Ruislip and Northolt. We are Gas Safe registered (No. 574111), fully insured, and you can check our number on the Gas Safe Register before we arrive."
    ],
    alt: "AR Heating engineer at a home in Watford"
  }
];

/* ---------- Icons (inline SVG) ---------- */
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const IconShield = ({ className = "w-6 h-6" }) => (
  <svg {...svgProps} className={className}><path d="M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></svg>
);
const IconPin = ({ className = "w-6 h-6" }) => (
  <svg {...svgProps} className={className}><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
const IconTag = ({ className = "w-6 h-6" }) => (
  <svg {...svgProps} className={className}><path d="M20 12l-8 8-9-9V3h8l9 9z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>
);
const IconClock = ({ className = "w-6 h-6" }) => (
  <svg {...svgProps} className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
const IconCheck = ({ className = "w-5 h-5" }) => (
  <svg {...svgProps} strokeWidth={3} className={className}><path d="M5 12l5 5L20 7" /></svg>
);
const IconArrow = ({ className = "w-5 h-5" }) => (
  <svg {...svgProps} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const IconPhone = ({ className = "w-5 h-5" }) => (
  <svg {...svgProps} className={className}><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" /></svg>
);
const IconChat = ({ className = "w-5 h-5" }) => (
  <svg {...svgProps} className={className}><path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.6 8.6 0 01-3.6-.8L3 21l1.9-5.2A8.4 8.4 0 1121 11.5z" /></svg>
);
const IconWrench = ({ className = "w-7 h-7" }) => (
  <svg {...svgProps} className={className}><path d="M14.7 6.3a4 4 0 005 5l-8.4 8.4a2.1 2.1 0 01-3-3l8.4-8.4a4 4 0 00-2-2z" /></svg>
);
const IconDrop = ({ className = "w-7 h-7" }) => (
  <svg {...svgProps} className={className}><path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" /></svg>
);
const IconCert = ({ className = "w-7 h-7" }) => (
  <svg {...svgProps} className={className}><rect x="4" y="3" width="16" height="14" rx="2" /><path d="M8 8h8M8 12h5M9 17l-1 4 4-2 4 2-1-4" /></svg>
);

const trustItems = [
  { icon: <IconShield />, label: "Gas Safe No. 574111" },
  { icon: <IconPin />, label: "Local since 2012" },
  { icon: <IconTag />, label: "Fixed price before we start" },
  { icon: <IconClock />, label: "Open 24 hours, 7 days a week" },
];

const relatedServices = [
  {
    title: "Boiler Repair",
    desc: "Boiler faults found and fixed, many on the first visit.",
    href: "/Services/boiler-breakdown",
    icon: <IconWrench />,
  },
  {
    title: "General Plumbing",
    desc: "Leaks, taps, toilets and pipework.",
    href: "/Services/general-plumbing",
    icon: <IconDrop />,
  },
  {
    title: "Boiler Service",
    desc: "A yearly service helps prevent emergencies.",
    href: "/Services/boiler",
    icon: <IconCert />,
  },
];

const faqs = [
  { q: "I smell gas. What do I do?", a: "Open windows, do not use switches, turn off the gas at the meter if you can, leave the property and call the gas emergency line on 0800 111 999. Then call us." },
  { q: "How fast can you come out?", a: "We aim to reach you in 60 to 90 minutes, or at a time which suits you." },
  { q: "Are you open 24 hours?", a: "Yes. Our emergency call out service runs 24 hours a day, 7 days a week." },
  { q: "What faults do you cover?", a: "Gas leaks, dead boilers, burst pipes, leaks, no heating, no hot water and more." },
  { q: "Where is my stop tap?", a: "It is usually under the kitchen sink, or where the water pipe enters your home. Turn it clockwise to shut off the water." },
  { q: "Will I know the price before you start?", a: "Yes. We make your home safe first, then give you a fixed price for the repair before any work starts." },
  { q: "Do you cover weekends and bank holidays?", a: "Yes. We work 7 days a week, including weekends." },
  { q: "Can you fix frozen pipes?", a: "Yes. We thaw them safely and repair any damage caused by the freeze." },
  { q: "My boiler stopped in freezing weather. What should I do?", a: "Check if the plastic condensate pipe outside has frozen. Pour warm, not boiling, water over it, then reset the boiler. If that fails, call us." },
  { q: "Are you Gas Safe registered?", a: "Yes. AR Heating is Gas Safe registered, No. 574111. You can check our number on the official Gas Safe Register." },
];

const days = ["Any day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const inputClass =
  "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition";

const Eyebrow = ({ children, light = false }) => (
  <p className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] mb-3 ${light ? 'text-orange-300' : 'text-orange-500'}`}>
    <span className="w-8 h-[3px] rounded-full bg-orange-500" />
    {children}
  </p>
);

export default function EmergencyServicesPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", postcode: "", make: "", day: "Any day" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    const message =
      `Emergency call back request%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      `Postcode: ${encodeURIComponent(form.postcode)}%0A` +
      `Boiler make: ${encodeURIComponent(form.make || "Not given")}%0A` +
      `Preferred day: ${encodeURIComponent(form.day)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="pb-20 md:pb-0 bg-white text-gray-900">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "HVACBusiness",
              "@id": "https://www.arheatingservice.co.uk/#business",
              "name": "AR Heating",
              "url": "https://www.arheatingservice.co.uk",
              "telephone": "+447800657141",
              "email": "info@arheatingservice.co.uk",
              "foundingDate": "2012",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Unit 24 The Roundway",
                "addressLocality": "Watford",
                "postalCode": "WD18 6LB",
                "addressCountry": "GB"
              },
              "areaServed": [
                "Watford", "Bushey", "Rickmansworth", "Hemel Hempstead", 
                "St Albans", "Harrow", "Pinner", "Stanmore", "Edgware", "Ruislip", "Northolt"
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Gas Safe Register",
                "identifier": "574111"
              }
            },
            {
              "@type": "Service",
              "name": "Emergency Heating and Plumbing in Watford",
              "serviceType": "Emergency heating and plumbing",
              "provider": { "@id": "https://www.arheatingservice.co.uk/#business" },
              "areaServed": "Watford"
            },
            {
              "@type": "FAQPage",
              "mainEntity": faqs.map(f => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
              }))
            }
          ]
        }) }}
      />

      {/* Seasonal Offer Banner */}
      {SHOW_OFFER && (
        <div className="bg-orange-500 text-white text-center text-sm md:text-base font-semibold px-6 py-3">
          {OFFER_TEXT}
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="relative w-full min-h-[680px] flex items-center justify-center overflow-hidden pb-32 pt-36">
        <NextImage
          src="/heatingstallation1.webp"
          alt="Emergency plumber and heating background"
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#021f33]/95 via-[#02466f]/90 to-[#027cc1]/70" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-24 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Gas Safe No. 574111 &nbsp;|&nbsp; 60 to 90 min response &nbsp;|&nbsp; Open 24/7
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-[1.05] text-center">
              Emergency Plumber and Heating Engineer <span className="text-orange-500">in Watford</span>
            </h1>

            <p className="text-base md:text-xl text-sky-50/90 max-w-2xl mx-auto font-medium leading-relaxed text-center">
              Gas leak, no heating, burst pipe or water pouring through the ceiling? Call us on <a href={`tel:${PHONE_TEL}`} className="text-orange-400 font-bold underline">{PHONE_DISPLAY}</a>. Our Gas Safe engineers aim to reach you in 60 to 90 minutes, make your home safe, find the fault and fix it.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mt-9 w-full">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all">
                Get my free quote <IconArrow />
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#027cc1] transition-colors">
                <IconPhone /> Call: {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP (floating) ============ */}
      <section className="relative z-20 -mt-16 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl shadow-sky-900/10 border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
          {trustItems.map((t, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-3 p-6">
              <span className="w-12 h-12 shrink-0 rounded-2xl bg-sky-50 text-[#027cc1] flex items-center justify-center">
                {t.icon}
              </span>
              <p className="font-bold text-gray-900 leading-snug">{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SERVICE BLOCKS (TABS) ============ */}
      <section className="bg-white">
        {/* Tab bar */}
        <div className="py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 mt-10 px-4 flex justify-center">
          <div
            role="tablist"
            className="grid grid-cols-3 sm:grid-cols-5 lg:flex lg:flex-nowrap gap-1 p-1 bg-white border border-orange-500 rounded-xl shadow-sm w-full lg:w-auto overflow-x-auto"
          >
            {serviceDetails.map((s, i) => (
              <button
                key={i}
                id={`service-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={activeTab === i}
                aria-controls={`service-panel-${i}`}
                onClick={() => setActiveTab(i)}
                className={`px-3 lg:px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-center transition-colors whitespace-nowrap ${
                  activeTab === i
                    ? "bg-[#027cc1] text-white"
                    : "text-gray-600 hover:bg-sky-50 hover:text-[#027cc1]"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Panels */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          {serviceDetails.map((s, i) => {
            return (
              <div
                key={i}
                id={`service-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`service-tab-${i}`}
                hidden={activeTab !== i}
                className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                <div className="relative">
                  <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] bg-gradient-to-br from-orange-400/30 to-sky-400/30" />
                  <div className="relative h-[360px] md:h-[420px] w-full rounded-[2rem] overflow-hidden shadow-2xl bg-gray-200">
                    <NextImage
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#021f33]/40 via-transparent to-transparent" />
                    <span className="absolute top-5 left-5 bg-white/90 backdrop-blur text-[#027cc1] font-extrabold text-lg w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#03304b] mb-4 leading-tight">
                    {s.title}
                  </h2>
                  <div className="w-16 h-1.5 rounded-full bg-orange-500 mb-5" />
                  {s.paras && s.paras.map((p, pi) => (
                    <p key={pi} className="text-gray-600 text-lg leading-relaxed mb-3">{p}</p>
                  ))}
                  
                  {/* Grid layout for list items to render 2 columns side-by-side */}
                  {s.list && (
                    <ul className="grid sm:grid-cols-2 gap-2.5 my-3">
                      {s.list.map((item, li) => (
                        <li key={li} className="flex items-center gap-2.5 bg-sky-50/70 border border-sky-100 rounded-xl p-2.5 text-gray-700 text-sm font-medium">
                          <span className="w-5 h-5 shrink-0 rounded-full bg-orange-500 text-white flex items-center justify-center">
                            <IconCheck className="w-3.5 h-3.5" />
                          </span>
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.parasAfter && s.parasAfter.map((p, pi) => (
                    <p key={pi} className="text-gray-600 text-lg leading-relaxed mt-3">{p}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="py-6 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <MeetYourEngineer />
        </div>
      </div>

      <ReviewsSection />

      {/* ============ FAQ ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 lg:sticky lg:top-24 self-start">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#03304b] leading-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg mb-6">Still unsure? Call or WhatsApp us and we will help.</p>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 bg-[#027cc1] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#02649a] transition-colors">
              <IconPhone /> {PHONE_DISPLAY}
            </a>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 bg-white border-2 ${isOpen ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-gray-200 shadow-sm hover:shadow-md'}`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full p-5 md:p-6 text-left font-bold flex justify-between items-center gap-4 text-gray-900"
                  >
                    <span className={isOpen ? 'text-orange-600' : ''}>{faq.q}</span>
                    <span className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-full text-white text-xl font-bold transition-transform duration-300 ${isOpen ? 'bg-orange-500 rotate-45' : 'bg-[#027cc1]'}`}>
                      +
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 md:px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ BOOKING FORM ============ */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-[#021f33] via-[#02466f] to-[#027cc1]">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white text-center lg:text-left">
            <Eyebrow light>Quick booking</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">Request an Emergency Call Back</h2>
            <p className="text-sky-100 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Fill in a few details and we will get back to you fast. Fixed price before we start, open 24 hours, 7 days a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 bg-white text-[#027cc1] font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors">
                <IconPhone /> {PHONE_DISPLAY}
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                <IconChat /> WhatsApp us
              </a>
            </div>
          </div>

          <form onSubmit={handleBook} className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Name</label>
              <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone number</label>
              <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="07xxx xxxxxx" className={inputClass} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="postcode" className="block text-sm font-bold text-gray-700 mb-2">Postcode</label>
                <input id="postcode" name="postcode" required value={form.postcode} onChange={handleChange} placeholder="WD18 6LB" className={inputClass} />
              </div>
              <div>
                <label htmlFor="make" className="block text-sm font-bold text-gray-700 mb-2">Boiler make (optional)</label>
                <input id="make" name="make" value={form.make} onChange={handleChange} placeholder="e.g. Worcester Bosch" className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="day" className="block text-sm font-bold text-gray-700 mb-2">Preferred day</label>
              <select id="day" name="day" value={form.day} onChange={handleChange} className={inputClass}>
                {days.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-7 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all">
              Request an Emergency Call Back <IconArrow />
            </button>
            <p className="text-center text-sm text-gray-500">We reply within working hours. No spam, no pressure.</p>
          </form>
        </div>
      </section>

      {/* ============ RELATED SERVICES ============ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Eyebrow>More from AR Heating</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#03304b]">Related Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedServices.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className="group relative block bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-sky-900/5 hover:-translate-y-2 hover:shadow-2xl hover:border-orange-200 transition-all duration-300"
              >
                <span className="w-16 h-16 rounded-2xl bg-sky-50 text-[#027cc1] flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {r.icon}
                </span>
                <h3 className="text-xl font-extrabold text-[#03304b] mb-3">{r.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{r.desc}</p>
                <span className="inline-flex items-center gap-2 font-bold text-orange-500 group-hover:gap-4 transition-all">
                  Learn more <IconArrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />

      {/* ============ STICKY MOBILE BAR ============ */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 p-3 bg-white/95 backdrop-blur border-t border-gray-200 grid grid-cols-2 gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
        <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 bg-[#027cc1] text-white font-bold py-3 rounded-xl">
          <IconPhone /> Call Now
        </a>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3 rounded-xl">
          <IconChat /> WhatsApp
        </a>
      </div>
    </div>
  );
}