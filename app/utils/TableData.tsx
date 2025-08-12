import React from "react";
import { DashboardBtn } from "../components/ui/Button";
import {
  getAvailabilityBar,
  getStatusIcon,
  getStatusBadge,
  formatCurrency,
  getWalletStatusBadge,
} from "./Functions";

interface MyNTBRow {
  amount: string;
  maturityDate: string;
  status: string;
  poi?: string;
  action?: string;
  [key: string]: any;
}

interface MyNTBCol {
  header: string;
  accessor: "amount" | "maturityDate" | "status" | "poi" | "action";
  cell?: (value: any, row: MyNTBRow) => React.ReactNode;
}
export type investDest = {
  code: string;
  rate: string;
  settlement: string;
  description?: string;
  rating?: string;
  matchScore?: number;
  reasons?: string[];
  risk?: string;
  maturity: string;
  minInvestment: string;
  tenor: string;
};
export const MyNtbColumn: MyNTBCol[] = [
  { header: "Amount", accessor: "amount" },
  { header: "Maturity Date", accessor: "maturityDate" },
  {
    header: "Status",
    accessor: "status",
    cell: (value: string) => (
      <span
        className={
          value === "Active"
            ? "text-green-600"
            : value === "Matured"
            ? "text-[#002C6C]"
            : value === "Pending"
            ? "text-yellow-600"
            : "text-gray-400"
        }
      >
        {value}
      </span>
    ),
  },
  {
    header: "POI",
    accessor: "poi",
    cell: (_: any, row: MyNTBRow) => (
      <button className="text-[#002C6C] border border-[#002C6C] px-2 py-1 rounded text-sm">
        Download
      </button>
    ),
  },
  {
    header: "Action",
    accessor: "action",
    cell: (_: any, row: MyNTBRow) => (
      <button
        className={`text-sm underline ${
          row.status === "Active"
            ? "text-red-600"
            : "text-gray-400 cursor-not-allowed"
        }`}
        disabled={row.status !== "Active"}
      >
        Pre-liquidate
      </button>
    ),
  },
];

interface NTBRow {
  id: string;
  description: string;
  code: string;
  tenor: string;
  settlement: string;
  maturity: string;
  rate: string;
  risk: string;
  offerSize: string;
  minInvestment: string;
  available: string;
  availablePercent: number;
  status: string;
  deadline: string;
}

interface NTBCol {
  header: string;
  accessor:
    | "tenor"
    | "rate"
    | "description"
    | "minInvestment"
    | "available"
    | "status";
  cell?: (value: any, row: NTBRow) => React.ReactNode;
}

export const NTBColumn = ({
  onOpenModal,
}: {
  onOpenModal: (row: any) => void;
}): NTBCol[] => [
  {
    header: "Tenor",
    accessor: "tenor",
    cell: (_: any, row: NTBRow) => (
      <div>
        <div className="text-sm font-medium text-gray-900">{row.tenor}</div>
        <div className="text-xs text-gray-500">
          Settlement: {row.settlement}
        </div>
        <div className="text-xs text-gray-500">Maturity: {row.maturity}</div>
      </div>
    ),
  },
  {
    header: "Rate (%)",
    accessor: "rate",
    cell: (value: string) => (
      <div className="text-sm font-semibold text-[#002C6C]">{value}</div>
    ),
  },
  {
    header: "Description",
    accessor: "description",
    cell: (_: any, row: NTBRow) => (
      <div>
        <div className="text-sm font-semibold text-[#002C6C]">{row.id}</div>
        <div className="text-xs text-gray-500">{row.description}</div>
        <div className="text-xs text-gray-400">{row.code}</div>
        <div className="text-xs text-red-500 ">Deadline: {row.deadline}</div>
      </div>
    ),
  },

  {
    header: "Min. Investment",
    accessor: "minInvestment",
    cell: (_: any, row: NTBRow) => (
      <div>
        <div className="text-xs text-gray-500 mb-2">
          Min: ₦{row.minInvestment}
        </div>
        <span className=" px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
          {row.risk} Risk
        </span>
      </div>
    ),
  },
  {
    header: "Availability",
    accessor: "available",
    cell: (_: any, row: NTBRow) => (
      <div className="w-24">
        <div className="text-xs text-gray-600 mb-1">{row.available}</div>
        <div className="text-xs text-gray-500 mb-1">
          {row.availablePercent}% available
        </div>
        {getAvailabilityBar(row.availablePercent, row.status)}
      </div>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    cell: (value: string, row: NTBRow) => (
      <div className="flex items-center gap-2">
        {getStatusIcon(row.status)}
        <span className={getStatusBadge(row.status)}>{value}</span>
      </div>
    ),
  },
  {
    header: "Action",
    accessor: "status",
    cell: (_: any, row: NTBRow) => (
      <DashboardBtn
        cta="Invest"
        disabled={row.status !== "Active"}
        onClick={() => onOpenModal(row)}
      />
    ),
  },
];

type Transaction = {
  id: number;
  type: string;
  amount: number;
  status: string;
  date: string;
  time: string;
  reference: string;
  icon: React.ElementType;
  color: string;
};

interface WalletCol {
  header: string;
  accessor: "type" | "amount" | "status" | "date" | "time" | "reference";
  cell?: (value: any, row: Transaction) => React.ReactNode;
}

export const walletColumn: WalletCol[] = [
  {
    header: "Type",
    accessor: "type",
    cell: (_, row) => {
      const Icon = row.icon;
      return (
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${row.color} bg-opacity-10`}
          >
            <Icon className={`w-4 h-4 ${row.color}`} />
          </div>
          <span className="text-sm font-medium text-gray-900">{row.type}</span>
        </div>
      );
    },
  },
  {
    header: "Amount",
    accessor: "amount",
    cell: (value: number) => (
      <span
        className={`text-sm font-medium ${
          value > 0 ? "text-green-700" : "text-red-600"
        }`}
      >
        {value > 0 ? "+" : ""}
        {formatCurrency(Math.abs(value))}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    cell: (value: string, row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${getWalletStatusBadge(
          row.status
        )}`}
      >
        {row.status}
      </span>
    ),
  },
  {
    header: "Date",
    accessor: "date",
    cell: (value, row) => (
      <div>
        <div className="text-sm text-gray-900">{row.date}</div>
        <div className="text-sm text-gray-500">{row.time}</div>
      </div>
    ),
  },
  {
    header: "Reference",
    accessor: "reference",
    cell: (value) => <span className="text-sm text-gray-600">{value}</span>,
  },
];
