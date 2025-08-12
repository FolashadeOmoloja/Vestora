import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react";
export const NTBData = [
  {
    id: "NGTB05FEB2026",
    description: "Federal Government of Nigeria",
    code: "NGTB05022026",
    tenor: "197 days",
    settlement: "27 Jul 2025",
    maturity: "05 Feb 2026",
    rate: "15%",
    risk: "Low",
    offerSize: "₦21.43M",
    minInvestment: "500000",
    available: "5 days left",
    availablePercent: 15,
    status: "Active",
    deadline: "Jul 26, 2025",
  },
  {
    id: "NGTB05FEB2026",
    description: "Federal Government of Nigeria",
    code: "NGTB07034026",
    tenor: "360 days",
    settlement: "2 Aug 2025",
    maturity: "05 Feb 2026",
    rate: "15%",
    risk: "Low",
    offerSize: "₦21.43M",
    minInvestment: "500000",
    available: "10 days left",
    availablePercent: 15,
    status: "Active",
    deadline: "Jul 29, 2025",
  },
  {
    id: "NGTB20Nov2025",
    description: "Federal Government of Nigeria",
    code: "NGTB20Nov2025",
    tenor: "125 days",
    settlement: "18 Jul 2025",
    maturity: "20 Nov 2025",
    rate: "15.5%",
    risk: "Low",
    offerSize: "₦100.00M",
    minInvestment: "500000",
    available: "Expired",
    availablePercent: 0,
    status: "Expired",
    deadline: "Jul 16, 2025",
  },
  {
    id: "NGTB06Nov2025",
    description: "Federal Government of Nigeria",
    code: "NGTB06Nov2025",
    tenor: "111 days",
    settlement: "18 Jul 2025",
    maturity: "06 Nov 2025",
    rate: "15.5%",
    risk: "Low",
    offerSize: "₦100.00M",
    minInvestment: "500000",
    available: "Expired",
    availablePercent: 0,
    status: "Expired",
    deadline: "Jul 16, 2025",
  },
  {
    id: "NGTB15Dec2025",
    description: "Federal Government of Nigeria",
    code: "NGTB15Dec2025",
    tenor: "91 days",
    settlement: "15 Aug 2025",
    maturity: "15 Dec 2025",
    rate: "16.3%",
    risk: "Low",
    offerSize: "₦50.00M",
    minInvestment: "100000",
    available: "12 days left",
    availablePercent: 65,
    status: "Active",
    deadline: "Aug 9, 2025",
  },
  {
    id: "NGTB30Jan2026",
    description: "Federal Government of Nigeria",
    code: "NGTB30Jan2026",
    tenor: "182 days",
    settlement: "28 Jul 2025",
    maturity: "30 Jan 2026",
    rate: "17.1%",
    risk: "Low",
    offerSize: "₦75.00M",
    minInvestment: "100000",
    available: "Booked",
    availablePercent: 100,
    status: "Booked",
    deadline: "Jul 25, 2025",
  },
];

export const walletData = {
  totalBalance: 2500000,
  pendingTransfers: 50000,
  withdrawableBalance: 2450000,
  dailyLimit: 1000000,
  monthlyLimit: 5000000,
  usedDaily: 200000,
  usedMonthly: 800000,
};

