import { TrendingUp, BarChart3, Landmark, Globe, LineChart, Shield } from "lucide-react";

const PRODUCTS = [
  {
    icon: <Landmark size={22} />,
    title: "Treasury Bills",
    desc: "Short-term government-backed securities with fixed returns. 91, 182, and 364-day tenors. Up to 18% p.a.",
    returns: "Up to 18% p.a.",
    risk: "Very Low",
    riskColor: "text-[#1a5c2e] bg-[#c6e8d0]",
    min: "₦10,000",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Mutual Funds",
    desc: "Professionally managed diversified funds — equity, money market, and balanced. Pool your money with other investors.",
    returns: "Up to 22% p.a.",
    risk: "Moderate",
    riskColor: "text-[#5c3a00] bg-[#f5dfa0]",
    min: "₦5,000",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Stocks",
    desc: "Buy shares of top NSE-listed companies like Dangote, MTN, Zenith Bank, and more. Build long-term wealth.",
    returns: "Variable",
    risk: "Medium–High",
    riskColor: "text-[#7a1c1c] bg-[#f7c1c1]",
    min: "₦1,000",
  },
  {
    icon: <Globe size={22} />,
    title: "ETFs",
    desc: "Exchange-Traded Funds tracking indices like the NSE 30. Low cost, diversified, and liquid.",
    returns: "Market-linked",
    risk: "Medium",
    riskColor: "text-[#1a3a5c] bg-[#c6daf0]",
    min: "₦2,500",
  },
  {
    icon: <LineChart size={22} />,
    title: "Bonds",
    desc: "Federal and corporate bonds with semi-annual coupon payments. Steady income with capital preservation.",
    returns: "Up to 16% p.a.",
    risk: "Low",
    riskColor: "text-[#1a5c2e] bg-[#d4eedd]",
    min: "₦50,000",
  },
  {
    icon: <Shield size={22} />,
    title: "Fixed Deposits",
    desc: "Lock-in your funds for a fixed period with guaranteed returns. Ideal for capital preservation goals.",
    returns: "Up to 14% p.a.",
    risk: "Very Low",
    riskColor: "text-[#1a5c2e] bg-[#c6e8d0]",
    min: "₦20,000",
  },
];

export default function Products() {
  return (
    <section id="products" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#e8f5ed] text-[#1a5c2e] text-xs font-medium px-3 py-1 rounded-full mb-4">
            Investment Products
          </span>
          <h2 className="text-[#0a2e16] text-3xl font-semibold mb-3">
            One platform, every asset class
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Diversify your portfolio across multiple investment types — all managed from a single dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p) => (
            <div
              key={p.title}
              className="group border border-gray-100 rounded-xl p-6 hover:border-[#3db86a]/40 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#e8f5ed] flex items-center justify-center text-[#1a5c2e] mb-4 group-hover:bg-[#3db86a] group-hover:text-white transition-colors">
                {p.icon}
              </div>
              <h3 className="text-[#0a2e16] text-base font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400">Returns · </span>
                  <span className="text-[#1a5c2e] font-medium">{p.returns}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full font-medium ${p.riskColor}`}>
                  {p.risk} risk
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                Minimum: <span className="text-[#0a2e16] font-medium">{p.min}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
