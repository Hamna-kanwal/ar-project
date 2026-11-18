import Link from "next/link";
import defaults from "../_defaults/home.json";

export default function HeatingSection({ content }) {
  const c = { ...defaults.video, ...(content || {}) };
  const paragraphs = Array.isArray(c.paragraphs) && c.paragraphs.length > 0 ? c.paragraphs : defaults.video.paragraphs;
  const primary = { ...defaults.video.primaryButton, ...(c.primaryButton || {}) };
  const call = { ...defaults.video.callButton, ...(c.callButton || {}) };

  return (
    <section className="bg-white text-gray-800 font-sans antialiased min-h-screen flex items-center justify-center p-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left Column: Content */}
        <div className="space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#005f93] leading-tight">
            {c.heading}
          </h2>

          {paragraphs.map((p, i) => (
            <p key={i} className="text-gray-600 text-base leading-relaxed">{p}</p>
          ))}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={primary.href}
              className="inline-flex items-center gap-2 bg-[#005f93] hover:bg-[#004b75] text-white font-medium px-6 py-3 rounded-lg shadow-sm transition-all"
            >
              {primary.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>

            <Link
              href={call.href}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg shadow-sm transition-all text-center"
            >
              {call.label}
            </Link>
          </div>
        </div>

        {/* Right Column: Video (stays in code) */}
        <div className="flex justify-center lg:justify-end h-full w-full lg:pl-12">
          <div className="w-full h-full bg-[#2b2b2b] rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col">
            <div className="relative flex-grow bg-[#222222] flex items-center justify-center min-h-[300px]">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster="/heating_installation.webp"
              >
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