import {
  Shield,
  Clock,
  Repeat,
  FileText,
  Brain,
  Bell,
  PieChart,
  Smartphone,
} from "lucide-react";

const FEATURES = [
  { icon: <Shield size={18} />, title: "Bank-grade security", desc: "256-bit encryption and biometric login on all devices." },
  { icon: <Clock size={18} />, title: "5-minute onboarding", desc: "BVN-powered KYC with no branch visits required." },
  { icon: <Repeat size={18} />, title: "Auto rollover", desc: "Reinvest matured positions automatically at the best rate." },
  { icon: <FileText size={18} />, title: "Instant e-certificates", desc: "Digital proof of investment issued the moment you invest." },
  { icon: <Brain size={18} />, title: "AI recommendations", desc: "Smart portfolio suggestions based on your goals and risk appetite." },
  { icon: <Bell size={18} />, title: "Maturity alerts", desc: "Get notified when investments mature or rates change." },
  { icon: <PieChart size={18} />, title: "Portfolio analytics", desc: "Visual breakdowns of returns, allocation, and growth over time." },
  { icon: <Smartphone size={18} />, title: "Mobile-first app", desc: "Invest, track, and withdraw from iOS and Android anytime." },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#e8f5ed] text-[#1a5c2e] text-xs font-medium px-3 py-1 rounded-full mb-4">
            Platform Features
          </span>
          <h2 className="text-[#0a2e16] text-3xl font-semibold mb-3">
            Built for serious investors
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Every tool you need to invest confidently across all asset classes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-5 rounded-xl border border-gray-100 hover:border-[#3db86a]/40 hover:bg-[#f4faf6] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-[#e8f5ed] flex items-center justify-center text-[#1a5c2e] mb-3 group-hover:bg-[#3db86a] group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="text-[#0a2e16] text-sm font-semibold mb-1.5">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
