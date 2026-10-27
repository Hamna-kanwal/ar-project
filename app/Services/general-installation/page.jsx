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
const GOOGLE_REVIEWS_URL = "#";

const SHOW_OFFER = false;
const OFFER_TEXT = "Offer text and end date go here.";

const blockImages = [
  "/o1.webp",
  "/o2.webp",
  "/o3.webp",
  "/o4.webp",
  "/o5.webp",
  "/o6.webp",
  "/o7.webp",
  "/o8.webp",
  "/o9.webp",
  "/o11.webp",
];

const serviceDetails = [
  {
    title: "What jobs do you take on?",
    tab: "Overview",
    paras: [
      "We fit a wide range of heating, plumbing and appliance items around the home, including:"
    ],
    list: [
      "Gas cookers and gas hobs",
      "Washing machines and dishwashers",
      "Kitchen and bathroom taps",
      "Radiators, radiator valves and towel rails",
      "Stop taps, isolation valves and outside taps",
      "Toilets, basins and shower valves",
      "Thermostats and heating controls"
    ],
    parasAfter: [
      "Not sure if we do it? Ask us. If we cannot help, we will tell you straight away."
    ],
    alt: "Engineer fitting a new kitchen tap in Watford"
  },
  {
    title: "Do you fit gas appliances?",
    tab: "Gas Appliances",
    paras: [
      "Yes. By law, gas cookers, hobs and other gas appliances must be fitted by a Gas Safe registered engineer. We connect the appliance, test every joint for leaks, check the flame and make sure there is enough ventilation. You can use it the same day.",
      "See our gas cooker installation page for more detail."
    ],
    alt: "Gas Safe engineer connecting a gas hob in Watford"
  },
  {
    title: "Do you plumb in washing machines and dishwashers?",
    tab: "Appliances",
    paras: [
      "Yes. We connect the water supply and waste, fit new valves where needed, level the machine, test for leaks and run a cycle before we leave. Most fits take under an hour, and we can take your old machine away.",
      "See our washing machine and dishwasher pages for more detail."
    ],
    alt: "Washing machine plumbed in by an engineer"
  },
  {
    title: "Can you replace a radiator or towel rail?",
    tab: "Radiators",
    paras: [
      "Yes. We drain the system, remove the old radiator, fit the new one and new valves, then refill, bleed and test. We can fit a heated towel rail in a bathroom, swap a radiator for a larger one in a cold room, or move a radiator to suit a new layout."
    ],
    alt: "Radiator replaced in a Watford home"
  },
  {
    title: "Are your prices clear?",
    tab: "Clear Pricing",
    paras: [
      "Yes. Tell us what you need, and we give you a fixed price before any work starts. No hidden costs, no surprises. Quotes are free.",
      "We turn up on time, do the job properly, and leave your home clean. If we spot anything else worth fixing while we are there, we tell you, and you decide."
    ],
    alt: "Fixed price quote for a small plumbing job"
  },
  {
    title: "Can you do several small jobs in one visit?",
    tab: "Multiple Jobs",
    paras: [
      "Yes, and it often saves you money. Make a list of the jobs around your home, such as a dripping tap, a sticking valve and a new appliance to connect, and we can quote for them all and do them in one visit."
    ],
    alt: "Engineer doing several small jobs in one visit"
  },
  {
    title: "Why choose AR Heating?",
    tab: "Why Us",
    paras: [
      "We are a local Watford company, trading since 2007, and every gas job is done under our Gas Safe registration, No. 574111. We give you a fixed price before we start, turn up when we say we will, and leave your home as clean as we found it. If something is not worth doing, we tell you."
    ],
    alt: "Gas Safe registered AR Heating engineer"
  },
  {
    title: "Can you fit an outside tap?",
    tab: "Outside Tap",
    paras: [
      "Yes. An outside tap makes watering the garden and washing the car far easier. We fit the tap with a check valve to protect your drinking water, and an isolation valve inside so you can turn it off in winter to stop it freezing."
    ],
    alt: "Outside tap fitted on a Watford home"
  },
  {
    title: "Why fit isolation valves?",
    tab: "Isolation Valves",
    paras: [
      "An isolation valve lets you turn off the water to one tap, toilet or appliance without shutting off the whole house. If something leaks, you can stop it fast. We fit them under sinks, behind toilets and on appliance supplies, often as part of another job."
    ],
    alt: "Isolation valve fitted under a sink"
  },
  {
    title: "Where do you cover?",
    tab: "Areas Covered",
    paras: [
      "We are based at Unit 24, The Roundway, Watford, WD18 6LB, and fit appliances and fittings across Watford, Bushey, Rickmansworth, Hemel Hempstead, St Albans, Harrow, Pinner, Stanmore, Edgware, Ruislip and Northolt. We are Gas Safe registered (No. 574111), fully insured, and you can check our number on the Gas Safe Register before we arrive."
    ],
    alt: "AR Heating engineer at a home in Watford"
  }
];

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
const IconFlame = ({ className = "w-7 h-7" }) => (
  <svg {...svgProps} className={className}><path d="M12 2c0 3-2 5-2 8a4 4 0 008 0c0-3-2-5-2-8z" /><path d="M12 22a7 7 0 007-7c0-2-1-3.5-2.5-5-.5 2-2 3-3.5 3s-2-1-2.5-3C9 11.5 8 13 8 15a7 7 0 004 7z" /></svg>
);
const IconSliders = ({ className = "w-7 h-7" }) => (
  <svg {...svgProps} className={className}><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>
);

