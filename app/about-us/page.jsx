import React from 'react';
import { ShieldCheck, Clock, Users, Wrench, Zap, Award, MapPin, HandCoins } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section - White/Blue professional theme */}
            <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/boiler.jpg')" }} />
        <div className="absolute inset-0 bg-white/80" /> 
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            About<span className="text-orange-500"> Us</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
           Reliable Heating & Plumbing Experts in Harrow


          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800" alt="Engineer" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-[#027cc1] mb-6">AR Heating & Plumbing Services.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              AR Heating Services are your local and reliable expert plumbers and Heating Engineers in Harrow & Local areas.We specialise in all types of gas services including boiler & heating repair, installation, and servicing. We provide a full range of plumbing and heating services at affordable costs, no job is too big or too small with focus on customer satisfaction. Our engineers are qualified Gas Safe and are always available, all backed up by our 24hr Emergency Call out service. Our aim is to have our emergency plumber or Heating Engineer at your door within 60-90 minutes or at a time that suits you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <ShieldCheck className="text-orange-500" /> 24hr Emergency Call out service
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <Award className="text-orange-500" /> Many satisfied customers in Harrow
              </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
             We believe in giving our customers the best value possible and focus on providing complete dedication with an eye to quality. Our aim is to have our emergency plumber or Heating Engineer at your door within 60-90 minutes or at a time that suits you.
            </p>
            </div>
            {/* Orange button for highlight */}
            <button className="mt-8 bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-md">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
  <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { val: "24/7", label: "Emergency Support", icon: Clock, color: "text-blue-600" },
          { val: "60-90", label: "Mins Response Time", icon: Zap, color: "text-amber-500" },
          { val: "10+", label: "Certified Experts", icon: Users, color: "text-emerald-600" }
        ].map((stat, i) => (
          <div 
            key={i} 
            className="group relative bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Icon container with soft background */}
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            
            <h3 className="text-5xl font-extrabold text-gray-900 mb-2">{stat.val}</h3>
            <p className="text-gray-600 font-medium text-lg uppercase tracking-wider text-sm">{stat.label}</p>
            
            {/* Decorative bottom line */}
            <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-[#027cc1] group-hover:w-full group-hover:left-0 transition-all duration-500 rounded-b-3xl"></div>
          </div>
        ))}
      </div>
    </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why AR Heating & Plumbing?</h2>
          <p>
            Many satisfied customers in Harrow, Watford and London show the dedication of our engineers backed up by competitive rates and services completed on schedule. Whether you are looking to have major works or something small and simple to be repaired or installed, AR Heating Services can help. We believe in giving our customers the best value possible and focus on providing complete dedication with an eye for quality.We are a heating & plumbers company based in Birmingham, West Midlands with extensive experience installing and maintaining heating systems, emergency plumber service, installing bathrooms and kitchens etc...
          </p>
         <div className="grid md:grid-cols-2 gap-8 mt-12">
  {[
    { title: "Local Company", desc: "Serving Harrow and surrounding areas since 2012.", icon: MapPin },
    { title: "Our Services", desc: "Expert boiler installation, servicing, and repairs.", icon: Wrench },
    { title: "Safety First", desc: "Certified Gas Safe Registered engineers.", icon: ShieldCheck },
    { title: "Affordable", desc: "Competitive prices with no hidden costs.", icon: HandCoins }
  ].map((item, i) => (
    <div 
      key={i} 
      className="flex items-start gap-5 p-8 bg-white rounded-3xl border-2 border-orange-100 shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
        <item.icon className="w-8 h-8 text-orange-600" />
      </div>
      
      <div>
        <h4 className="font-bold text-2xl mb-1.5 text-gray-900">{item.title}</h4>
        <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>
    </div>
  );
}