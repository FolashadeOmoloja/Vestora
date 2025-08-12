"use client";
import DashboardContainer from "@/app/components/ui/DashboardContainer";
import DynamicTable from "@/app/components/ui/DynamicTable";
import { transactions } from "@/app/utils/dummy";
import { walletColumn } from "@/app/utils/TableData";
import { ChevronDown, Search } from "lucide-react";

import { MdCheckCircle, MdOutlineCategory } from "react-icons/md";

import { useMemo, useState } from "react";
import { TranscationFilter } from "./Filter";
import { DashboardBtn } from "@/app/components/ui/Button";

const TransactionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const filteredData = useMemo(() => {
    return transactions.filter((item) => {
      if (searchTerm.toLowerCase() === "all") {
        return transactions;
      }
      const matchesSearch =
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, statusFilter]);

  const typeOptions = ["All", "Deposit", "Withdrawal", "NTB Investment"];
  const statusOptions = ["All", "Completed", "Processing", "Failed"];
  return (
    <DashboardContainer activeItem="transactions">
      <div className=" bg-[#F5F8FC] min-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#002C6C]">
            Transactions History
          </h1>
          <p className="text-sm text-gray-600">
            Track your deposits, NTB purchases, redemptions, and all wallet
            movements all in one place.
          </p>
        </div>

        <div className=" mb-6">
          <div className="flex flex-col gap-y-4 lg:flex-row justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#002C6C] h-4 w-4" />
              <input
                type="text"
                placeholder="Search Transactions.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="placeholder:text-gray-400 placeholder:text-sm w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:ring-2 focus:ring-[#002C6C] focus:border-transparent outline-none shadow"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <TranscationFilter
                onClick={() => {
                  setShowTypeDropdown(!showTypeDropdown);
                  setShowStatusDropdown(false);
                }}
                dropDownOnClick={(option) => {
                  setTypeFilter(option);
                  setSearchTerm(option);
                  setShowTypeDropdown(false);
                }}
                showFilterDropdown={showTypeDropdown}
                filter={typeFilter}
                filterOptions={typeOptions}
                filterName={"Type"}
                Icon={MdOutlineCategory}
              />

              <TranscationFilter
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowTypeDropdown(false);
                }}
                dropDownOnClick={(option) => {
                  setStatusFilter(option);
                  setSearchTerm(option);
                  setShowStatusDropdown(false);
                }}
                showFilterDropdown={showStatusDropdown}
                filter={statusFilter}
                filterOptions={statusOptions}
                filterName="Status"
                Icon={MdCheckCircle}
              />
            </div>
            <DashboardBtn cta="Export CSV" className="max-w-[140px] !px-0" />
          </div>
        </div>

        <div className="bg-white rounded shadow  border border-gray-200 p-6">
          <DynamicTable columns={walletColumn} data={filteredData} />
        </div>
        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              1-{filteredData.length} of {filteredData.length}
            </span>
            <div className="flex gap-2">
              <button className="p-1 hover:text-[#002C6C] text-gray-400 ">
                <ChevronDown className="h-4 w-4 rotate-90" />
              </button>
              <button className="p-1 hover:text-[#002C6C] text-gray-400">
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default TransactionPage;
