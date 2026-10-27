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
    title: "Is a gas cooker safe to fit?",
    tab: "Safety First",
    image: "/safety first-01.webp",
    paras: [
      "Yes, when a Gas Safe engineer fits it. A badly fitted cooker can leak gas, which puts your home at risk. We follow the correct steps on every job, from the connection to the final safety checks, so you can cook without worry.",
    ],
    alt: "Gas Safe engineer connecting a gas cooker in Watford",
  },
  {
    title: "What is included in a cooker fit?",
    tab: "What's Included",
    image: "/whats include.webp",
    paras: [
      "Every gas cooker or hob fit includes a full safety check and setup to ensure your kitchen is completely secure:",
    ],
    list: [
      "Checking the gas supply and space",
      "Connecting with a suitable hose/pipe",
      "Fitting stability bracket or chain",
      "Testing every joint for leaks",
      "Checking the flame on every burner",
      "Checking room ventilation",
      "Showing controls & cleaning up"
    ],
    alt: "Engineer leak testing a gas cooker connection",
  },
  {
    title: "How quick is the fit?",
    tab: "Fitting Speed",
    image: "/fitting speed.webp",
    paras: [
      "Most cooker fits take under an hour. Once we have tested every joint and checked the flame, your cooker is safe to use the same day. Book a time to suit you, including fits arranged around a new kitchen.",
    ],
    alt: "Gas cooker ready to use the same day",
  },
  {
    title: "Do you fit gas hobs and range cookers?",
    tab: "Hobs & Ranges",
    image: "/Hob RANGES-01.webp",
    paras: [
      "Yes. We fit freestanding gas cookers, built in gas hobs, dual fuel cookers and range cookers. For built in hobs, we connect the gas once the hob is in the worktop. If the gas pipe needs moving or extending for a new kitchen layout, we can do this too.",
    ],
    alt: "Built in gas hob fitted in a kitchen worktop",
  },
  {
    title: "Can you disconnect my old cooker?",
    tab: "Disconnect Old",
    image: "/disconnect old-01.webp",
    paras: [
      "Yes. We safely disconnect your old gas cooker, cap the gas supply if needed, and can take the old cooker away. If you are switching from gas to electric, we can cap the gas supply safely so it is left in a safe state.",
    ],
    alt: "Old gas cooker safely disconnected and removed",
  },
  {
    title: "Are your prices clear?",
    tab: "Clear Pricing",
    image: "/fixed pricing.webp",
    paras: [
      "Yes. You get a fixed price before we start, with no hidden extras. Tell us the make and model of your new cooker, and whether you need the old one removed, and we will give you a price.",
    ],
    alt: "Fixed price gas cooker installation quote",
  },
  {
    title: "Why choose AR Heating?",
    tab: "Why Us",
    image: "/boiler-why us.webp",
    paras: [
      "We are a local Watford company, trading since 2007, and every gas job is done under our Gas Safe registration, No. 574111. We give you a fixed price before we start, turn up when we say we will, and leave your home as clean as we found it. If something is not worth doing, we tell you.",
    ],
    alt: "Gas Safe registered AR Heating engineer",
  },
  {
    title: "Why does ventilation matter?",
    tab: "Ventilation",
    image: "/ventelation-01.webp",
    paras: [
      "Gas cookers need fresh air to burn safely. Without enough ventilation, the flame can burn poorly and give off carbon monoxide. We check your kitchen has the right air supply for your cooker, and tell you if anything needs to change before we turn it on. We also recommend a carbon monoxide alarm in any room with a gas appliance.",
    ],
    alt: "Kitchen ventilation checked for a gas cooker",
  },
  {
    title: "What if my gas connection is old?",
    tab: "Old Connections",
    image: "/old connection.webp",
    paras: [
      "Many older kitchens have a worn gas hose or a bayonet fitting which has seen better days. If your connection is not safe or is the wrong type for your new cooker, we replace it. We use parts made for gas cookers, and test the new connection before we leave.",
    ],
    alt: "Approved flexible gas hose for a cooker",
  },
  {
    title: "Where do you cover?",
    tab: "Areas Covered",
    image: "/Areas-01.webp",
    paras: [
      "We are based at Unit 24, The Roundway, Watford, WD18 6LB, and fit gas cookers across Watford, Bushey, Rickmansworth, Hemel Hempstead, St Albans, Harrow, Pinner, Stanmore, Edgware, Ruislip and Northolt. We are Gas Safe registered (No. 574111), fully insured, and you can check our number on the Gas Safe Register before we arrive.",
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
  { icon: <IconPin />, label: "Local since 2007" },
  { icon: <IconTag />, label: "Fixed price before we start" },
  { icon: <IconClock />, label: "Open 7 days a week" },
];

const relatedServices = [
  {
    title: "General Installation",
    desc: "Taps, valves, radiators and more.",
    href: "/Services/general-installation",
    icon: <IconWrench />,
  },
  {
    title: "Landlord Certificate",
    desc: "Yearly gas safety checks for rentals.",
    href: "/Services/landlord",
    icon: <IconCert />,
  },
  {
    title: "Emergency Services",
    desc: "Smell gas? Get help fast.",
    href: "/Services/emergency-services",
    icon: <IconDrop />,
  },
];

const faqs = [
  { q: "Can I fit a gas cooker myself?", a: "No. By law, a gas cooker must be fitted by a Gas Safe registered engineer." },
  { q: "How long does the fit take?", a: "Most fits take under an hour." },
  { q: "Do you check for leaks?", a: "Yes. We test every joint before we leave." },
  { q: "Can I use the cooker the same day?", a: "Yes. Once it is tested and safe, you can cook straight away." },
  { q: "Do you fit gas hobs?", a: "Yes. We fit built in gas hobs, freestanding cookers, dual fuel and range cookers." },
  { q: "Can you take my old cooker away?", a: "Yes. We can disconnect and remove your old cooker." },
  { q: "Can you move my gas pipe for a new kitchen?", a: "Yes. We can move or extend the gas supply to suit your new layout." },
  { q: "Do you give a certificate?", a: "Ask us for a record of the work when you book, and we will confirm what you will receive." },
  { q: "Do I need a carbon monoxide alarm?", a: "We recommend one in any room with a gas appliance. It is a small cost for real peace of mind." },
  { q: "What if my old gas hose is worn?", a: "We replace it with a new connection made for gas cookers and test it before we leave." },
  { q: "Can you fit a cooker I bought online?", a: "Yes. We fit cookers and hobs bought from any shop, as long as the model is suitable for your gas supply." },
  { q: "Is a gas cooker cheaper to run than electric?", a: "It depends on gas and electricity prices at the time. Many people choose gas for the instant heat control on the hob." },
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

export default function GasCookerInstallation() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", postcode: "", make: "", day: "Any day" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    const message =
      `Gas cooker installation request%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      `Postcode: ${encodeURIComponent(form.postcode)}%0A` +
      `Cooker make/model: ${encodeURIComponent(form.make || "Not given")}%0A` +
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
                "foundingDate": "2007",
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
                "name": "Gas Cooker Installation in Watford",
                "serviceType": "Gas Cooker Installation",
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
          src="/gas1.webp"
          alt="Gas cooker installation background"
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
              Gas Safe No. 574111 &nbsp;|&nbsp; Most fits under an hour &nbsp;|&nbsp; Safe to use same day
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-[1.05] text-center">
              Gas Cooker Installation <span className="text-orange-500">in Watford</span>
            </h1>

            <p className="text-base md:text-xl text-sky-50/90 max-w-2xl mx-auto font-medium leading-relaxed text-center">
              New gas cooker or hob? By law, it must be fitted by a Gas Safe registered engineer. We connect it, test every joint for leaks, check the flame and clean up, so you can cook the same day.
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
        {/* Wrapped 2-line layout without horizontal scrolling */}
        <div className="py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 mt-10 px-4 flex justify-center">
          <div
            role="tablist"
            className="flex flex-wrap justify-center gap-2 p-2 bg-white border border-orange-500 rounded-2xl shadow-sm max-w-5xl w-full"
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
                className={`px-4 py-2.5 rounded-xl font-semibold text-sm text-center transition-all ${
                  activeTab === i
                    ? "bg-[#027cc1] text-white shadow-md"
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
              {/* Image Container with Natural Auto-Height Sizing */}
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] bg-gradient-to-br from-orange-400/30 to-sky-400/30" />
                <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl bg-white">
                  <NextImage
                    src={s.image}
                    alt={s.alt}
                    width={800}
                    height={600}
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="w-full h-auto object-cover"
                  />
                  <span className="absolute top-5 left-5 bg-white/90 backdrop-blur text-[#027cc1] font-extrabold text-lg w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg z-10">
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
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">Book a Cooker Fit</h2>
            <p className="text-sky-100 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Fill in a few details and we will get back to you. Fixed price before we start, leak checked & safe to use same day.
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
                <label htmlFor="make" className="block text-sm font-bold text-gray-700 mb-2">Cooker make/model (optional)</label>
                <input id="make" name="make" value={form.make} onChange={handleChange} placeholder="e.g. Beko / Stoves" className={inputClass} />
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
              Book a Cooker Fit <IconArrow />
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
        heading="Book Your Gas Cooker Fit"
        text="Speak to a local Gas Safe engineer. Fixed prices, safe to use the same day."
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