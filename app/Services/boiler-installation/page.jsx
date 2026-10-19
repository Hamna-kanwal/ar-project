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

const resolveTabImage = (src) => encodeURI(src);

const serviceDetails = [
  {
    title: "How do I know I need a new boiler?",
    tab: "Need New Boiler?",
    image: "/new boiler.png",
    paras: [
      "Boilers rarely quit all at once. Watch for higher bills with no clear reason, radiators slow to warm, banging or gurgling, a yellow flame instead of a blue one, and repair bills piling up. A boiler over ten years old on its second or third repair is often near the end, and a new one can cost less over time than more fixes.",
      "Older boilers also tend to waste more gas, so a new A rated boiler can help bring your heating bills down as well as end the cycle of call outs.",
    ],
    alt: "Engineer checking an old boiler before replacement in Watford",
  },
  {
    title: "Should I repair or replace my boiler?",
    tab: "Repair or Replace",
    image: "/repairings.png", // <-- Doosri tab ki image
    paras: [
      "If your boiler is under ten years old and the fault is a single worn part, a repair is usually the better choice. If the boiler is older, needs parts which are hard to find, or has broken down several times in a year, replacing it often costs less over time.",
      "Our engineers give you an honest answer. If a repair makes more sense, we will tell you, and quote for the repair instead.",
    ],
    alt: "Engineer advising on boiler repair or replacement in Watford",
  },
  {
    title: "Which boiler is best for my home?",
    tab: "Which Boiler?",
    image: "/which boiler.png", // <-- Teesri tab ki image
    paras: [
      "The best boiler is the one built for your home and your hot water use. A combi heats water on demand with no tank. A system boiler feeds many taps at once. A regular boiler suits older homes with a tank in the loft. We look at your home and help you choose.",
    ],
    alt: "Combi boiler and hot water cylinder side by side",
  },
  {
    title: "How much does a new boiler cost in Watford?",
    tab: "Costs",
    image: "/costs.png", // <-- Chauthi tab ki image
    paras: [
      "A new combi boiler, fitted, usually costs between £1,800 and £3,500. The price depends on the boiler type, brand and model, moving the boiler to a new spot, changing boiler type, and extras such as a power flush or a new flue. We visit, look at your home and give you a fixed price in writing. The price we quote is the price you pay.",
    ],
    alt: "Engineer giving a fixed price boiler quote in Watford",
  },
  {
    title: "Combi or system boiler: what is the difference in cost?",
    tab: "Combi vs System",
    image: "/combi vs system.png", // <-- Paanchvi tab ki image
    paras: [
      "A combi swap is usually the quickest and lowest cost fit, as there is no tank or cylinder to replace. A system or regular boiler fit costs more, because the cylinder and pipework also need work. Changing from one boiler type to another, such as a regular boiler to a combi, adds time and cost too.",
      "The right choice depends on your bathrooms and hot water use, not just the price. We explain both options in your quote, so you can compare them side by side.",
    ],
    alt: "Hot water running from several taps at once",
  },
  {
    title: "Which boiler brands do you fit?",
    tab: "Brands",
    image: "/brands.png", // <-- Chhati tab ki image
    paras: [
      "We fit A rated boilers from Worcester Bosch, Vaillant, Ideal and Baxi. Most come with a manufacturer warranty of up to 10 years, depending on the model, and we register the warranty for you after fitting.",
    ],
    alt: "New A rated boilers from leading brands",
  },
  {
    title: "What happens on fitting day?",
    tab: "Fitting Day",
    image: "/fittings.png", // <-- Sātvi tab ki image
    paras: [
      "Here is how a boiler fit works with us:",
    ],
    list: [
      "Free quote: we visit and look at your home",
      "Fixed price in writing, with no hidden extras",
      "Fitting day: old boiler out, new boiler in, most done in one day",
      "Testing: we test the boiler, flush the system and check every radiator",
      "Handover: we show you the controls and register your warranty",
      "Tidy up: we take the old boiler away and leave your home clean",
    ],
    alt: "Gas Safe engineer fitting a new boiler in Watford",
  },
  {
    title: "Can you add smart controls?",
    tab: "Smart Controls",
    image: "/smart control.png", // <-- Aathvi tab ki image
    paras: [
      "Yes. Add a Hive or Google Nest smart thermostat with your new boiler and control your heating from your phone. A power flush before fitting clears sludge from your pipes and helps your new boiler last longer.",
    ],
    alt: "Smart thermostat fitted with a new boiler",
  },
  {
    title: "Where do you fit boilers?",
    tab: "Areas Covered",
    image: "/installation-area.jpeg",
    customLayout: true,
    paras: [
      "We are based at Unit 24, The Roundway, Watford, WD18 6LB, and fit boilers across Watford, Bushey, Rickmansworth, Hemel Hempstead, St Albans, Harrow, Pinner, Stanmore, Edgware, Ruislip and Northolt. We are Gas Safe registered (No. 574111), fully insured, and you can check our number on the Gas Safe Register before we arrive.",
      "From the first visit to the warranty paperwork, one local team handles the whole job.",
    ],
    alt: "AR Heating engineer at a home in Watford",
  },
];

