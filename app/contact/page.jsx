"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Mail, Phone, CheckCircle2, Clock3 } from 'lucide-react';

// Dynamic import for Map to avoid SSR errors
const Officalmap = dynamic(() => import('../Components/OfficalMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[550px] w-full bg-gray-100 animate-pulse rounded-3xl flex items-center justify-center text-gray-400">
      Loading Map Data...
    </div>
  ),
});

const ContactPage = () => {
  const primaryColor = '#027cc1';

  // State for Form Inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form Submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/boiler.jpg')" }} />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
            If your business wants to understand its energy or water costs more clearly, our experts can provide <span className="italic underline">independent review and guidance.</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left Side: Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-bold text-[#027cc1] tracking-tight mb-4">Connect With Us</h2>
              <p className="text-gray-600 font-medium">Fill out the form and our team will get back to you within 24 business hours.</p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: 'EMAIL', value: 'sultan@eazy-switch.com' },
                { icon: Phone, label: 'MOBILE', value: '+44 793 050 6303' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="p-4 rounded-2xl border border-gray-100 shadow-sm bg-white" style={{ color: '#f97316' }}>
                    <item.icon size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 tracking-[0.2em]">{item.label}</p>
                    <p className="font-bold text-gray-800 text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-6 tracking-wide">WHY CHOOSE US?</h4>
              {['Independent professional review', 'Full market transparency', 'Dedicated consultant support'].map((text, i) => (
                <div key={i} className="flex items-center gap-3 mb-4 text-gray-700">
                  <CheckCircle2 size={22} style={{ color: primaryColor }} />
                  <span className="font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-50/50 border border-gray-100">
            <div className="grid grid-cols-2 gap-6">
              {['firstName', 'lastName'].map((field) => (
                <div key={field}>
                  <label className="text-[10px] font-extrabold text-gray-400 tracking-widest block mb-2">{field.toUpperCase().replace('NAME', ' NAME')} *</label>
                  <input 
                    name={field} 
                    value={formData[field]} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-4 border border-gray-200 rounded-xl focus:border-blue-500 outline-none" 
                    placeholder={field === 'firstName' ? "John" : "Doe"} 
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <label className="text-[10px] font-extrabold text-gray-400 tracking-widest block mb-2">EMAIL ADDRESS *</label>
                <input name="email" value={formData.email} onChange={handleChange} required className="w-full p-4 border border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="email@company.com" />
              </div>
              <div>
                <label className="text-[10px] font-extrabold text-gray-400 tracking-widest block mb-2">MESSAGE</label>
                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl h-32 focus:border-blue-500 outline-none" placeholder="Tell us about your current situation..."></textarea>
              </div>
            </div>

            <button type="submit" className="w-full mt-8 text-white font-bold py-4 rounded-xl shadow-lg transition-all" style={{ backgroundColor: primaryColor }}>
              Get My Free Audit
            </button>
          </form>
        </div>
      </section>

      {/* Offices + Map Section */}
      <section className="py-16 px-4 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h3 className="text-3xl font-extrabold text-[#027cc1]">Our Offices</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            <div className="w-full h-full p-2">
              <Officalmap />
            </div>
            <aside className="flex flex-col gap-4 p-6">
              <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                <div className="text-[#027cc1] mb-4"><Clock3 size={24} /></div>
                <p className="text-xs font-bold text-gray-600 tracking-wider mb-2">BUSINESS HOURS</p>
                <div className="flex justify-between items-center mb-2"><p className="font-bold text-[#027cc1]">Monday - Friday</p><p className="font-bold text-[#027cc1]">09:00 - 18:00</p></div>
                <div className="flex justify-between items-center"><p className="font-bold text-gray-600">Weekend</p><p className="font-bold text-gray-600">Closed</p></div>
              </div>
              <div className="rounded-3xl p-8 shadow-xl flex-grow" style={{ backgroundColor: '#027cc1' }}>
                <p className="text-sm font-extrabold text-white tracking-wider">DIRECT CONTACT</p>
                <h4 className="text-[15px] font-bold text-white mt-4">Switchboard: <span className="block text-lg font-semibold">+44-7800 657 141</span></h4>
                <h4 className="text-[20px] font-bold text-white mt-4">Support: <span className="block text-lg font-semibold">info@arheatingservice.co.uk</span></h4>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;