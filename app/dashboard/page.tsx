"use client";
import React from "react";

import {
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import Sidebar from "../components/ui/SideBar";
import {
  FaCalendarCheck,
  FaChartLine,
  FaLightbulb,
  FaMoneyBill1Wave,
} from "react-icons/fa6";
import DynamicTable from "../components/ui/DynamicTable";
import { MyNtbColumn } from "../utils/TableData";
import UserHeader from "../components/ui/UserHeader";
import { FaFileDownload, FaRedoAlt } from "react-icons/fa";
import AICard from "../components/ui/AICard";
import { DashboardBtn } from "../components/ui/Button";
import StatusCards from "./components/StatusCards";
import DashboardContainer from "../components/ui/DashboardContainer";
import NTBGrowthChart from "./components/NTBGrowthChart";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 600 },
  { name: "Jun", value: 800 },
];

const ntbData = [
  {
    amount: "₦500,000",
    maturityDate: "Oct 1, 2025",
    status: "Active",
    poi: "Download",
    action: "Pre-liquidate",
  },
  {
    amount: "₦700,000",
    maturityDate: "Aug 12, 2025",
    status: "Pending",
    poi: "Download",
    action: "Pre-liquidate",
  },
  {
    amount: "₦300,000",
    maturityDate: "Aug 30, 2025",
    status: "Liquidated",
    poi: "Download",
    action: "Pre-liquidate",
  },
  {
    amount: "₦2,000,000",
    maturityDate: "Jul 18, 2025",
    status: "Matured",
    poi: "Download",
    action: "Pre-liquidate",
  },
];

export default function Dashboard() {
  return (
    <DashboardContainer activeItem="dashboard">
      <div>
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-semibold text-[#002C6C]">
            Welcome, Folashade
          </h1>
          <UserHeader />
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Cards
            Icon={FaMoneyBill1Wave}
            title="Total Investment"
            value="₦5,000,000"
          />
          <Cards Icon={FaChartLine} title="Interest Earned" value="₦250,000" />
          <Cards
            Icon={FaCalendarCheck}
            title="Matured Investments"
            value="₦1,200,000"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <InfoCard
            icon={<FaLightbulb className="text-[#FFD100] text-xl" />}
            title="Wallet Overview"
            description="Manage and fund your wallet"
            buttonText="View Wallet"
            onClick={() => console.log("Wallet clicked")}
          />

          <InfoCard
            icon={<FaRedoAlt className="text-[#FFD100] text-xl" />}
            title="Reinvest Now"
            description="₦1.2M available for reinvestment"
            buttonText="Explore Listings"
            onClick={() => console.log("Explore Listings clicked")}
          />

          <InfoCard
            icon={<FaFileDownload className="text-[#FFD100] text-xl" />}
            title="Download Reports"
            description="Export your NTB history"
            buttonText="Download CSV"
            onClick={() => console.log("Download CSV clicked")}
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6 mb-8">
          <NTBGrowthChart />
          <AICard />
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-[#002C6C] mb-4">
            Recent NTB Investments
          </h3>
          <DynamicTable columns={MyNtbColumn} data={ntbData} />
          <div>
            <DashboardBtn
              cta="View All NTB Investments"
              className="max-w-[300px] mt-6"
            />
          </div>
        </div>
        <StatusCards />
      </div>
    </DashboardContainer>
  );
}

const Cards = ({
  Icon,
  title,
  value,
}: {
  Icon: React.ElementType;
  title: string;
  value: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 group relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="p-3 bg-[#002C6C]/90 rounded-md">
      <Icon className="text-[#FFD100] text-xl" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold text-[#002C6C]">{value}</h2>
    </div>
    {/* Subtle border accent */}
    <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#002C6C]/20 to-[#002C6C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);

const InfoCard = ({
  icon,
  title,
  description,
  buttonText,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}) => (
  <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg flex items-center space-x-4">
    <div className="p-3 bg-[#002C6C]/90 rounded-md">{icon}</div>
    <div>
      <p className="text-sm font-semibold text-[#002C6C]">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
      <button
        onClick={onClick}
        className="text-sm text-[#002C6C] underline mt-1"
      >
        {buttonText}
      </button>
    </div>
  </div>
);

//bg-[#E5ECF6]/40
