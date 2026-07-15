// app/privacy-policy/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  PhoneCall,
  MapPin,
  Lock,
  Cookie,
  UserCheck,
  Scale,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
   <Image
  src="/conditions.jpg"
  alt="Heating installation background"
  fill
  priority
  sizes="100vw"
  unoptimized // <-- Yeh add kar dein
  className="object-cover"
/>
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            Privacy <span className="text-orange-500">Policy</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
            Last updated: 15 July 2026
          </p>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">
            This policy explains how AR Heating & Plumbing Services collects, uses, and protects your personal data. When you use our website or book our work, you agree to how we handle your data as set out here.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto  mt-20 px-4 sm:px-6 pb-16 relative ">
        <div className="bg-white rounded-3xl shadow-sm px-6 sm:px-12 py-10 sm:py-14">
          
          {/* Who we are */}
          <section className="mb-10">
            <h3 className="flex items-center gap-2 text-[#027cc1] font-bold text-xl mb-4">
              <UserCheck className="text-orange-500" size={22} /> Who we are
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              For data protection law, we are the data controller. In this policy, "we", "us" and "our" mean AR Heating & Plumbing Services.
            </p>
            <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p><strong>Address:</strong> 24 The Roundway, Watford, WD18 6LB</p>
              <p><strong>Phone:</strong> +44 7800 657141</p>
              <p><strong>Email:</strong> info@arheatingservice.co.uk</p>
            </div>
          </section>

          <hr className="my-8 border-gray-100" />

          {/* Data Sections */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-[#027cc1] mb-2">The data we collect</h3>
              <p className="text-sm text-gray-600 leading-relaxed">We may collect your name, address, phone number, email, details of work requested, records of jobs/quotes, and messages from you. We also collect basic technical data when you visit our website. Note: We do not collect card details; these are handled by a secure provider.</p>
            </div>

            <div>
              <h3 className="font-bold text-[#027cc1] mb-2">How we collect your data</h3>
              <p className="text-sm text-gray-600 leading-relaxed">We collect data when you fill in forms on our website, call/message us, book a job, interact on social media, or browse our site through cookies.</p>
            </div>

            <div>
              <h3 className="font-bold text-[#027cc1] mb-2">Why we use your data</h3>
              <p className="text-sm text-gray-600 leading-relaxed">We use your data to manage contracts, fulfil legal duties (like gas safety records), take payments, handle complaints, send service reminders, and improve our services. Where we rely on consent, you can withdraw it at any time.</p>
            </div>

            <div>
              <h3 className="font-bold text-[#027cc1] mb-2">Marketing</h3>
              <p className="text-sm text-gray-600 leading-relaxed">We only send marketing messages if you have agreed or where the law allows. You can opt out at any time by replying to the message or contacting us. This does not affect service-related messages.</p>
            </div>

            <div>
              <h3 className="font-bold text-[#027cc1] mb-2">Who we share your data with</h3>
              <p className="text-sm text-gray-600 leading-relaxed">We do not sell your data. We may share it with payment providers, parts suppliers, our staff/engineers, software/hosting providers, public bodies (like Gas Safe), or legal/accounting advisers where necessary.</p>
            </div>

            <div>
              <h3 className="font-bold text-[#027cc1] mb-2">Keeping your data</h3>
              <p className="text-sm text-gray-600 leading-relaxed">We keep data only as long as needed to support your job, meet tax/legal requirements, and handle claims. Gas safety records are kept for several years as required by law.</p>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Cookies & Security */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="flex items-center gap-2 font-bold text-[#027cc1] mb-3">
                <Cookie className="text-orange-500" size={18} /> Cookies
              </h3>
              <p className="text-sm text-gray-600">Our website uses cookies (small files) to function correctly and for analytics like Google Tag Manager. You can control these through your browser settings.</p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-bold text-[#027cc1] mb-3">
                <Lock className="text-orange-500" size={18} /> Security
              </h3>
              <p className="text-sm text-gray-600">We use industry-standard steps to protect your data from loss or unauthorized access, though no system is 100% secure.</p>
            </div>
          </div>

          {/* Rights & Complaints */}
          <div className="mt-8 bg-blue-50 p-6 rounded-2xl">
            <h3 className="font-bold text-[#027cc1] mb-2">Your Rights & Complaints</h3>
            <p className="text-sm text-gray-600 mb-3">You have the right to access, correct, delete, or limit the use of your data. Please contact us to exercise these rights. If you are unhappy with our handling of your data, you can contact us first, or report to the ICO (ico.org.uk | 0303 123 1113).</p>
          </div>

          <div className="mt-10">
            <h3 className="font-bold text-[#027cc1] mb-2">Changes to this policy</h3>
            <p className="text-sm text-gray-600">We may update this policy periodically. The version currently on this page is the one that applies to your use of our services.</p>
          </div>
        </div>
      </main>
    </div>
  );
}