const trustItems = [
  { icon: <IconShield />, label: "Gas Safe No. 574111" },
  { icon: <IconPin />, label: "Local since 2007" },
  { icon: <IconTag />, label: "Fixed price before we start" },
  { icon: <IconClock />, label: "Open 7 days a week" },
];

const reviews = [
  { name: "First name", town: "Watford", rating: 5, text: "Fitted our gas hob and new tap professionally. Very neat!" },
  { name: "First name", town: "Bushey", rating: 5, text: "Fixed price, turned up on time and left everything clean." },
  { name: "First name", town: "Rickmansworth", rating: 5, text: "No job is too small for them. Highly recommended." },
];

const engineer = {
  name: "Lead Engineer",
  gasSafeId: "Gas Safe No. 574111",
  experience: "12+ Years Experience",
  photo: "/installation1.webp",
};

const relatedServices = [
  {
    title: "Gas Cooker Installation",
    desc: "Cookers and hobs fitted and leak checked.",
    href: "/Services/gas-cooker",
    icon: <IconFlame />,
  },
  {
    title: "Washing Machine Installation",
    desc: "Plumbed in and tested before we leave.",
    href: "/Services/washing-machine",
    icon: <IconWrench />,
  },
  {
    title: "Dishwasher Installation",
    desc: "Water, waste and leak checks done for you.",
    href: "/Services/dishwasher",
    icon: <IconSliders />,
  },
];

