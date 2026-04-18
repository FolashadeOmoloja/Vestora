"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I moved from keeping money in a savings account to diversifying across T-Bills and a mutual fund. My returns tripled in one year.",
    name: "Adebayo Ogundimu",
    role: "Software Engineer, Lagos",
    initials: "AO",
  },
  {
    quote:
      "The stock investing feature is exactly what I needed. I can now own NSE stocks directly without going through a stockbroker.",
    name: "Ngozi Eze",
    role: "Business Owner, Abuja",
    initials: "NE",
  },
  {
    quote:
      "Auto-rollover on my T-Bills means I never miss a reinvestment window. The platform basically manages itself.",
    name: "Chukwuemeka Obi",
    role: "Finance Analyst, Port Harcourt",
    initials: "CO",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const current = TESTIMONIALS[idx];

  return (
    <section className="bg-[#1a5c2e] py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-[#f0c040] fill-[#f0c040]" />
          ))}
        </div>

        <blockquote className="text-white text-xl leading-relaxed mb-8 min-h-[80px]">
          "{current.quote}"
        </blockquote>

        {/* Avatar */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#3db86a] flex items-center justify-center text-white text-sm font-semibold">
            {current.initials}
          </div>
          <div className="text-left">
            <p className="text-white text-sm font-medium">{current.name}</p>
            <p className="text-white/50 text-xs">{current.role}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() =>
              setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
            }
            className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-white/60 hover:border-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-[#3db86a]" : "bg-white/25"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIdx((idx + 1) % TESTIMONIALS.length)}
            className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-white/60 hover:border-white/60 hover:text-white transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
