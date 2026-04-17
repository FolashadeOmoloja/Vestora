import { Lightbulb, Bot, TrendingUp } from "lucide-react";
import { DashboardBtn } from "./Button";
import { useRouter } from "next/navigation";

const AICard = () => {
  const router = useRouter();
  return (
    <div className="bg-[#e8f5ed] border border-[#c6e8d0] p-5 rounded-xl shadow-sm w-full basis-[45%] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
          <Bot className="text-[#1a5c2e] text-lg" />
        </div>
        <h3 className="text-lg font-bold text-[#0a2e16]">AI Investment Tips</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        Smart recommendations based on your profile and market conditions.
      </p>

      {/* Investment Profile Section */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/60 rounded-lg py-4 px-3">
          <p className="text-xs text-gray-600 mb-1">Available Budget</p>
          <p className="text-sm font-bold text-[#0a2e16]">₦2,500,000</p>
        </div>
        <div className="bg-white/60 rounded-lg py-4 px-3">
          <p className="text-xs text-gray-600 mb-1">Preferred Tenor</p>
          <p className="text-sm font-semibold text-[#0a2e16]">12-18 months</p>
        </div>
        <div className="bg-white/60 rounded-lg py-4 px-3">
          <p className="text-xs text-gray-600 mb-1">Risk Tolerance</p>
          <span className="inline-block px-2 py-1 bg-[#fffbf0] text-[#5c3a00] text-xs font-medium rounded-full border border-[#f5dfa0]/80">
            Medium
          </span>
        </div>
        <div className="bg-white/60 rounded-lg py-4 px-3">
          <p className="text-xs text-gray-600 mb-1">Target Return</p>
          <p className="text-sm font-semibold text-[#0a2e16]">15% annually</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Recommendation:</span> NGTB05FEB2026
          with a 91-day tenor, offering a 15% interest rate.{" "}
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-auto">
        <DashboardBtn
          cta=" View AI Forecast"
          onClick={() => router.push("/ai-forecast")}
        />
      </div>
    </div>
  );
};

export default AICard;
