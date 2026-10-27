"use client";
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import CtaBanner from '../../Components/CTA';
import ReviewsSection from '../../Components/ReviewsSection';
import MeetYourEngineer from '../../Components/MeetYourEngineer';


const PHONE_DISPLAY = "+44 7800 657141";
const PHONE_TEL = "+447800657141";
const WHATSAPP_NUMBER = "447800657141";

const SHOW_OFFER = false;
const OFFER_TEXT = "Offer text and end date go here.";

const serviceDetails = [
  {
    title: "What plumbing jobs do you fix?",
    tab: "Plumbing Jobs",
    image: "/plumbing jobs-from-png.webp",
    paras: [
      "We handle day to day plumbing repairs, including:",
      "Small problems get dearer the longer they are left, so call us early.",
    ],
    list: [
      "Leaking pipes, joints and radiators",
      "Dripping and broken taps",
      "Running, leaking or blocked toilets",
      "Blocked sinks, basins, baths and drains",
      "Low water pressure",
      "Stop taps and isolation valves which stick or leak",
      "Shower and bath leaks",
      "Outside taps and frozen pipes"
    ],
    alt: "Plumber repairing pipework under a kitchen sink in Watford",
  },
  {
    title: "Do you fix leaks fast?",
    tab: "Fix Leaks",
    image: "/Fix leaks.webp",
    paras: [
      "Yes. A leak can damage floors, ceilings and wiring, and push up your water bill. We find the source, which is not always where the water shows, stop the leak and repair the pipe or fitting. If the leak is serious, turn off your water at the stop tap and call us straight away.",
    ],
    alt: "Water leak stain on a ceiling from a hidden pipe",
  },
  {
    title: "Can you clear a blocked drain?",
    tab: "Blocked Drains",
    image: "/Blocked drains.webp",
    paras: [
      "Yes. We clear blocked sinks, basins, baths, showers, toilets and drains. We also check why the blockage formed, such as grease, a poor pipe fall or a damaged pipe, so it does not come back next week.",
    ],
    alt: "Plumber clearing a blocked sink in a Watford kitchen",
  },
  {
    title: "Why is my water pressure low?",
    tab: "Water Pressure",
    image: "/Water pressure.webp",
    paras: [
      "Low pressure can come from a part closed stop tap, a blocked or failing valve, a hidden leak, old narrow pipes or a problem with the supply to your street. We test the pressure, find the cause and fix it. If your home needs stronger hot water flow, a Megaflo unvented cylinder can help.",
    ],
    alt: "Low water pressure from a shower",
  },
  {
    title: "Are your prices clear?",
    tab: "Clear Prices",
    image: "/Fixed pricing-from-png.webp",
    paras: [
      "Yes. We give you a price before we start, and we keep to it. No surprise costs. If there is a call out charge, we tell you before the engineer comes, so you know the cost up front.",
      "We turn up on time, fix the fault and leave the site clean.",
    ],
    alt: "Fixed price plumbing quote in Watford",
  },
  {
    title: "Can you replace taps, toilets and valves?",
    tab: "Replacements",
    image: "/Replacements.webp",
    paras: [
      "Yes. As well as repairs, we fit new kitchen and bathroom taps, toilets, cisterns, basins, shower valves and isolation valves. Bought the part already? We can fit it for you. See our general installation page for more.",
    ],
    alt: "Bathroom plumbing repairs completed",
  },
  {
    title: "Why choose AR Heating?",
    tab: "Why Us",
    image: "/plumbing-Why us.webp",
    paras: [
      "We are a local Watford company, trading since 2012, and every gas job is done under our Gas Safe registration, No. 574111. We give you a fixed price before we start, turn up when we say we will, and leave your home as clean as we found it. If something is not worth doing, we tell you.",
    ],
    alt: "Gas Safe registered AR Heating engineer",
  },
  {
    title: "Why does my toilet keep running?",
    tab: "Running Toilet",
    image: "/Toilet running.webp",
    paras: [
      "A running toilet usually means a worn flush valve seal, a faulty fill valve or a float set too high. It wastes a lot of water and can push up your water bill. We find the faulty part and replace it, often in one visit.",
    ],
    alt: "Running toilet cistern being repaired",
  },
  {
    title: "Can you fix a dripping tap?",
    tab: "Dripping Tap",
    image: "/Driping tap.webp",
    paras: [
      "Yes. A dripping tap is usually a worn washer or cartridge. We replace the part, or fit a new tap if the old one is beyond repair. A drip may seem small, but over weeks it wastes a lot of water and can stain your sink.",
    ],
    alt: "Dripping tap being repaired",
  },
  {
    title: "Where do you cover?",
    tab: "Areas Covered",
    image: "/Areas covered.webp",
    paras: [
      "We are based at Unit 24, The Roundway, Watford, WD18 6LB, and fix plumbing across Watford, Bushey, Rickmansworth, Hemel Hempstead, St Albans, Harrow, Pinner, Stanmore, Edgware, Ruislip and Northolt. We are Gas Safe registered (No. 574111), fully insured, and you can check our number on the Gas Safe Register before we arrive.",
    ],
    alt: "AR Heating engineer at a home in Watford",
  },
];

