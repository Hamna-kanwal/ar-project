"use client";

import React, { useState } from 'react';
import { Mail, Phone, CheckCircle2, Clock3 } from 'lucide-react';
import dynamic from 'next/dynamic';

// SSR ko disable karna sabse important step hai
const MapSection = dynamic(() => import('../Components/MapSection'), {
  ssr: false,
  loading: () => <div className="h-[420px] bg-gray-100 flex items-center justify-center rounded-3xl">Loading Map...</div>
});

const ContactPage = () => {
  const primaryColor = '#027cc1';
  
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ type: 'success', message: 'Thank you! Your query has been submitted.' });
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to submit.');
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/boiler.jpg')" }} />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#027cc1]">Contact <span className="text-orange-500">Us</span></h1>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 md:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left Side: Info Section */}
<div className="space-y-10">
  <div>
    <h2 className="text-4xl font-bold text-[#027cc1] tracking-tight mb-4">Connect With Us</h2>
    <p className="text-gray-600 font-medium">
      Fill out the form and our team will get back to you within 24 business hours.
    </p>
  </div>

  <div className="space-y-8">
    {/* Email */}
    <div className="flex items-center gap-6">
      <div className="p-4 rounded-2xl border border-gray-100 shadow-sm bg-white" style={{ color: '#f97316' }}>
        <Mail size={28} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <p className="text-[11px] font-bold text-gray-400 tracking-[0.2em]">EMAIL</p>
        <p className="font-bold text-gray-800 text-lg">info@arheatingservice.co.uk</p>
      </div>
    </div>

    {/* Mobile */}
    <div className="flex items-center gap-6">
      <div className="p-4 rounded-2xl border border-gray-100 shadow-sm bg-white" style={{ color: '#f97316' }}>
        <Phone size={28} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <p className="text-[11px] font-bold text-gray-400 tracking-[0.2em]">MOBILE</p>
        <p className="font-bold text-gray-800 text-lg">+44 793 050 6303</p>
      </div>
    </div>
  </div>

  {/* Why Choose Us */}
  <div className="pt-8 border-t border-gray-200">
    <h4 className="font-bold text-gray-900 mb-6 tracking-wide text-sm">WHY CHOOSE US?</h4>
    {[
      'Independent professional review',
      'Full market transparency',
      'Dedicated consultant support'
    ].map((text, i) => (
      <div key={i} className="flex items-center gap-3 mb-4 text-gray-700">
        <CheckCircle2 size={22} style={{ color: '#027cc1' }} />
        <span className="font-semibold">{text}</span>
      </div>
    ))}
  </div>
</div>
        {/* Right Side: Form */}
<form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
  
  {/* Status Message */}
  {status.message && (
    <div className={`mb-6 p-4 rounded-xl text-sm font-semibold text-center ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
      {status.message}
    </div>
  )}

  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="text-[10px] font-extrabold text-gray-500 tracking-[0.2em] block mb-2">FIRST NAME *</label>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
    </div>
    <div>
      <label className="text-[10px] font-extrabold text-gray-500 tracking-[0.2em] block mb-2">LAST NAME *</label>
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
    </div>
  </div>

  <div className="mt-6">
    <label className="text-[10px] font-extrabold text-gray-500 tracking-[0.2em] block mb-2">EMAIL ADDRESS *</label>
    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@company.com" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
  </div>

  <div className="mt-6">
    <label className="text-[10px] font-extrabold text-gray-500 tracking-[0.2em] block mb-2">PHONE NUMBER</label>
    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+44 793 050 6303" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
  </div>

  <div className="mt-6">
    <label className="text-[10px] font-extrabold text-gray-500 tracking-[0.2em] block mb-2">MESSAGE *</label>
    <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your current situation..." className="w-full p-4 border border-gray-200 rounded-xl h-32 outline-none focus:ring-2 focus:ring-blue-100"></textarea>
  </div>

  <button 
    type="submit" 
    disabled={loading} 
    className="w-full mt-8 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:bg-[#026aa5]"
    style={{ backgroundColor: '#027cc1' }}
  >
    {loading ? 'Submitting...' : 'Get My Free Audit'}
  </button>
</form>

        </div>
      </section>

     {/* Map + Contact Details Section */}
<section className="py-16 px-4 md:px-12 lg:px-24 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <div className="mb-10">
      <h3 className="text-3xl font-extrabold text-[#027cc1]">Our Offices</h3>
    </div>

    {/* Yahan hum Grid ka use kar rahe hain jo Desktop par side-by-side dikhega */}
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      
      {/* Map Side */}
      <div className="w-full h-[420px] rounded-3xl overflow-hidden shadow-xl">
        <MapSection />
      </div>

      {/* Contact Details Side (Blue Section) */}
      <div className="flex flex-col gap-6">
        {/* Business Hours */}
        <div className="rounded-2xl bg-white border border-gray-100 p-8 shadow-sm">
          <Clock3 size={28} className="text-[#027cc1] mb-4" />
          <p className="text-xs font-bold text-gray-400 tracking-wider mb-2">BUSINESS HOURS</p>
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-gray-800">Monday - Friday</p>
            <p className="font-bold text-[#027cc1]">09:00 - 08:00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-800">Weekend</p>
            <p className="font-bold text-gray-500">Closed</p>
          </div>
        </div>

        {/* Direct Contact (Blue Part) */}
        <div className="rounded-3xl p-8 shadow-xl text-white bg-[#027cc1]">
          <p className="text-sm font-extrabold tracking-wider opacity-80">DIRECT CONTACT</p>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm font-medium opacity-90">Switchboard:</p>
              <p className="text-xl font-bold">+44 793 050 6303</p>
            </div>
            <div>
              <p className="text-sm font-medium opacity-90">Support:</p>
              <p className="text-lg font-bold break-all">sultan@eazy-switch.com</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>
    </div>
  );
};

export default ContactPage;