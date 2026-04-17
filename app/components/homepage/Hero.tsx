"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Play, ShieldCheck, CheckCircle2, TrendingUp } from "lucide-react";

const ANIMATED_WORDS = ["Treasury Bills", "Mutual Funds", "Stocks", "ETFs", "Bonds"];

const PORTFOLIO_ITEMS = [
  {
    label: "91-Day T-Bill",
    sub: "Matures Dec 15, 2025",
    rate: "+15.2%",
    tag: "T-Bill",
    bg: "bg-[#e8f5ed]",
    tagColor: "text-[#1a5c2e] bg-[#c6e8d0]",
  },
  {
    label: "Stanbic IBTC Equity Fund",
    sub: "Mutual Fund · Growth",
    rate: "+22.4%",
    tag: "Mutual Fund",
    bg: "bg-[#f0f7ff]",
    tagColor: "text-[#1a3a5c] bg-[#c6daf0]",
  },
  {
    label: "Dangote Cement PLC",
    sub: "NSE · DANGCEM",
    rate: "+11.8%",
    tag: "Stock",
    bg: "bg-[#fffbf0]",
    tagColor: "text-[#5c3a00] bg-[#f5dfa0]",
  },
];

export default function Hero({ onGetStarted }: { onGetStarted?: () => void }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % ANIMATED_WORDS.length);
        setFade(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#0a2e16] pt-16 pb-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* Left copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#3db86a]/15 border border-[#3db86a]/30 text-[#3db86a] text-xs px-3 py-1.5 rounded-full mb-6">
            <ShieldCheck size={12} />
            CBN Licensed · Secured by Vestora
          </div>

          <h1 className="text-white text-4xl lg:text-5xl font-semibold leading-tight mb-5">
            Grow your wealth by<br />
            investing in{" "}
            <span
              className="text-[#3db86a] inline-block transition-opacity duration-300"
              style={{ opacity: fade ? 1 : 0 }}
            >
              {ANIMATED_WORDS[wordIdx]}
            </span>
          </h1>

          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
            One platform for all your investment needs — treasury bills, mutual funds,
            stocks, ETFs, and bonds. No paperwork, no stress, returns up to 22%+ p.a.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 bg-[#3db86a] hover:bg-[#35a55e] text-white text-sm font-medium px-6 py-3 rounded-lg transition-all hover:scale-[1.02]"
            >
              Start Investing <ArrowRight size={16} />
            </button>
            <button className="flex items-center gap-2 text-white text-sm border border-white/25 hover:border-white/50 px-6 py-3 rounded-lg transition-colors">
              <Play size={14} /> Watch Demo
            </button>
          </div>

          <div className="flex items-center gap-5 text-xs text-white/45">
            {["CBN Compliant", "Bank-Level Security", "Free to join"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#3db86a]" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right card */}
        <div className="relative">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm ml-auto">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#0a2e16] to-[#1a5c2e] rounded-xl p-5 mb-5">
              <p className="text-white/60 text-xs mb-1">Total Portfolio Value</p>
              <p className="text-white text-3xl font-semibold mb-0.5">₦4,820,000</p>
              <div className="flex items-center gap-1 text-[#3db86a] text-xs">
                <TrendingUp size={11} /> +18.6% overall return
              </div>
            </div>

            {/* Portfolio rows */}
            <div className="space-y-2.5">
              {PORTFOLIO_ITEMS.map((item) => (
                <div key={item.label} className={`flex items-center justify-between p-3 rounded-lg ${item.bg}`}>
                  <div>
                    <p className="text-[#0a2e16] text-sm font-medium">{item.label}</p>
                    <p className="text-[#6b7280] text-xs mt-0.5">{item.sub}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#1a5c2e] text-sm font-semibold">{item.rate}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -top-3 -left-3 bg-[#3db86a] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
            📈 NSE Live Prices
          </div>
          <div className="absolute -bottom-3 -right-3 bg-white text-[#0a2e16] text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-gray-100">
            🔒 Bank-Grade Encrypted
          </div>
        </div>
      </div>
    </section>
  );
}