/* ---------- SVG Icons ---------- */
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
  { icon: <IconClock />, label: "Open 7 days a week" },
];

const relatedServices = [
  {
    title: "Emergency Services",
    desc: "Burst pipes and leaks, day or night.",
    href: "/Services/emergency-services",
    icon: <IconWrench />,
  },
  {
    title: "General Installation",
    desc: "Taps, valves, toilets and appliances fitted.",
    href: "/Services/general-installation",
    icon: <IconCert />,
  },
  {
    title: "Megaflo Cylinders",
    desc: "Strong mains pressure hot water.",
    href: "/Services/megaflo",
    icon: <IconDrop />,
  },
];

const faqs = [
  { q: "Do you fix leaks fast?", a: "Yes. A leak can cause real damage, so we work quickly to find it, stop it and fix it." },
  { q: "Can you clear a blocked drain?", a: "Yes. We clear the blockage and check why it formed, so it does not come back." },
  { q: "Is there a call out charge?", a: "We tell you any charge up front, so you know the cost before an engineer visits." },
  { q: "Can you do small jobs?", a: "Yes. No job is too small, from a dripping tap to a sticking valve." },
  { q: "Why is my water pressure low?", a: "Common causes are a part closed stop tap, a faulty valve, a hidden leak or old pipes. We test and find the cause." },
  { q: "What should I do if a pipe bursts?", a: "Turn off the water at the stop tap, switch off electrics near the water, and call us straight away." },
  { q: "Can you fit a tap I have bought?", a: "Yes. We can fit taps and fittings you have already bought." },
  { q: "Do you cover emergencies?", a: "Yes. For urgent plumbing problems, see our emergency services page or call 07800 657141." },
  { q: "Why does my toilet keep running?", a: "Usually a worn flush valve seal or a faulty fill valve. We replace the part, often in one visit." },
  { q: "Can you fix a dripping tap?", a: "Yes. We replace the worn washer or cartridge, or fit a new tap." },
  { q: "Do you work on weekends?", a: "Yes. We work 7 days a week, so you can book a time to suit you, including weekends." },
  { q: "Can you find a hidden leak?", a: "Yes. If you see damp patches, a dropping boiler pressure or a meter moving with all taps off, we trace the leak and fix it." },
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

export default function GeneralPlumbing() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", postcode: "", make: "", day: "Any day" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    const message =
      `Plumbing booking request%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      `Postcode: ${encodeURIComponent(form.postcode)}%0A` +
      `Boiler make: ${encodeURIComponent(form.make || "Not given")}%0A` +
      `Preferred day: ${encodeURIComponent(form.day)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="pb-20 md:pb-0 bg-white text-gray-900">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                  "Watford", "Bushey", "Rickmansworth", "Hemel Hempstead", "St Albans",
                  "Harrow", "Pinner", "Stanmore", "Edgware", "Ruislip", "Northolt"
                ],
                "hasCredential": {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "Gas Safe Register",
                  "identifier": "574111"
                }
              },
              {
                "@type": "Service",
                "name": "Plumbing Repairs in Watford",
                "serviceType": "Plumbing repair",
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
          })
        }}
      />

      {SHOW_OFFER && (
        <div className="bg-orange-500 text-white text-center text-sm md:text-base font-semibold px-6 py-3">
          {OFFER_TEXT}
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="relative w-full min-h-[680px] flex items-center justify-center overflow-hidden pb-32 pt-36">
        <NextImage
          src="/plumbing1.webp"
          alt="Plumbing services background"
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
              Gas Safe No. 574111 &nbsp;|&nbsp; Local since 2012 &nbsp;|&nbsp; No job too small
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-[1.05] text-center">
              Plumbers <span className="text-orange-500">in Watford</span>
            </h1>

            <p className="text-base md:text-xl text-sky-50/90 max-w-2xl mx-auto font-medium leading-relaxed text-center">
              From a dripping tap to a burst pipe, our local plumbers fix it properly and leave your home clean. You get a fixed price before any work starts, and no job is too small.
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

      {/* ============ TRUST STRIP ============ */}
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

      {/* ============ SERVICE TABS ============ */}
      <section className="bg-white">
        <div className="py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 mt-10 px-4 flex justify-center">
          <div
            role="tablist"
            className="grid grid-cols-2 sm:grid-cols-5 lg:flex lg:flex-nowrap gap-1 p-1 bg-white border border-orange-500 rounded-xl shadow-sm w-full lg:w-auto overflow-x-auto"
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
                className={`px-4 lg:px-5 py-2.5 rounded-lg font-semibold text-sm text-center transition-colors whitespace-nowrap ${
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

        <div className="max-w-7xl mx-auto px-6 py-16">
          {serviceDetails.map((s, i) => (
            <div
              key={i}
              id={`service-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${i}`}
              hidden={activeTab !== i}
              className="grid md:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center"
            >
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] bg-gradient-to-br from-orange-400/30 to-sky-400/30" />
                <div className="relative aspect-[3/2] w-full rounded-[2rem] overflow-hidden shadow-2xl bg-white">
                  <NextImage
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute top-5 left-5 bg-white/90 backdrop-blur text-[#027cc1] font-extrabold text-lg w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#03304b] mb-5 leading-tight">
                  {s.title}
                </h2>
                <div className="w-16 h-1.5 rounded-full bg-orange-500 mb-6" />
                {s.paras.map((p, pi) => (
                  <p key={pi} className="text-gray-600 text-lg leading-relaxed mb-4">{p}</p>
                ))}
                {s.list && (
                  <ul className="grid sm:grid-cols-2 gap-3 mt-2">
                    {s.list.map((item, li) => (
                      <li key={li} className="flex items-start gap-3 bg-sky-50/70 border border-sky-100 rounded-xl p-3 text-gray-700 font-medium">
                        <span className="w-6 h-6 shrink-0 rounded-full bg-orange-500 text-white flex items-center justify-center mt-0.5">
                          <IconCheck className="w-3.5 h-3.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <MeetYourEngineer />

      <ReviewsSection />

      {/* ============ FAQ ============ */}
      <section className="py-24 bg-gray-50">
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
                  className={`rounded-2xl overflow-hidden transition-all duration-300 bg-white border-2 ${isOpen ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-transparent shadow-sm hover:shadow-md'}`}
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
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">Book a Plumber</h2>
            <p className="text-sky-100 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Fill in a few details and we will get back to you. Fixed price before we start, open 7 days a week.
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
              Book a Plumber <IconArrow />
            </button>
            <p className="text-center text-sm text-gray-500">We reply within working hours. No spam, no pressure.</p>
          </form>
        </div>
      </section>

      {/* ============ RELATED SERVICES ============ */}
      <section className="py-24 bg-white">
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

      {/* ============ QUOTE BANNER ============ */}
      <CtaBanner
        heading="Need a Plumber in Watford?"
        text="Speak to a local engineer. Fixed prices, no job too small."
      />

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