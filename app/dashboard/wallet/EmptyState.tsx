import { DashboardBtn } from "@/app/components/ui/Button";
import { walletData } from "@/app/utils/dummy";
import { formatCurrency } from "@/app/utils/Functions";
import { CreditCard, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const EmptyState = () => (
  <div className="text-center py-16 flex flex-col items-center">
    <div className="w-24 h-24 mx-auto mb-6 bg-[#0a2e16] rounded-full flex items-center justify-center">
      <CreditCard className="w-12 h-12 text-[#3db86a] " />
    </div>
    <h3 className="text-xl font-semibold text-[#0a2e16] mb-2">
      You haven't added funds yet
    </h3>
    <p className="text-gray-600 mb-6">
      Start by funding your wallet to begin investing and managing your
      finances.
    </p>
    <DashboardBtn cta="Add Your First Funds" className="max-w-sm" />
  </div>
);

export default EmptyState;

export const DetailCards = ({
  Icon,
  title,
  value,
  walletBalance,
  text,
  showBalance,
  setShowBalance,
}: {
  Icon: React.ElementType;
  title: string;
  value: number;
  walletBalance?: boolean;
  showBalance: boolean;
  setShowBalance: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between space-x-4">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-[#E5ECF6]/40 rounded-md">
            <Icon className="text-[#3db86a] text-xl" />
          </div>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
        <div className="text-xl font-bold text-[#0a2e16] ">
          {showBalance ? formatCurrency(value) : "****"}
        </div>
        <p className="text-xs mb-2 text-gray-500">{text}</p>
      </div>
      {walletBalance && (
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {showBalance ? (
            <Eye className="w-5 h-5 text-gray-600" />
          ) : (
            <EyeOff className="w-5 h-5 text-gray-600" />
          )}
        </button>
      )}
    </div>
  );
};

export const TopUpSelectionCards = ({
  onClick,
  topupTypeStr,
  topupType,
  heading,
  text,
}: {
  onClick: () => void;
  topupTypeStr: string;
  topupType: string;
  heading: string;
  text: string;
}) => (
  <div
    onClick={onClick}
    className={`p-3 border rounded-lg cursor-pointer transition-all ${
      topupType === topupTypeStr
        ? "border-[#0a2e16] border-2"
        : "border-gray-200 hover:border-gray-300"
    }`}
  >
    <div className="flex items-start space-x-3">
      <div
        className={`w-4 h-4 rounded-full border-2 mt-1 ${
          topupType === topupTypeStr
            ? "border-[#0a2e16] bg-[#0a2e16]"
            : "border-gray-300"
        }`}
      >
        {topupType === topupTypeStr && (
          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
        )}
      </div>
      <div>
        <h3 className="font-medium text-gray-900 text-sm">{heading}</h3>
        <p className="text-xs text-gray-600">{text}</p>
      </div>
    </div>
  </div>
);
