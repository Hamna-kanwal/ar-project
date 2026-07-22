import Link from 'next/link';

export default function HeatingSection() {
  return (
    <section className="bg-white text-gray-800 font-sans antialiased min-h-screen flex items-center justify-center p-6">
      {/* Main Section Container - Changed to items-start for better alignment with tall video */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Content */}
        <div className="space-y-6">
          {/* Main Heading using #005f93 */}
          <h1 className="text-3xl lg:text-4xl font-bold text-[#005f93] leading-tight">
            Expert Heating & Plumbing Services in Watford, Harrow & Hemel Hempstead
          </h1>

          {/* Descriptive Paragraphs */}
          <p className="text-gray-600 text-base leading-relaxed">
            Heating and plumbing troubles aren&apos;t simple. They require immediate attention, high safety standards, and trusted professionals you can rely on.
          </p>

          <p className="text-gray-600 text-base leading-relaxed">
            At AR Heating Services, we&apos;re Gas Safe registered (No. 574111) and committed to delivering transparent, fixed-price solutions. From brand-new A-rated boiler installations and power flushing to emergency repairs, we shape our support around your home and keep you covered for the long haul.
          </p>

          <p className="text-gray-600 text-base leading-relaxed">
            We&apos;ll understand your requirements, provide honest advice, and take care of the heavy lifting so your home comfort is one less thing to worry about.
          </p>

          {/* Buttons Layout */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Button using #005f93 */}
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 bg-[#005f93] hover:bg-[#004b75] text-white font-medium px-6 py-3 rounded-lg shadow-sm transition-all"
            >
              Why AR-Heating
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>

            {/* Secondary Button using Tailwind orange-500 */}
            <Link 
              href="tel:+447800657141" 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg shadow-sm transition-all text-center"
            >
              Call +44 7800 657141
            </Link>
          </div>
        </div>

        {/* Right Column: Max Width Video Player Card */}
        {/* Removed fixed max-w-lg and added h-full for maximum fill */}
        <div className="flex justify-center lg:justify-end h-full w-full lg:pl-12">
          <div className="w-full h-full bg-[#2b2b2b] rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col">
            <div className="relative flex-grow bg-[#222222] flex items-center justify-center min-h-[300px]">
              
              {/* HTML Video Tag - Updated to fill height */}
              <video 
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster="/heating_installation.jpg"
              >
                {/* Agar video public folder mein hai toh src="/ar-heating.mp4" likh dein */}
                <source src="/ar-heating.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}