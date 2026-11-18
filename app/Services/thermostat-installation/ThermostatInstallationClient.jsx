"use client";
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import CtaBanner from '../../Components/CTA';
import ReviewsSection from '../../Components/ReviewsSection';
import MeetYourEngineer from '../../Components/MeetYourEngineer';
import {
  IconShield, IconPin, IconTag, IconClock, IconCheck, IconArrow,
  IconPhone, IconChat, IconWrench, IconFlame, IconSliders,
} from '../_shared/icons';

const DEFAULT_PHONE_DISPLAY = "+44 7800 657141";
const DEFAULT_PHONE_TEL = "+447800657141";
const WHATSAPP_NUMBER = "447800657141";

const SHOW_OFFER = false;
const OFFER_TEXT = "Offer text and end date go here.";

// Tab images stay in code and are matched to tabs by position
const blockImages = [
  "/t1.webp",
  "/t2.webp",
  "/t3.webp",
  "/t4.webp",
  "/t5.webp",
  "/t6.webp",
  "/t7.webp",
  "/t8.webp",
  "/t9.webp",
  "/t10.webp"
];

const defaultHero = {
  image: "/installation1.webp",
  imageAlt: "Thermostat installation background",
  badge: "Gas Safe No. 574111 | Full set up included | Fixed price before we start",
  title: "Thermostat and Smart Thermostat",
  titleHighlight: "Installation in Watford",
  paragraph:
    "The right thermostat puts you in control of your heating and your bills. We fit simple room thermostats, programmable and wireless models, and smart controls such as Hive and Google Nest, then set everything up and show you how it works.",
  primaryButton: "Get my free quote",
  callLabel: "Call:",
  phoneDisplay: DEFAULT_PHONE_DISPLAY,
  phoneTel: DEFAULT_PHONE_TEL,
};

const defaultTrustLabels = [
  "Gas Safe No. 574111",
  "Local since 2007",
  "Fixed price before we start",
  "Open 7 days a week",
];

const defaultFaqSection = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  subtitle: "Still unsure? Call or WhatsApp us and we will help.",
};

const defaultServiceDetails = [
  {
    title: "Why fit a new thermostat?",
    tab: "Overview",
    paras: [
      "An old dial thermostat in a cold hallway often leaves some rooms too hot and others too cold. A modern thermostat heats your home when you need it and saves energy when you do not. With a timer or a smart control, you stop paying to heat an empty house."
    ],
    alt: "New thermostat fitted in a Watford home"
  },
  {
    title: "Which thermostat should I pick?",
    tab: "Options",
    paras: [
      "We talk you through the options and help you choose:"
    ],
    list: [
      "Room thermostat: a simple dial or digital control for one temperature",
      "Programmable thermostat: set different times and temperatures for each day",
      "Wireless thermostat: no wires, so you can move it to the room you use most",
      "Smart thermostat: control your heating from your phone, from anywhere",
      "Smart radiator valves: control the temperature room by room"
    ],
    parasAfter: [
      "Not sure? Tell us how you use your home, and we will suggest the best fit for your budget."
    ],
    alt: "Different types of heating thermostats"
  },
  {
    title: "Can I control my heating from my phone?",
    tab: "Smart App",
    paras: [
      "Yes, with a smart thermostat. Turn the heating on before you get home, switch it off from bed, or set a schedule from anywhere. We fit Hive, Google Nest and other brands, link the app to your phone and test it with your boiler. See our Hive and Nest pages for more on each."
    ],
    alt: "Smart thermostat app controlling home heating"
  },
  {
    title: "Do you set the thermostat up for me?",
    tab: "Full Setup",
    paras: [
      "Yes. We wire in the thermostat, test the link to your boiler, set your schedule and temperatures, and walk you through the controls. If you choose a smart thermostat, we link the app to your phone before we leave. You do not need to read the manual."
    ],
    alt: "Engineer wiring and testing a thermostat with a boiler"
  },
  {
    title: "Will a new thermostat work with my boiler?",
    tab: "Boiler Compatibility",
    paras: [
      "Most thermostats work with most boilers. Some smart features need a compatible boiler, and some older systems need extra wiring. We check your boiler and wiring first, and recommend a thermostat which works properly with your system."
    ],
    alt: "Checking a thermostat works with an existing boiler"
  },
  {
    title: "Can you fit radiator valves too?",
    tab: "Radiator Valves",
    paras: [
      "Yes. Thermostatic radiator valves let you set a different temperature in each room, so bedrooms stay cooler and living rooms stay warm. Smart radiator valves go further and let you control each room from your phone. Many customers add these when they fit a new thermostat."
    ],
    alt: "Thermostatic radiator valves fitted to radiators"
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
    title: "Where should my thermostat go?",
    tab: "Best Location",
    paras: [
      "Your thermostat reads the temperature where it sits. In a cold hallway or next to a radiator, it gives a false reading, and the rest of the house ends up too hot or too cold. The best spot is the room you use most, away from draughts, direct sun and heat sources. A wireless thermostat makes this easy, as it can sit on a shelf or wall in any room."
    ],
    alt: "Wireless thermostat placed in a living room"
  },
  {
    title: "Can you replace my old timer and thermostat?",
    tab: "Old Timers",
    paras: [
      "Yes. Many homes still have a separate timer on the boiler and a dial thermostat on the wall. We can replace both with one programmable or smart thermostat, which is easier to use and gives you better control over your heating."
    ],
    alt: "Old heating timer replaced with a programmable thermostat"
  },
  {
    title: "Where do you cover?",
    tab: "Areas Covered",
    paras: [
      "We are based at Unit 24, The Roundway, Watford, WD18 6LB, and fit thermostats across Watford, Bushey, Rickmansworth, Hemel Hempstead, St Albans, Harrow, Pinner, Stanmore, Edgware, Ruislip and Northolt. We are Gas Safe registered (No. 574111), fully insured, and you can check our number on the Gas Safe Register before we arrive."
    ],
    alt: "AR Heating engineer at a home in Watford"
  }
];

