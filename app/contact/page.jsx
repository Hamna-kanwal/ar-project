"use client";
 
import React, { useState } from 'react';

import { Mail, Phone, CheckCircle2, Clock3 } from 'lucide-react';

import MapSection from '../Components/MapSection'; // Adjust relative path if needed
 
const ContactPage = () => {

  const primaryColor = '#027cc1';
 
  // State for Form Inputs

  const [formData, setFormData] = useState({

    firstName: '',

    lastName: '',

    email: '',

    phone: '',

    message: ''

  });
 
  // State for Loading and Alerts

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({ type: '', message: '' });
 
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

  };
 
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setStatus({ type: '', message: '' });
 
    try {

      // Endpoint MUST match app/api/queries/route.js

      const res = await fetch('/api/queries', {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

        },

        body: JSON.stringify(formData),

      });
 
      // Safely check if response is JSON

      const contentType = res.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {

        const rawText = await res.text();

        console.error('Received non-JSON response:', rawText);

        throw new Error('Server returned an invalid HTML or text response.');

      }
 
      const data = await res.json();
 
      if (res.ok && data.success) {

        setStatus({

          type: 'success',

          message: 'Thank you! Your query has been submitted successfully.',

        });

        // Reset form

        setFormData({

          firstName: '',

          lastName: '',

          email: '',

          phone: '',

          message: ''

        });

      } else {

        setStatus({

          type: 'error',

          message: data.message || 'Failed to submit form. Please try again.',

        });

      }

    } catch (err) {

      console.error('Fetch submit error:', err);

      setStatus({

        type: 'error',

        message: err.message || 'Network error. Please try again later.',

      });

    } finally {

      setLoading(false);

    }

  };
 
  return (
<div className="min-h-screen bg-gray-50 font-sans">
 
      {/* Hero Section */}
<section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
<div 

          className="absolute inset-0 bg-cover bg-center" 

          style={{ backgroundImage: "url('/boiler.jpg')" }} 

        />
<div className="absolute inset-0 bg-white/80" />
 
        <div className="relative z-10 text-center px-6 max-w-4xl">
<h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">

            Contact
<span className="text-orange-500"> Us</span>
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
<div className="p-4 rounded-2xl border border-gray-100 shadow-sm bg-white transition-all duration-300 group-hover:shadow-md group-hover:border-orange-100" style={{ color: '#f97316' }}>
<item.icon size={28} strokeWidth={2.5} />
</div>
<div className="flex flex-col gap-0.5">
<p className="text-[11px] font-bold text-gray-400 tracking-[0.2em]">{item.label}</p>
<p className="font-bold text-gray-800 text-lg group-hover:text-[#027cc1] transition-colors">{item.value}</p>
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

            {/* Status Message */}

            {status.message && (
<div

                className={`mb-6 p-4 rounded-xl text-sm font-semibold text-center ${

                  status.type === 'success'

                    ? 'bg-green-50 text-green-700 border border-green-200'

                    : 'bg-red-50 text-red-700 border border-red-200'

                }`}
>

                {status.message}
</div>

            )}
 
            <div className="grid grid-cols-2 gap-6">
<div>
<label className="text-[10px] font-extrabold text-gray-400 tracking-widest block mb-2">FIRST NAME *</label>
<input

                  type="text"

                  name="firstName"

                  value={formData.firstName}

                  onChange={handleChange}

                  required

                  placeholder="John"

                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-800"

                />
</div>
 
              <div>
<label className="text-[10px] font-extrabold text-gray-400 tracking-widest block mb-2">LAST NAME *</label>
<input

                  type="text"

                  name="lastName"

                  value={formData.lastName}

                  onChange={handleChange}

                  required

                  placeholder="Doe"

                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-800"

                />
</div>
</div>
<div className="mt-6 space-y-6">
<div>
<label className="text-[10px] font-extrabold text-gray-400 tracking-widest block mb-2">EMAIL ADDRESS *</label>
<input

                  type="email"

                  name="email"

                  value={formData.email}

                  onChange={handleChange}

                  required

                  placeholder="email@company.com"

                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-800"

                />
</div>
 
              <div>
<label className="text-[10px] font-extrabold text-gray-400 tracking-widest block mb-2">PHONE NUMBER</label>
<input

                  type="tel"

                  name="phone"

                  value={formData.phone}

                  onChange={handleChange}

                  placeholder="+44 793 050 6303"

                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-800"

                />
</div>
<div>
<label className="text-[10px] font-extrabold text-gray-400 tracking-widest block mb-2">MESSAGE *</label>
<textarea

                  name="message"

                  value={formData.message}

                  onChange={handleChange}

                  required

                  placeholder="Tell us about your current situation..."

                  className="w-full p-4 border border-gray-200 rounded-xl h-32 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-800"
></textarea>
</div>
</div>
 
            <button 

              type="submit"

              disabled={loading}

              className="w-full mt-8 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"

              style={{ backgroundColor: primaryColor }}
>

              {loading ? 'Submitting Inquiry...' : 'Get My Free Audit'}
</button>
</form>
</div>
</section>
 
      {/* Offices + Map Section */}
<section className="py-16 px-4 md:px-12 lg:px-24 bg-gray-50">
<div className="max-w-6xl mx-auto">
<div className="mb-10">
<h3 className="text-3xl font-extrabold text-[#027cc1]">Our Offices</h3>
<p className="text-gray-600 mt-2">Prefer a face-to-face chat? Visit our headquarters in the heart of the business district.</p>
</div>
 
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
<div className="w-full h-full p-2">
<MapSection />
</div>
 
            <aside className="flex flex-col gap-4 p-6">
<div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
<div className="p-3 rounded-xl text-[#027cc1] w-fit mb-4">
<Clock3 size={24} />
</div>
<p className="text-xs font-bold text-gray-600 tracking-wider mb-2">BUSINESS HOURS</p>
<div className="flex justify-between items-center mb-2">
<p className="font-bold text-[#027cc1]">Monday - Friday</p>
<p className="font-bold text-[#027cc1]">09:00 - 18:00</p>
</div>
<div className="flex justify-between items-center">
<p className="font-bold text-gray-600">Weekend</p>
<p className="font-bold text-gray-600">Closed</p>
</div>
</div>
 
              <div className="rounded-3xl p-8 shadow-xl flex-grow" style={{ backgroundColor: '#027cc1' }}>
<p className="text-sm font-extrabold text-orange-400 tracking-wider">DIRECT CONTACT</p>
<h4 className="text-[15px] font-bold text-white mt-4">Switchboard: <span className="block text-lg font-semibold">+44 793 050 6303</span></h4>
<h4 className="text-[20px] font-bold text-white mt-4">Support: <span className="block text-lg font-semibold">sultan@eazy-switch.com</span></h4>
</div>
</aside>
</div>
</div>
</section>
 
    </div>

  );

};
 
export default ContactPage;
 