export const recentTransactions = [
  {
    id: 1,
    type: "Deposit",
    amount: 500000,
    status: "Completed",
    date: "2025-07-23",
    time: "14:30",
    reference: "DEP-2025-001",
    icon: ArrowDownLeft,
    color: "text-green-700",
  },
  {
    id: 2,
    type: "NTB Investment",
    amount: -300000,
    status: "Completed",
    date: "2025-07-22",
    time: "09:15",
    reference: "INV-2025-045",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "Withdrawal",
    amount: -150000,
    status: "Processing",
    date: "2025-07-21",
    time: "16:45",
    reference: "WDR-2025-012",
    icon: ArrowUpRight,
    color: "text-red-600",
  },
  {
    id: 4,
    type: "Deposit",
    amount: 1000000,
    status: "Completed",
    date: "2025-07-20",
    time: "11:20",
    reference: "DEP-2025-002",
    icon: ArrowDownLeft,
    color: "text-green-700",
  },
  {
    id: 5,
    type: "NTB Investment",
    amount: -750000,
    status: "Completed",
    date: "2025-07-19",
    time: "13:30",
    reference: "INV-2025-044",
    icon: TrendingUp,
    color: "text-blue-600",
  },
];
export const transactions = [
  {
    id: 1,
    type: "Deposit",
    amount: 500000,
    status: "Completed",
    date: "2025-07-23",
    time: "14:30",
    reference: "DEP-2025-001",
    icon: ArrowDownLeft,
    color: "text-green-700",
  },
  {
    id: 2,
    type: "NTB Investment",
    amount: -300000,
    status: "Completed",
    date: "2025-07-22",
    time: "09:15",
    reference: "INV-2025-045",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "Withdrawal",
    amount: -150000,
    status: "Processing",
    date: "2025-07-21",
    time: "16:45",
    reference: "WDR-2025-012",
    icon: ArrowUpRight,
    color: "text-red-600",
  },
  {
    id: 4,
    type: "Deposit",
    amount: 1000000,
    status: "Completed",
    date: "2025-07-20",
    time: "11:20",
    reference: "DEP-2025-002",
    icon: ArrowDownLeft,
    color: "text-green-700",
  },
  {
    id: 5,
    type: "NTB Investment",
    amount: -750000,
    status: "Completed",
    date: "2025-07-19",
    time: "13:30",
    reference: "INV-2025-044",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    id: 1,
    type: "Deposit",
    amount: 500000,
    status: "Completed",
    date: "2025-07-23",
    time: "14:30",
    reference: "DEP-2025-001",
    icon: ArrowDownLeft,
    color: "text-green-700",
  },
  {
    id: 2,
    type: "NTB Investment",
    amount: -300000,
    status: "Completed",
    date: "2025-07-22",
    time: "09:15",
    reference: "INV-2025-045",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "Withdrawal",
    amount: -150000,
    status: "Processing",
    date: "2025-07-21",
    time: "16:45",
    reference: "WDR-2025-012",
    icon: ArrowUpRight,
    color: "text-red-600",
  },
  {
    id: 4,
    type: "Deposit",
    amount: 1000000,
    status: "Completed",
    date: "2025-07-20",
    time: "11:20",
    reference: "DEP-2025-002",
    icon: ArrowDownLeft,
    color: "text-green-700",
  },
  {
    id: 5,
    type: "NTB Investment",
    amount: -750000,
    status: "Completed",
    date: "2025-07-19",
    time: "13:30",
    reference: "INV-2025-044",
    icon: TrendingUp,
    color: "text-blue-600",
  },
];
export const linkedAccounts = [
  {
    id: 1,
    number: "0123456789",
    name: "Primary Savings",
    balance: 5000000,
    isPrimary: true,
    type: "Savings",
  },
  {
    id: 2,
    number: "0987654321",
    name: "Current Account",
    balance: 2500000,
    isPrimary: false,
    type: "Current",
  },
];

export type linkedType = {
  id: number;
  number: string;
  name: string;
  balance: number;
  isPrimary: boolean;
  type: string;
};

export type AccountDetails = {
  accountNumber: string;
  accountName?: string;
  accountType?: string;
  balance?: number;
  isEligible: boolean;
  reason?: string;
};

export type SampleDetails = {
  [key: string]: {
    accountNumber: string;
    accountName: string;
    accountType: string;
    balance: number;
    isEligible: boolean;
    reason?: string;
  };
};

export const recommendations = [
  {
    code: "NGTB05JUL2026",
    description: "Federal Government of Nigeria",
    rating: "AA+",
    rate: "15%",
    tenor: "12 months",
    minInvestment: "500,000",
    settlement: "2 Aug 2025",
    maturity: "27 July 2026",
    risk: "Low",
    matchScore: 95,
    reasons: [
      "Matches your risk tolerance",
      "Optimal tenor for your timeline",
      "High rate potential",
    ],
  },
  {
    code: "NGTB30JAN2026",
    description: "Federal Government of Nigeria",
    rating: "AAA",
    rate: "12.1%",
    tenor: "6 months",
    minInvestment: "100,000",
    settlement: "28 Jul 2025",
    maturity: "26 Jan 2026",
    risk: "Low",
    matchScore: 88,
    reasons: ["Low risk profile", "Short tenure", "High rate potential"],
  },
  {
    code: "NGTB05FEB2026",
    description: "Federal Government of Nigeria",
    rating: "AA",
    rate: "12%",
    tenor: "6 months+",
    minInvestment: "500,000",
    settlement: "27 Jul 2025",
    maturity: "09 Feb 2026",
    risk: "Low",
    matchScore: 82,
    reasons: ["High yield potential", "Premium features", "Tax benefits"],
  },
];

export const chatMessages = [
  {
    type: "ai",
    message:
      "Hi! I'm your AI investment advisor. Based on your profile, I've analyzed the best NTB options for you. How can I help you today?",
  },
  {
    type: "user",
    message: "What makes the Growth Bond Series A the best match for me?",
  },
  {
    type: "ai",
    message:
      "Great question! The Growth Bond Series A scores 95% match because:\n\n• Your historical preference for medium-risk investments\n• The 18-month tenor aligns with your typical investment horizon\n• 12.5% yield matches your target return expectations\n• Your budget range fits perfectly with the ₦100,000 minimum",
  },
  { type: "user", message: "What about tax implications?" },
  {
    type: "ai",
    message:
      "Excellent point! NTBs offer several tax advantages:\n\n• Interest income is tax-free for individual investors\n• No withholding tax on returns\n• Capital gains are also exempt from tax\n\nThis effectively increases your real returns compared to other investment options.",
  },
];