// Icons stay in code; labels come from the database by index
const trustIcons = [<IconShield key="s" />, <IconPin key="p" />, <IconTag key="t" />, <IconClock key="c" />];

const relatedServices = [
  {
    title: "Hive Installation",
    desc: "Hive smart heating fitted and set up.",
    href: "/Services/hive",
    icon: <IconSliders />,
  },
  {
    title: "Nest Installation",
    desc: "Google Nest learning thermostats fitted.",
    href: "/Services/nest",
    icon: <IconFlame />,
  },
  {
    title: "Boiler Service",
    desc: "Keep your boiler running well alongside your new controls.",
    href: "/Services/boiler",
    icon: <IconWrench />,
  },
];

const defaultFaqs = [
  { q: "Which thermostat should I pick?", a: "It depends on how you use your home and your budget. We talk you through simple dials, programmable, wireless and smart options and help you choose." },
  { q: "Can I control my heating from my phone?", a: "Yes, with a smart thermostat. We fit Hive, Google Nest and other brands." },
  { q: "Will a new thermostat save me money?", a: "It can. Better control means less heat wasted in empty rooms and empty hours." },
  { q: "Will a new thermostat work with my boiler?", a: "Most do. We check your boiler and wiring first and recommend one which works properly." },
  { q: "Do I need wifi for a smart thermostat?", a: "Yes. Smart thermostats use your home wifi to connect to the app." },
  { q: "Can you move my thermostat to a better spot?", a: "Yes. A wireless thermostat can go in the room you use most, away from draughts and heat sources." },
  { q: "How long does a thermostat fit take?", a: "Most fits take a few hours at most, including set up and showing you how it works." },
  { q: "Can you fit thermostatic radiator valves?", a: "Yes. We fit standard and smart radiator valves for room by room control." },
  { q: "Where is the best place for a thermostat?", a: "In the room you use most, away from draughts, radiators and direct sun." },
  { q: "Can you replace my boiler timer as well?", a: "Yes. A programmable or smart thermostat can replace both your timer and your old thermostat." },
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

// Use the database array only when it is a non-empty array, otherwise keep the default
const pickArray = (value, fallback) =>
  Array.isArray(value) && value.length > 0 ? value : fallback;

export default function ThermostatInstallationClient({ content }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", postcode: "", make: "", day: "Any day" });

  // Merge database content over the defaults
  const c = content && typeof content === "object" ? content : {};
  const hero = { ...defaultHero, ...(c.hero || {}) };
  const faqSection = { ...defaultFaqSection, ...(c.faqSection || {}) };
  const trustLabels = pickArray(c.trustItems, defaultTrustLabels);
  const serviceDetails = pickArray(c.serviceDetails, defaultServiceDetails);
  const faqs = pickArray(c.faqs, defaultFaqs);

  const PHONE_DISPLAY = hero.phoneDisplay;
  const PHONE_TEL = hero.phoneTel;
  const badgeParts = String(hero.badge).split("|").map((part) => part.trim());

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    const message =
      `Thermostat installation quote request%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      `Postcode: ${encodeURIComponent(form.postcode)}%0A` +
      `Boiler Make: ${encodeURIComponent(form.make || "Not given")}%0A` +
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
                "name": "Thermostat Installation in Watford",
                "serviceType": "Thermostat installation",
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
          }).replace(/</g, "\\u003c")
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
          src={hero.image}
          alt={hero.imageAlt}
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
              {badgeParts.join(" \u00A0|\u00A0 ")}
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-[1.05] text-center">
              {hero.title} <span className="text-orange-500">{hero.titleHighlight}</span>
            </h1>

            <p className="text-base md:text-xl text-sky-50/90 max-w-2xl mx-auto font-medium leading-relaxed text-center">
              {hero.paragraph}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mt-9 w-full">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all">
                {hero.primaryButton} <IconArrow />
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#027cc1] transition-colors">
                <IconPhone /> {hero.callLabel} {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="relative z-20 -mt-16 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl shadow-sky-900/10 border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
          {trustLabels.map((label, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-3 p-6">
              <span className="w-12 h-12 shrink-0 rounded-2xl bg-sky-50 text-[#027cc1] flex items-center justify-center">
                {trustIcons[i % trustIcons.length]}
              </span>
              <p className="font-bold text-gray-900 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SERVICE BLOCKS (GRID TABS) ============ */}
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
            <Eyebrow>{faqSection.eyebrow}</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#03304b] leading-tight mb-4">{faqSection.title}</h2>
            <p className="text-gray-600 text-lg mb-6">{faqSection.subtitle}</p>
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
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">Get Your Free Thermostat Quote</h2>
            <p className="text-sky-100 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Speak to a local engineer. Fixed prices, full set up included.
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
              Get My Free Thermostat Quote <IconArrow />
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