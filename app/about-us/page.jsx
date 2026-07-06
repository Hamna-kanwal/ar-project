import React from 'react';
import { ShieldCheck, Clock, Users, Wrench, Zap, Award, MapPin, HandCoins, Building2, CheckCircle2 } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="About Us Background" 
        />
        <div className="absolute inset-0 bg-orange-600/80" /> {/* Changed blue to orange overlay */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-2">About Us</h1>
          <p className="text-lg opacity-90">Reliable Heating & Plumbing Experts in Harrow</p>
        </div>
      </section>

      {/* Existing Content Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-100">
            <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800" alt="Engineer" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              AR Heating & <span className="text-orange-600">Plumbing Services.</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              AR Heating Services are your local and reliable expert plumbers and Heating Engineers in Harrow & Local areas. We specialise in all types of gas services including boiler & heating repair, installation, and servicing.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <ShieldCheck className="text-orange-600" /> 24hr Emergency Call out service
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <Award className="text-orange-600" /> Many satisfied customers in Harrow
              </div>
            </div>
            <button className="mt-8 bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200">Get In Touch</button>
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
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm text-center border-b-4 border-orange-500 hover:shadow-xl transition">
              <stat.icon className="w-12 h-12 mx-auto text-orange-600 mb-4" />
              <h3 className="text-4xl font-bold text-gray-900">{stat.val}</h3>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid with New Icons */}
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
              <div key={i} className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-orange-100 hover:border-orange-300 transition group">
                <div className="bg-orange-100 p-3 rounded-xl h-fit">
                    <item.icon className="text-orange-600 w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 group-hover:text-orange-600 transition">{item.title}</h4>
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