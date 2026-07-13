// app/about/page.js

const AboutPage = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6">About AR Heating & Plumbing</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We are a local, Gas Safe registered team based in Watford, committed to treating every home with care, honesty, and professional expertise.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Why homes across Watford pick us</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <InfoCard title="Gas Safe Registered" text="Every gas job we do is by the book. Our Gas Safe number is 574111." />
          <InfoCard title="Local to Watford" text="Being based in Watford means a quick reply and a face you can trust." />
          <InfoCard title="Fixed Prices" text="We give you a clear, fixed price before we start. No hidden costs." />
          <InfoCard title="Honest Advice" text="If a repair beats a new fit, we say so. We value long-term trust over a quick sale." />
          <InfoCard title="Tidy Work" text="We treat your home with care, clean up when we finish, and leave the job done right." />
          <InfoCard title="Fast Help" text="Heating faults do not wait, so nor do we. We work to reach you fast." />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-blue-900 py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <FAQItem question="Are you Gas Safe registered?" answer="Yes, our registration number is 574111. You can check us on the Gas Safe Register." />
            <FAQItem question="Where are you based?" answer="We are based at Unit 24, The Roundway, Watford, WD18 6LB." />
            <FAQItem question="Do you give free quotes?" answer="Yes, we provide free, fixed-price quotes with no pressure." />
          </div>
        </div>
      </section>
    </main>
  );
};

// Helper Components
const InfoCard = ({ title, text }) => (
  <div className="p-6 bg-slate-50 rounded-xl">
    <h3 className="text-lg font-bold text-blue-900 mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="border-b border-blue-800 pb-4">
    <h4 className="font-bold text-lg mb-1">{question}</h4>
    <p className="text-blue-100">{answer}</p>
  </div>
);

export default AboutPage;