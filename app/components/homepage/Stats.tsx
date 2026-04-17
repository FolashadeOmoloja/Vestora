"use client";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, BarChart3, Users, Landmark } from "lucide-react";

const STATS = [
  { icon: <Users size={20} />, value: 15847, suffix: "+", label: "Active Investors", color: "text-[#3db86a]" },
  { icon: <BarChart3 size={20} />, value: 4.2, suffix: "B+", prefix: "₦", label: "Assets Under Management", color: "text-[#3db86a]", decimals: 1 },
  { icon: <TrendingUp size={20} />, value: 22.4, suffix: "%", label: "Highest Fund Return (2024)", color: "text-[#3db86a]", decimals: 1 },
  { icon: <Landmark size={20} />, value: 6, suffix: "", label: "Asset Classes Available", color: "text-[#3db86a]" },
];

const BAR_HEIGHTS = [38, 58, 46, 72, 63, 80, 88, 84, 96];
const BAR_MONTHS = ["Jan", "Mar", "May", "Jul", "Sep"];

function useCountUp(target: number, decimals = 0, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame++;
      setVal(parseFloat(((target * frame) / total).toFixed(decimals)));
      if (frame >= total) { setVal(target); clearInterval(id); }
    }, 2000 / total);
    return () => clearInterval(id);
  }, [active, target, decimals]);
  return val;
}

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const num = useCountUp(stat.value, (stat as any).decimals ?? 0, active);
  return (
    <div className="bg-white/8 border border-white/10 rounded-xl p-6 text-center">
      <div className="w-10 h-10 rounded-lg bg-[#3db86a]/15 flex items-center justify-center text-[#3db86a] mx-auto mb-3">
        {stat.icon}
      </div>
      <div className="text-3xl font-semibold text-white mb-1">
        {(stat as any).prefix ?? ""}{(stat as any).decimals ? num.toFixed((stat as any).decimals) : num.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-white/50 text-xs">{stat.label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#0a2e16] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#3db86a]/15 border border-[#3db86a]/25 text-[#3db86a] text-xs font-medium px-3 py-1 rounded-full mb-4">
            By The Numbers
          </span>
          <h2 className="text-white text-3xl font-semibold mb-3">
            Trusted by thousands of Nigerians
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto">
            Join a growing community of smart investors building wealth across every asset class
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {STATS.map((s) => <StatCard key={s.label} stat={s} active={active} />)}
        </div>

        {/* Mini bar chart */}
        <div className="bg-white/5 border border-white/8 rounded-xl p-6">
          <p className="text-white/40 text-xs text-center mb-4">Platform AUM growth (2024)</p>
          <div className="flex items-end gap-2 h-24 px-4">
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[#3db86a] rounded-t opacity-80"
                style={{ height: `${h}%`, transition: `height 1s ease ${i * 100}ms` }}
              />
            ))}
          </div>
          <div className="flex justify-between px-4 mt-2">
            {BAR_MONTHS.map((m) => (
              <span key={m} className="text-[10px] text-white/30">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
