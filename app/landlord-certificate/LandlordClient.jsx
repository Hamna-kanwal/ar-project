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
  Star
} from 'lucide-react';

// Images, icons and phone link stay in code
const HERO_IMAGE = "/certification.webp";
const HERO_IMAGE_ALT = "Boiler breakdown and repair background";
const PHONE_TEL = "+447800657141";
const inspectionIcons = [FileText, AlertTriangle, CheckCircle, Gauge, Flame];
const inspectionBoxStyles = ["bg-blue-50 text-[#027cc1]", "bg-orange-50 text-[#ff6600]"];

const defaultHero = {
  title: "Landlord Gas",
  titleHighlight: "safety Certificate",
  paragraph:
    "If you're a landlord or letting agent, keeping your tenants safe isn't optional, it's the law. Under the Gas Safety (Installation and Use) Regulations 1998, every rental property needs a valid gas safety certificate (CP12), renewed every 12 months.",
  quoteButton: "Get my free quote",
  callButton: "Call: +44 7800 657141",
};

const defaultExperience = {
  heading: "AR Heating Services",
  paragraphs: [
    "AR Heating Services has been carrying out landlord gas safety inspections across Watford, Harrow, London and the surrounding areas for the last 18 years. We're Gas Safe registered registration number 574111, and we've certified 8000 properties / CP12s for local landlords and letting agents to date.",
    "Our job is simple: keep your properties legal, your tenants safe, and the whole process off your to-do list.",
  ],
  stats: [
    { value: "18", label: "Years Experience" },
    { value: "8000", label: "Properties Certified" },
  ],
  gasSafeCard: { title: "Gas Safe Registered", number: "Registration Number: 574111" },
};

const defaultBoxes = [
  {
    title: "Booking Made Easy for Landlords",
    paragraphs: [
      "Chasing tenants to find a time that works for everyone eats up a whole afternoon. So don't — just send us their contact details, and we'll take it from there. Our admin team gets in touch directly, works around their schedule, and books the inspection in without you lifting a finger.",
      "We already do this for letting agencies across Wembley, Watford, Harrow and other partner areas. If you manage multiple properties, ask us about batch scheduling we can align renewal dates across a portfolio so you're not chasing separate appointments every month.",
    ],
  },
  {
    title: "Qualified Engineers, Every Time",
    paragraphs: [
      "Every inspection is carried out by a lead engineer, a Gas Safe registered engineer with 11 years of experience across residential and rental properties. When it comes to safety and compliance, we don't cut corners.",
    ],
    badge: "Gas Safe Registered • 574111",
  },
];

const defaultInspection = {
  heading: "What Does a CP12 Inspection Cover?",
  subtitle: "Our engineers carry out a full check of every gas appliance, flue, and pipe in the property:",
  cards: [
    { title: "Legal compliance", desc: "A proper certificate confirming your property meets current UK housing and safety regulations." },
    { title: "Carbon monoxide checks", desc: "Testing to catch hidden leaks before they become dangerous." },
    { title: "Efficiency checks", desc: "Making sure appliances run efficiently, which helps keep tenants' energy bills down." },
    { title: "Pressure and ignition safety", desc: "Confirming gas pressure is correct and everything ignites safely." },
    { title: "Early problem spotting", desc: "Catching small issues in boilers or pipework before they become expensive repairs." },
  ],
};

const defaultCoverage = {
  heading: "Where We Cover",
  columns: ["Area", "Towns Covered", "Turnaround"],
  rows: [
    ["Harrow & surrounding", "Harrow, Pinner, Stanmore, Northolt", "Digital CP12 within 24 hours"],
    ["Watford & surrounding", "Watford, Edgware", "Digital CP12 within 24 hours"],
    ["West & Greater London", "London, Wembley, Ealing, Southall, Uxbridge", "Digital CP12 within 24 hours"],
  ],
};

const defaultFaqHeading = "Frequently Asked Question";

