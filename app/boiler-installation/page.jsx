import React from 'react';
import Link from 'next/link';

export default function BoilerInstallation() {
  return (
    <div className="bg-white">
      {/* 1. Header Section */}
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold text-[#027cc1]">Boiler Installation</h1>
        <p className="max-w-3xl mx-auto mt-6 text-gray-600">
          AR Heating Service provide excellent services for installation of new boilers...
        </p>
      </section>

      {/* 2. Content Sections (Alternating) */}
      <section className="py-10 max-w-7xl mx-auto px-6">
        {/* Boiler Replacement Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Boiler Replacement</h2>
            <p className="text-gray-600 mb-4">With regular servicing, some old boiler models...</p>
            {/* List */}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg relative">
             {/* Image yahan add karein */}
          </div>
        </div>

        {/* New Boiler Options Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="h-64 bg-gray-200 rounded-lg order-2 md:order-1"></div>
           <div className="order-1 md:order-2">
             <h2 className="text-3xl font-bold mb-4">New boiler installation options</h2>
             <p className="text-gray-600">Getting a new boiler is a decision that will affect...</p>
           </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="bg-black text-white p-4 rounded-lg">
             <p className="flex justify-between">Can I install a boiler myself? <span>+</span></p>
          </div>
          {/* Baaki FAQs yahan add karein */}
        </div>
      </section>
      
      {/* 4. CTA Banner */}
      <section className="bg-[#027cc1] py-12 text-white text-center">
        <h2 className="text-3xl font-bold">Free no obligation quotes with best possible advice</h2>
        <button className="bg-orange-500 px-8 py-3 mt-6 rounded font-bold">Call Us</button>
      </section>
    </div>
  );
}