const boilerData = [
  {
    title: "Combi",
    bestFor: "Flats and small homes, one bathroom",
    tank: "No tank",
    points: "Quick fit, saves space, cheap to run",
  },
  {
    title: "System",
    bestFor: "Busy family homes, two or more bathrooms",
    tank: "Yes, a cylinder",
    points: "Runs many taps at once, steady flow",
  },
  {
    title: "Regular",
    bestFor: "Older homes with a loft tank",
    tank: "Yes, tank and cylinder",
    points: "Suits homes with the old set up in place",
  },
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
const IconDrop = ({ className = "w-7 h-7" }) => (
  <svg {...svgProps} className={className}><path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" /></svg>
);
const IconThermo = ({ className = "w-7 h-7" }) => (
  <svg {...svgProps} className={className}><path d="M14 14.8V4.5a2.5 2.5 0 00-5 0v10.3a4.5 4.5 0 105 0z" /></svg>
);

const trustItems = [
  { icon: <IconShield />, label: "Gas Safe No. 574111" },
  { icon: <IconPin />, label: "Local since 2012" },
  { icon: <IconTag />, label: "Fixed price before we start" },
  { icon: <IconClock />, label: "Open 7 days a week" },
];

const reviews = [
  { name: "First name", town: "Town", rating: 5, text: "Real Google review text goes here." },
  { name: "First name", town: "Town", rating: 5, text: "Real Google review text goes here." },
  { name: "First name", town: "Town", rating: 5, text: "Real Google review text goes here." },
];

const engineer = {
  name: "Engineer name",
  gasSafeId: "Gas Safe ID card number",
  experience: "Years of experience",
  photo: "/boilerservice2.webp",
};

const relatedServices = [
  {
    title: "Power Flushing",
    desc: "Clean your system before a new boiler goes in.",
    href: "/Services/power-flushing",
    icon: <IconDrop />,
  },
  {
    title: "Smart Thermostats",
    desc: "Hive and Google Nest fitted with your boiler.",
    href: "/Services/hive",
    icon: <IconThermo />,
  },
  {
    title: "Boiler Service",
    desc: "Keep your new boiler and warranty in good shape every year.",
    href: "/Services/boiler",
    icon: <IconWrench />,
  },
];

const faqs = [
  { q: "How much does a new boiler cost in Watford?", a: "A new combi boiler, fitted, usually costs between £1,800 and £3,500, depending on the brand and the work needed. We give a free fixed price before any work starts." },
  { q: "Can I fit a boiler myself?", a: "No. By law, a gas boiler must be fitted by a Gas Safe registered engineer. A bad fit can cause leaks, safety risks and a void warranty." },
  { q: "How long does a boiler fit take?", a: "Most boiler swaps take one day. Moving the boiler or changing its type can take two days." },
  { q: "How long does a boiler last?", a: "Around ten to fifteen years with a yearly service." },
  { q: "Combi or system boiler, which is best?", a: "A combi suits homes with one bathroom. A system boiler suits homes with two or more bathrooms, as it can feed several taps at once." },
  { q: "Which boiler brands do you fit?", a: "We fit Worcester Bosch, Vaillant, Ideal and Baxi boilers, with manufacturer warranties of up to 10 years depending on the model." },
  { q: "Can I pay over time?", a: "Ask about payment plans when you request your quote." },
  { q: "Do you take the old boiler away?", a: "Yes. We remove the old boiler safely and leave your home tidy." },
  { q: "Should I repair or replace my boiler?", a: "If your boiler is under ten years old with a single fault, a repair is usually best. If it is older and keeps breaking down, a new boiler often costs less over time." },
  { q: "Do I need a power flush with a new boiler?", a: "A power flush clears sludge from your pipes and radiators. Many boiler makers recommend cleaning the system when a new boiler goes in, to protect the boiler and the warranty." },
  { q: "Will I be without heating for long?", a: "Most fits are done in one day, so you are usually without heating and hot water only while the engineer works." },
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

export default function ServicesAndFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", postcode: "", make: "", day: "Any day" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    const message =
      `Boiler installation quote request%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      `Postcode: ${encodeURIComponent(form.postcode)}%0A` +
      `Boiler make: ${encodeURIComponent(form.make || "Not given")}%0A` +
      `Preferred day: ${encodeURIComponent(form.day)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="pb-20 md:pb-0 bg-white text-gray-900">
      {SHOW_OFFER && (
        <div className="bg-orange-500 text-white text-center text-sm md:text-base font-semibold px-6 py-3">
          {OFFER_TEXT}
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="relative w-full min-h-[680px] flex items-center overflow-hidden pb-32 pt-20">
        <NextImage
          src="/boilerservice1.webp"
          alt="Boiler installation background"
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#021f33]/95 via-[#02466f]/90 to-[#027cc1]/70" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-24 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="relative z-20 w-full px-6 md:px-12 flex justify-center items-center">
          <div className="max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Gas Safe No. 574111 &nbsp;|&nbsp; Combi boilers fitted from £1,800 &nbsp;|&nbsp; Warranties up to 10 years
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-[1.05]">
              Boiler Installation <span className="text-orange-500">in Watford</span>
            </h1>
            <p className="text-base md:text-xl text-sky-50/90 max-w-2xl mx-auto font-medium leading-relaxed">
              New combi, system and regular boilers fitted by Gas Safe engineers (No. 574111), local to Watford since 2012. We help you pick the right boiler, give you a fixed price before work starts, and finish most fits in one day.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all">
                Get my free quote <IconArrow />
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 border-2 border-white/70 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#027cc1] transition-colors">
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

      {/* ============ SERVICE BLOCKS (TABS) ============ */}
      <section className="bg-white">
        <div className="py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 mt-10 px-4 flex justify-center">
          <div
            role="tablist"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:flex xl:flex-nowrap gap-1 p-1 bg-white border border-orange-500 rounded-xl shadow-sm w-full xl:w-auto"
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
                className={`px-3 xl:px-4 py-2.5 rounded-lg font-semibold text-sm text-center transition-colors whitespace-nowrap ${
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
          {serviceDetails.map((s, i) => {
            return (
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
                      src={resolveTabImage(s.image)}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      priority={i === 0}
                      className="object-contain"
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
            );
          })}
        </div>
      </section>

      {/* ============ BOILER TYPES ============ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Eyebrow>Boiler types</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#03304b]">Combi, System or Regular</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {boilerData.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-orange-500 rounded-3xl p-8 shadow-xl shadow-sky-900/5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="text-2xl font-extrabold text-[#03304b] mb-2">{item.title}</h3>
                <div className="w-12 h-1.5 rounded-full bg-orange-500 mb-6" />
                <div className="space-y-4">
                  <div className="flex flex-col border-b border-gray-100 pb-3">
                    <span className="font-bold text-[#027cc1] uppercase tracking-wider text-xs mb-1">Best for</span>
                    <span className="text-gray-700 font-medium">{item.bestFor}</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 pb-3">
                    <span className="font-bold text-[#027cc1] uppercase tracking-wider text-xs mb-1">Hot water tank</span>
                    <span className="text-gray-700 font-medium">{item.tank}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#027cc1] uppercase tracking-wider text-xs mb-1">Good points</span>
                    <span className="text-gray-700 font-medium">{item.points}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  <MeetYourEngineer/>

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
                  className={`rounded-2xl overflow-hidden transition-all duration-300 bg-white border-2 ${isOpen ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-gray-100 shadow-sm hover:shadow-md'}`}
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
            <Eyebrow light>Free quote</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">Get Your Free Boiler Quote</h2>
            <p className="text-sky-100 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Fill in a few details and we will get back to you. Fixed price before we start, most fits done in one day, open 7 days a week.
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
              Get My Free Boiler Quote <IconArrow />
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