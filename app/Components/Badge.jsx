import { ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import defaults from "../_defaults/home.json";

// Icons stay in code and are matched to badges by position
const BADGE_ICONS = [Clock, ShieldCheck];

export default function TrustSection({ content }) {
  const c = { ...defaults.trust, ...(content || {}) };
  const badges = Array.isArray(c.badges) && c.badges.length > 0 ? c.badges : defaults.trust.badges;

  return (
    <section className="bg-[#027cc1] py-16 px-6 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 border-[16px] border-emerald-500/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f97316] rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">

        {/* Left Side: Certificate Card */}
        <div className="bg-white text-gray-900 rounded-3xl p-4 shadow-2xl relative border-b-8 border-[#f97316]">
          <div className="flex flex-col items-center text-center space-y-2">
            <Image
              src="/gas-register.webp"
              alt="Gas Safe"
              width={90}
              height={90}
              className="cursor-pointer bg-white p-1 shadow-lg"
            />

            <div className="space-y-1">
              <h3 className="text-2xl font-bold">{c.cardTitle}</h3>
              <p className="text-gray-600 italic">&quot;{c.cardNote}&quot;</p>
            </div>

            <Link
              href="https://www.gassaferegister.co.uk/find-an-engineer/check-a-business/?id=z6Bj0%2b9BiC3wfVafaxt2%2bA%3d%3d&st=registration"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f97316] font-bold hover:underline flex items-center gap-1 pt-2"
            >
              {c.verifyLabel}
            </Link>
          </div>
        </div>

        {/* Right Side: Trust Text */}
        <div>
          <h2 className="text-2xl md:text-2xl whitespace-nowrap font-bold mb-2 leading-tight">
            {c.heading}
          </h2>
          <p className="text-lg text-gray-200 mb-3">{c.paragraph}</p>

          <div className="grid grid-cols-2 gap-4">
            {badges.map((b, i) => {
              const Icon = BADGE_ICONS[i % BADGE_ICONS.length];
              return (
                <div key={i} className="bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-white transition-all">
                  <Icon className="w-8 h-8 mb-3 text-white" />
                  <h4 className="font-bold text-lg">{b.title}</h4>
                  <p className="text-sm text-gray-300">{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}