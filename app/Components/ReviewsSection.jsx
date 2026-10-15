"use client";

import { useEffect, useState } from "react";

const FALLBACK_REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    text:
      "Very professional team, arrived on time, and explained everything clearly. The boiler install was smooth and tidy.",
    photo: "",
    relativeTime: "2 weeks ago",
  },
  {
    name: "James T.",
    rating: 5,
    text:
      "Quick response and excellent workmanship. They sorted out our heating issue with no fuss and kept everything spotless.",
    photo: "",
    relativeTime: "1 month ago",
  },
  {
    name: "Aisha R.",
    rating: 5,
    text:
      "Friendly, efficient, and very knowledgeable. We had a great experience from the first call to the final job completion.",
    photo: "",
    relativeTime: "Recently",
  },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getReviews() {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        const data = await res.json();

        if (res.ok && Array.isArray(data?.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        } else {
          setReviews(FALLBACK_REVIEWS);
        }
      } catch (err) {
        console.error("Reviews load karne mein masla aaya:", err);
        setReviews(FALLBACK_REVIEWS);
      } finally {
        setLoading(false);
      }
    }

    getReviews();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-orange-500 font-semibold tracking-wider uppercase text-sm">
            Reviews
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#03304b]">
            What Our Customers Say
          </h2>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-3xl p-8 h-64 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="relative bg-white border border-orange-500 rounded-3xl p-8 shadow-xl shadow-sky-900/5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <span className="absolute -top-5 left-8 w-8 h-8 rounded-xl bg-orange-500 text-white text-3xl font-serif flex items-center justify-center leading-none pt-2">
                  &ldquo;
                </span>

                <div
                  className="text-orange-400 text-xl tracking-widest mb-4 mt-2"
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 flex-1 line-clamp-4">
                  {r.text}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  {r.photo ? (
                    <img
                      src={r.photo}
                      alt={r.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-11 h-11 rounded-full bg-gradient-to-br from-[#027cc1] to-sky-400 text-white font-bold flex items-center justify-center">
                      {r.name.charAt(0)}
                    </span>
                  )}
                  <p className="font-bold text-gray-900 leading-tight">
                    {r.name}
                    <span className="block text-sm text-gray-500 font-medium">
                      {r.relativeTime}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://share.google/AmfMBlSbwt43yTrlF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#027cc1] font-bold hover:text-orange-500 transition-colors"
          >
            Read all our Google reviews →
          </a>
        </div>
      </div>
    </section>
  );
}