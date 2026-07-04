import React from 'react';
import Link from 'next/link';

export default function BoilerInstallationPage() {
  return (
    <article className="bg-white py-16 px-6 lg:px-32">
      <div className="max-w-4xl mx-auto">
        
        {/* Title Section */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-6 leading-tight">
            Boiler Installation: 
            <span className="text-[#027cc1]"><br/>The Complete Buyer’s Guide</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#027cc1] mx-auto rounded-full"></div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-[450px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="/boiler.jpg" 
            alt="Boiler Installation" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Blog Content */}
        <div className="text-gray-700 leading-relaxed space-y-8 text-lg">
          <p>
            Upgrading your heating system is one of the most significant investments you can make for your home. 
            A modern, A-rated boiler not only keeps your property warm during the coldest months but also 
            drastically reduces your energy consumption and monthly utility bills.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-[#2d1b4e] mb-4">Why Professional Installation Matters</h2>
            <p>
              Boiler installation is a complex task that involves gas and electrical work. It is essential 
              to hire a Gas Safe registered engineer to ensure the job is done safely and legally. 
              Improper installation can lead to dangerous gas leaks, carbon monoxide risks, and 
              voided manufacturer warranties.
            </p>
          </section>

          <section className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#e77600]">
            <h3 className="text-xl font-bold text-[#2d1b4e] mb-3">Key Benefits of a New Boiler:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Efficiency:</strong> Newer models are 90%+ efficient.</li>
              <li><strong>Reliability:</strong> Reduced chance of unexpected breakdowns.</li>
              <li><strong>Smart Control:</strong> Compatibility with apps like Hive or Nest.</li>
              <li><strong>Warranty:</strong> Peace of mind with up to 10 years of coverage.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2d1b4e] mb-4">Steps to a Perfect Installation</h2>
            <p>
              From the initial consultation to the final commissioning of your new system, 
              our experts follow a strict protocol to ensure your home remains comfortable and safe. 
              We provide fixed-price quotes with no hidden costs.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
          <Link href="/" className="text-[#e77600] font-bold hover:underline flex items-center">
            ← Back to Home
          </Link>
          
        </div>
      </div>
    </article>
  );
}