const defaultFaqs = [
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

const defaultReviews = {
  heading: "What Landlords Say",
  items: [
    { quote: "Excellent, hassle-free service. They contacted my tenants directly in Pinner, sorted out the keys, and sent the digital certificate the next morning.", author: "Sarah, landlord in Pinner" },
    { quote: "AR Heating looks after our entire Watford rental portfolio. Having synchronized renewal dates has saved us massive amounts of admin work.", author: "David K., Letting Agent in Watford" },
    { quote: "Very professional team. They turned up on time in Harrow, did a thorough safety check on our boilers, and the CP12 was in my email within hours.", author: "James L., Landlord in Harrow" },
    { quote: "Been using them for 5 years now for all my properties across Wembley and West London. Reliable, reasonably priced, and always Gas Safe registered.", author: "Amara, Letting Agent in Wembley" },
  ],
};

// Use the database array only when it is a non-empty array, otherwise keep the default
const pickArray = (value, fallback) =>
  Array.isArray(value) && value.length > 0 ? value : fallback;

export default function LandlordClient({ content }) {
  const [openIndex, setOpenIndex] = useState(0);

  // Merge database content over the defaults
  const c = content && typeof content === "object" ? content : {};
  const hero = { ...defaultHero, ...(c.hero || {}) };
  const experience = { ...defaultExperience, ...(c.experience || {}) };
  const experienceParas = pickArray(experience.paragraphs, defaultExperience.paragraphs);
  const experienceStats = pickArray(experience.stats, defaultExperience.stats);
  const gasSafeCard = { ...defaultExperience.gasSafeCard, ...(experience.gasSafeCard || {}) };
  const boxes = pickArray(c.boxes, defaultBoxes);
  const booking = { ...defaultBoxes[0], ...(boxes[0] || {}) };
  const engineers = { ...defaultBoxes[1], ...(boxes[1] || {}) };
  const bookingParas = pickArray(booking.paragraphs, defaultBoxes[0].paragraphs);
  const engineerParas = pickArray(engineers.paragraphs, defaultBoxes[1].paragraphs);
  const inspection = { ...defaultInspection, ...(c.inspection || {}) };
  const inspectionCards = pickArray(inspection.cards, defaultInspection.cards);
  const coverage = { ...defaultCoverage, ...(c.coverage || {}) };
  const columns = pickArray(coverage.columns, defaultCoverage.columns);
  const rows = pickArray(coverage.rows, defaultCoverage.rows);
  const faqHeading = c.faqHeading || defaultFaqHeading;
  const faqs = pickArray(c.faqs, defaultFaqs);
  const reviews = { ...defaultReviews, ...(c.reviews || {}) };
  const reviewItems = pickArray(reviews.items, defaultReviews.items);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">

      {/* Hero Section */}
      <section className="relative w-full h-[800px] flex items-center justify-center overflow-hidden">
        <NextImage
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            {hero.title} <span className="text-orange-500"> {hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
            {hero.paragraph}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/contact" className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600">{hero.quoteButton}</Link>
            <a href={`tel:${PHONE_TEL}`} className="border-2 border-[#027cc1] text-[#027cc1] px-8 py-3 rounded-lg font-bold hover:bg-[#027cc1] hover:text-white">{hero.callButton}</a>
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
                {experience.heading}
              </h2>
              {experienceParas.map((p, i) => (
                <p
                  key={i}
                  className={`text-gray-600 text-base md:text-lg leading-relaxed ${i > 0 ? "font-semibold" : ""}`}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Right Column: Stats */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experienceStats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                  <span className={`text-4xl font-extrabold mb-1 ${i % 2 === 0 ? "text-[#027cc1]" : "text-[#ff6600]"}`}>{s.value}</span>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{s.label}</span>
                </div>
              ))}

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 sm:col-span-2 flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-[#027cc1] shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{gasSafeCard.title}</h4>
                  <p className="text-xs text-gray-500">{gasSafeCard.number}</p>
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
                  {booking.title}
                </h2>
              </div>
              {bookingParas.map((p, i) => (
                <p
                  key={i}
                  className={`text-gray-600 text-sm md:text-base leading-relaxed ${i < bookingParas.length - 1 ? "mb-4" : ""}`}
                >
                  {p}
                </p>
              ))}
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
                  {engineers.title}
                </h2>
              </div>
              {engineerParas.map((p, i) => (
                <p
                  key={i}
                  className={`text-gray-600 text-sm md:text-base leading-relaxed ${i < engineerParas.length - 1 ? "mb-4" : ""}`}
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 hidden md:block">
              <span className="text-xs font-semibold text-[#027cc1] tracking-wider uppercase bg-blue-50 px-2.5 py-1 rounded">
                {engineers.badge}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* What Does a CP12 Inspection Cover */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#027cc1]">{inspection.heading}</h2>
          <p className="text-gray-500 mt-2">{inspection.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspectionCards.map((card, i) => {
            const Icon = inspectionIcons[i % inspectionIcons.length];
            return (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${inspectionBoxStyles[i % inspectionBoxStyles.length]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-gray-950 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Where We Cover Table Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <MapPin className="w-8 h-8 text-[#027cc1]" />
            <h2 className="text-3xl font-bold text-[#027cc1]">{coverage.heading}</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="bg-[#027cc1] text-white">
                  {columns.map((col, i) => (
                    <th key={i} className="p-4 font-semibold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-bold text-gray-900">{row[0]}</td>
                    <td className="p-4 text-gray-600">{row[1]}</td>
                    <td className="p-4 font-semibold text-[#ff6600]">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive FAQs Accordion Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-3 mb-10 ">
            <h2 className="text-3xl font-bold text-black">{faqHeading}</h2>
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
            {reviews.heading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviewItems.map((r, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-[#ff6600] text-left relative">
                <span className="text-5xl text-orange-200 font-serif absolute top-3 left-4 select-none opacity-40">“</span>
                <div className="relative z-10 pl-6">
                  <div className="flex gap-1 mb-4 text-[#ff6600]">
                    {[...Array(5)].map((_, s) => <Star key={s} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-gray-600 italic mb-4">&quot;{r.quote}&quot;</p>
                  <h4 className="font-bold text-[#027cc1]">— {r.author}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}