const faqs = [
  { q: "What kind of jobs do you take on?", a: "A wide range of heating, plumbing and appliance installation work. If you are not sure, just ask." },
  { q: "Do you charge for a quote?", a: "No. Quotes are free and clear, given before any work starts." },
  { q: "Can you do small jobs?", a: "Yes. No job is too small." },
  { q: "Can I fit a gas hob myself?", a: "No. By law, gas appliances must be fitted by a Gas Safe registered engineer." },
  { q: "How long does an appliance fit take?", a: "Most cooker, washing machine and dishwasher fits take under an hour." },
  { q: "Can you take my old appliance away?", a: "Yes. We can remove the old machine and clear the space." },
  { q: "Can you do several jobs in one visit?", a: "Yes. Send us your list and we will quote for everything together." },
  { q: "Do you supply the parts?", a: "We can supply fittings and parts, or fit items you have already bought. We will confirm in your quote." },
  { q: "Can you fit an outside tap?", a: "Yes. We fit outside taps with a check valve and an inside isolation valve." },
  { q: "Do you fit heated towel rails?", a: "Yes. We fit towel rails on your heating system, and swap old radiators for new ones." },
  { q: "Can you move a radiator?", a: "Yes. We can move a radiator to suit a new room layout, and change the pipework to match." },
  { q: "Are you Gas Safe registered?", a: "Yes. AR Heating is Gas Safe registered, No. 574111. You can check our number on the official Gas Safe Register." }
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



export default function GeneralInstallationPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", postcode: "", make: "", day: "Any day" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    const message =
      `General installation quote request%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      `Postcode: ${encodeURIComponent(form.postcode)}%0A` +
      `Details: ${encodeURIComponent(form.make || "Not given")}%0A` +
      `Preferred day: ${encodeURIComponent(form.day)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="pb-20 md:pb-0 bg-white text-gray-900">
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
                "name": "General Installation in Watford",
                "serviceType": "Plumbing and appliance installation",
                "provider": { "@id": "https://www.arheatingservice.co.uk/#business" },
                "areaServed": "Watford"
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": { "@type": "Answer", "text": faq.a }
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

      {/* ============ HERO SECTION ============ */}
      <section className="relative w-full min-h-[680px] flex items-center justify-center overflow-hidden pb-32 pt-36">
        <NextImage
          src="/installation1.webp"
          alt="General installation background"
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
              Gas Safe No. 574111 &nbsp;|&nbsp; No job too small &nbsp;|&nbsp; Fixed price before we start
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-[1.05] text-center">
              General <span className="text-orange-500">Installation in Watford</span>
            </h1>

            <p className="text-base md:text-xl text-sky-50/90 max-w-2xl mx-auto font-medium leading-relaxed text-center">
              From a new tap to a gas hob, our engineers fit it safely and leave your home tidy. We handle small heating, plumbing and appliance jobs which many firms turn down, with a fixed price agreed before we start.
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

      {/* ============ SERVICE BLOCKS (ALL 10 CARDS & GRID TABS) ============ */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto mt-12 px-6">
          <div
            role="tablist"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-2 bg-white border border-orange-500 rounded-2xl shadow-sm"
          >
            {serviceDetails.map((s, i) => (
              <button
                key={i}
                id={`install-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={activeTab === i}
                aria-controls={`install-panel-${i}`}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-3 rounded-xl font-semibold text-xs sm:text-sm text-center transition-all ${
                  activeTab === i
                    ? "bg-[#027cc1] text-white shadow-md"
                    : "text-gray-700 bg-gray-50 hover:bg-sky-50 hover:text-[#027cc1]"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {serviceDetails.map((s, i) => {
            const primary = blockImages[i % blockImages.length];
            return (
              <div
                key={i}
                id={`install-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`install-tab-${i}`}
                hidden={activeTab !== i}
                className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                <div className="relative">
                  <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] bg-gradient-to-br from-orange-400/30 to-sky-400/30" />
                  <div className="relative h-[360px] md:h-[420px] w-full rounded-[2rem] overflow-hidden shadow-2xl bg-gray-200">
                    <NextImage
                      src={primary}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#021f33]/40 via-transparent to-transparent" />
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
                  {s.paras && s.paras.map((p, pi) => (
                    <p key={pi} className="text-gray-600 text-lg leading-relaxed mb-4">{p}</p>
                  ))}
                  {s.list && (
                    <ul className="grid sm:grid-cols-2 gap-3 mb-4">
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
                  {s.parasAfter && s.parasAfter.map((p, pi) => (
                    <p key={pi} className="text-gray-600 text-lg leading-relaxed mb-4">{p}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

 
       <MeetYourEngineer />
 
       <ReviewsSection />

      {/* ============ FREQUENTLY ASKED QUESTIONS ============ */}
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

      {/* ============ QUICK BOOKING FORM ============ */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-[#021f33] via-[#02466f] to-[#027cc1]">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white text-center lg:text-left">
            <Eyebrow light>Quick booking</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">Get a Free Quote for Your Job</h2>
            <p className="text-sky-100 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Speak to a local engineer. Fixed prices, no job too small.
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
              Get My Free Quote <IconArrow />
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