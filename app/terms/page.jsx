import Image from "next/image"; // Sahi import
import Link from "next/link";     // Link import karna zaroori hai
import {
  FileText,
  Wrench,
  Siren,
  Scale,
  PhoneCall,
  Flame,
  Building2,
  MapPin,
  Phone,
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      


      {/* Header / Hero */}
     {/* Hero Section */}
           <section className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
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
                 Terms And  <span className="text-orange-500"> Conditions</span>
               </h1>
               <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">Last updated: 15 July 2026     </p>
             <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">Please read these terms with care before you book any work with us. When you ask us to carry out work, or use this website, you agree to these terms. If you do not agree, please do not book our services.</p>
             </div>
           </section>

      {/* Main content card */}
      <main className="max-w-6xl mx-auto mt-11 px-4 sm:px-6 pb-16 ">
        <div className="bg-white rounded-3xl shadow-sm px-6 sm:px-12 py-10 sm:py-14">

          {/* Section 1 & 2 */}
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="flex items-center gap-2 text-[#027cc1] font-bold text-xl mb-3">
                <FileText className="text-orange-500" size={18} /> 1. Who We Are
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                In these terms, "we", "us", and "our" mean AR Heating & Plumbing
                Services. "You" and "your" mean the person or business who books
                our work or uses our website. When you ask us to carry out work,
                or use this website, you agree to these terms.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm mt-3">
                Address: 24 The Roundway, Watford, WD18 6LB <br />
                Phone: +44 7800 657141 <br />
                Email: info@arheatingservice.co.uk
              </p>
              <p className="text-gray-600 leading-relaxed text-sm mt-3 font-medium">
                We are Gas Safe registered. All gas work is done by Gas
                Safe-registered engineers.
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-[#027cc1] font-bold text-xl mb-3">
                <Wrench className="text-orange-500" size={18} /> 2. The Services We Offer
              </h3>
              <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                <li>Boiler installation, repair and servicing</li>
                <li>Central heating and underfloor heating installation</li>
                <li>General plumbing and repairs</li>
                <li>Power flushing</li>
                <li>Thermostat installation (such as Hive and Nest)</li>
                <li>Gas cooker, dishwasher and washing machine installation</li>
                <li>Megaflo cylinder installation</li>
                <li>Landlord gas safety certificates (CP12)</li>
                <li>24-hour emergency call out</li>
              </ul>
              <p className="text-gray-600 text-sm mt-3">
                We aim to reach emergency jobs within 60 to 90 minutes, or at a
                time you choose. This is a target, not a promise.
              </p>
            </div>
          </div>

          <hr className="my-10 border-gray-100" />

          {/* Section 3 full width */}
          <div>
            <h3 className="text-[#027cc1] font-bold text-xl mb-3">
              3. Quotes and Prices
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We give free, no obligation quotes based on the details you give
              us and what we can see at the time. The final price may change
              if the job turns out to be bigger or harder than first thought,
              hidden faults or damage come to light once work starts, you ask
              us to do extra work, or parts or materials cost more than
              planned. If the price needs to change, we will tell you before
              we carry on. A quote stays valid for 30 days from the date we
              send it, unless we say otherwise.
            </p>
          </div>

          {/* Section 4 & 5 */}
          <div className="grid md:grid-cols-2 gap-10 mt-10">
            <div>
              <h3 className="text-[#027cc1] font-bold text-xl mb-3">
                4. Booking and Access
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                When you book, you agree to give us safe and clear access to
                the work area. You should let us know about any risks, such
                as pets, faults or past repairs. If we cannot get access at
                the booked time, or you are not there, we may charge a
                call-out fee to cover our time and travel.
              </p>
            </div>
            <div>
              <h3 className="text-[#027cc1] font-bold text-xl mb-3">
                5. Payment
              </h3>
              <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                <li>Payment is due once the work is done, unless agreed otherwise in writing</li>
                <li>For larger jobs, we may ask for a deposit or stage payment</li>
                <li>Late payments may incur interest under the Late Payment of Commercial Debts (Interest) Act 1998</li>
                <li>We keep ownership of parts or materials until paid in full</li>
              </ul>
            </div>
          </div>

          <hr className="my-10 border-gray-100" />

          {/* Section 6 & 7 */}
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-[#027cc1] font-bold text-xl mb-3">
                6. Your Right to Cancel
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                If you are a consumer and booked away from our premises (for
                example, at your home or online), you have the right to
                cancel within 14 days under the Consumer Contracts
                Regulations 2013. If you ask us to start work within 14 days
                and then cancel, you may need to pay for the work done up to
                the point of cancellation. Please tell us in writing by
                email or phone if you wish to cancel.
              </p>
            </div>
            <div>
              <h3 className="text-[#027cc1] font-bold text-xl mb-3">
                7. Our Workmanship and Guarantee
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                Where we install new parts, such as a boiler, the maker's
                warranty applies to the part. A guarantee does not cover:
              </p>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                <li>Normal wear and tear</li>
                <li>Damage caused by misuse, neglect or work by others</li>
                <li>Faults in parts or systems we did not supply or fit</li>
                <li>Problems caused by hard water, sludge or lack of servicing</li>
              </ul>
            </div>
          </div>

          {/* Callout box - Emergency & Same-day work */}
          <div className="mt-12 bg-gradient-to-r from-[#027cc1] to-[#025f94] rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="flex items-center gap-3 text-2xl font-bold mb-3">
                <span className="bg-white/15 rounded-lg p-2 flex items-center justify-center">
                  <Siren className="text-orange-500" size={22} />
                </span>
                8. Emergency and Same-Day Work
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                If you ask us to start emergency or same-day work at once,
                you agree that we can begin before the 14-day cancellation
                period ends. You accept you may still owe payment for work
                done if you cancel after we start.</p>
              
                
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-4 self-start">
              <p className="text-xs text-white/70">GAS SAFE REGISTERED</p>
              <p className="font-bold text-lg">Landlord CP12 Certificates</p>
              <p className="text-xs text-white/70 mt-1">Renewed every 12 months</p>
            </div>
          </div>

          {/* Section 9 & 10 */}
          <div className="grid md:grid-cols-2 gap-10 mt-12">
            <div>
              <h3 className="text-[#027cc1] font-bold text-xl mb-3">
                9. Our Liability
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                We are not responsible for:
              </p>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                <li>Loss or damage that was not foreseeable</li>
                <li>Faults in your existing system or parts we did not supply</li>
                <li>Delays caused by things outside our control</li>
                <li>Business losses, if you use our service for business</li>
              </ul>
              <p className="text-gray-600 text-xs mt-3 italic">
                Nothing in these terms limits our liability for death or
                personal injury caused by our negligence, or for fraud.
              </p>
            </div>
            <div>
              <h3 className="text-[#027cc1] font-bold text-xl mb-3">
                10. Data Protection and Privacy
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We handle your personal data in line with UK data protection
                law, including the UK GDPR and the Data Protection Act 2018.
              </p>
              <a
                href="/privacy-policy"
                className="inline-block mt-3 text-orange-500 font-semibold text-sm hover:underline"
              >
                View Privacy Policy →
              </a>
            </div>
          </div>
          <a
                href="tel:+447800657141"
                className="inline-flex items-center gap-2 mt-4 bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-6 py-3 rounded-full text-sm"
              >
                <Phone className="text-white" size={16} />
                Call +44 7800 657141
              </a>

          <hr className="my-10 border-gray-100" />

          {/* Section 11 */}
          <div>
            <h3 className="flex items-center gap-2 text-[#027cc1] font-bold text-xl mb-3">
              <Scale className="text-orange-500" size={18} /> 11. Governing Law
            </h3>
            <p className="text-gray-600 text-sm">
              These terms are governed by the law of England and Wales. Any
              dispute will be dealt with by the courts of England and Wales.
            </p>
          </div>

          {/* Company Information */}
          <div className="mt-14">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Company Information
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              AR Heating & Plumbing Services operates with full transparency
              and adheres to Gas Safe standards.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="border border-gray-100 rounded-xl p-5 flex gap-3 items-start">
                <FileText className="text-orange-500" size={18} />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    AR Heating & Plumbing Services
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Gas Safe Registered</p>
                </div>
              </div>
              <div className="border border-gray-100 rounded-xl p-5 flex gap-3 items-start">
                <MapPin className="text-orange-500" size={18} />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    Registered Office
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    24 The Roundway, Watford, WD18 6LB
                  </p>
                </div>
              </div>
              <div className="bg-[#027cc1] rounded-xl p-5 flex gap-3 items-start text-white">
                <PhoneCall size={18} />
                <div>
                  <p className="font-semibold text-sm">Contact Us</p>
                  <p className="text-xs text-white/80 mt-1">
                    +44 7800 657141 · info@arheatingservice.co.uk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
}