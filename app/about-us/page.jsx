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
              AR Heating Services are your local and reliable expert plumbers and Heating Engineers in Harrow & Local areas. We specialise in all types of gas services including boiler & heating repair, installation, and servicing.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <ShieldCheck className="text-orange-500" /> 24hr Emergency Call out service
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <Award className="text-orange-500" /> Many satisfied customers in Harrow
              </div>
            </div>
            {/* Orange button for highlight */}
            <button className="mt-8 bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-md">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { val: "24", label: "Hours Emergency Service", icon: Clock },
            { val: "60-90", label: "Minutes Quick Service", icon: Zap },
            { val: "5+", label: "Professional Experts", icon: Users }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm text-center border-t-4 border-[#027cc1] hover:border-orange-500 transition">
              <stat.icon className="w-10 h-10 mx-auto text-[#027cc1] mb-4" />
              <h3 className="text-4xl font-bold text-gray-900">{stat.val}</h3>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why AR Heating & Plumbing?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Local Company", desc: "Serving Harrow and surrounding areas since 2012.", icon: MapPin },
              { title: "Our Services", desc: "Expert boiler installation, servicing, and repairs.", icon: Wrench },
              { title: "Safety First", desc: "Certified Gas Safe Registered engineers.", icon: ShieldCheck },
              { title: "Affordable", desc: "Competitive prices with no hidden costs.", icon: HandCoins }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 transition">
                <div className="text-orange-500"><item.icon className="w-8 h-8" /></div>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}