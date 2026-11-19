"use client";
import React from 'react';
import { ShieldCheck, Clock, Users, Wrench, Zap, Award, MapPin, HandCoins } from 'lucide-react';
import RelatedServices from '../Components/RelatedServices';

// Icons stay in code and are matched to database items by position
const introIcons = [ShieldCheck, Award];
const statIcons = [Clock, Zap, Users];
const statColors = ["text-blue-600", "text-amber-500", "text-emerald-600"];
const featureIcons = [MapPin, Wrench, ShieldCheck, HandCoins];

const defaultHero = {
  image: "/boiler.webp",
  title: "Why Choose",
  titleHighlight: "AR Heating",
  paragraph:
    "We are Gas Safe registered heating and plumbing engineers based in Watford, covering Harrow and the surrounding towns. You get clear advice, fixed prices agreed before work starts, and work done properly the first time.",
};

const defaultIntro = {
  image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
  imageAlt: "AR Heating engineer at work",
  heading: "Heating and Plumbing You Can Rely On",
  paragraph:
    "From a small leak to a full boiler or heating system installation, no job is too big or too small for our team. Our engineers are Gas Safe registered, and our 24hr emergency call-out service means help is never far away.",
  bullets: [
    "24hr Emergency Call-out",
    "Trusted by Customers Across Harrow and Watford",
  ],
  extraParagraph:
    "When something goes wrong, we aim to have an engineer at your door within 60-90 minutes, or at a time that suits you. We keep the process simple: a clear quote, honest advice and a tidy finish.",
  buttonLabel: "Get In Touch",
};

const defaultStats = [
  { val: "24/7", label: "Emergency Support" },
  { val: "60-90", label: "Mins Response Time" },
  { val: "10+", label: "Certified Experts" },
];

const defaultWhy = {
  heading: "Why Customers Choose AR Heating",
  paragraph:
    "Our customers in Watford, Harrow and across London choose us for fair rates, reliable engineers and jobs finished on schedule. Whether you need major works or a quick repair, we give every job the same care and attention to quality. We also take on bathroom and kitchen installations alongside our heating and plumbing work.",
};

const defaultFeatures = [
  { title: "Local Company", desc: "AR Heating & Plumbing Services has been serving customers since 2007. We cover Watford, Harrow, Rickmansworth, Hemel Hempstead, St Albans and nearby areas. Our work and your satisfaction are guaranteed." },
  { title: "Complete Range of Services", desc: "We install, service and repair all major brands of boilers, heating systems and gas appliances. We also handle the plumbing that goes with them, plus Landlord Certificates, Power Flushing and more." },
  { title: "Safety First", desc: "Safety comes before everything else on every job. Our engineers are experienced, highly trained and Gas Safe registered, so you can be confident the work is done correctly and safely." },
  { title: "Fair Prices", desc: "Because we work closely with leading boiler and heating manufacturers, we can offer better trade prices and pass the savings on to you. Call 07800 657141 for a no-obligation quote or friendly advice." },
];

export default function AboutUsClient() {
  const hero = defaultHero;
  const intro = defaultIntro;
  const why = defaultWhy;
  const bullets = intro.bullets;
  const stats = defaultStats;
  const features = defaultFeatures;

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hero.image}')` }} />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            {hero.title}<span className="text-orange-500"> {hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
            {hero.paragraph}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img src={intro.image} alt={intro.imageAlt} />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-[#027cc1] mb-3">{intro.heading}</h2>
            <p className="text-gray-600 leading-relaxed mb-3">{intro.paragraph}</p>
            <div className="space-y-4">
              {bullets.map((text, i) => {
                const Icon = introIcons[i % introIcons.length];
                return (
                  <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <Icon className="text-orange-500" /> {text}
                  </div>
                );
              })}
              <p className="text-gray-600 mb-6 leading-relaxed">{intro.extraParagraph}</p>
            </div>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-md">
              {intro.buttonLabel}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <div
                key={i}
                className="group relative bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                  <Icon className={`w-8 h-8 ${statColors[i % statColors.length]}`} />
                </div>
                <h3 className="text-5xl font-extrabold text-gray-900 mb-2">{stat.val}</h3>
                <p className="text-gray-600 font-medium text-lg uppercase tracking-wider text-sm">{stat.label}</p>
                <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-[#027cc1] group-hover:w-full group-hover:left-0 transition-all duration-500 rounded-b-3xl"></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{why.heading}</h2>
          <p>{why.paragraph}</p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {features.map((item, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <div
                  key={i}
                  className="flex items-start gap-5 p-8 bg-white rounded-3xl border-2 border-orange-100 shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-1.5 text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <RelatedServices className="mt-12 mb-0" />
        </div>
      </section>
    </div>
  );
}