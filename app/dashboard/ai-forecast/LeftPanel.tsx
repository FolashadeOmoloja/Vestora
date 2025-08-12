import { DollarSign, Calendar, TrendingUp, Target, Bot } from "lucide-react";

const profileItems = [
  {
    icon: DollarSign,
    label: "Available Budget",
    value: "₦2,500,000",
  },
  {
    icon: Calendar,
    label: "Preferred Tenor",
    value: "6-12 months",
  },
  {
    icon: TrendingUp,
    label: "Risk Tolerance",
    value: "Medium",
  },
  {
    icon: Target,
    label: "Target Return",
    value: "10-15% annually",
  },
];

export const UserProfileSummary = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
    <h2 className="text-lg font-semibold text-[#002C6C] mb-4">
      Your Investment Profile
    </h2>

    <div className="space-y-4">
      {profileItems.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-[#FFD100] text-shadow-2xs" />
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-semibold">{value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const insights = [
  "Based on your history, you prefer medium-risk investments",
  "Market conditions favor NTBs with 12-18 month tenors",
  "Your diversification could improve with Growth Bonds",
];

export const AiInsights = () => (
  <div className="bg-gradient-to-br from-[#002C6C] to-blue-600 rounded-2xl shadow-sm p-6 text-white">
    <div className="flex items-center gap-2 mb-4">
      <Bot className="h-5 w-5 text-white" />
      <h3 className="font-semibold">AI Insights</h3>
    </div>
    <div className="space-y-3 text-sm">
      {insights.map((text, idx) => (
        <p key={idx} className="flex items-start gap-2">
          <span className="text-blue-200">•</span>
          {text}
        </p>
      ))}
    </div>
  </div>
);
