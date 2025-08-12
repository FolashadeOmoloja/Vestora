"use client";
import React from "react";
import DashboardContainer from "../../components/ui/DashboardContainer";
import DynamicTable from "../../components/ui/DynamicTable";
import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { investDest, NTBColumn } from "../../utils/TableData";
import { StatusFilter, TenorFilter } from "./Fitlters";
import { NTBData } from "@/app/utils/dummy";
import InvestmentModal from "./InvestmentModal";

const NTBListingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tenorFilter, setTenorFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showTenorDropdown, setShowTenorDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedInvesmtentDets, setSelectedInvesmtentDets] =
    useState<investDest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (row: any) => {
    setSelectedInvesmtentDets(row);
    setModalOpen(true);
  };

  const columns = NTBColumn({ onOpenModal: handleOpenModal });

  const filteredData = useMemo(() => {
    return NTBData.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tenor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [NTBData, searchTerm, statusFilter]);

  const tenorOptions = ["All", "91 days", "197 days", "111 days", "360 days"];
  const statusOptions = ["All", "Active", "Expired", "Booked"];

  return (
    <DashboardContainer activeItem="ntbs">
      <div className=" bg-[#F5F8FC] min-h-screen">
        <h1 className="text-2xl font-bold text-[#002C6C] mb-4">NTB Listings</h1>
        <p className="text-gray-600 mb-1">
          Browse available Nigerian Treasury Bills and invest directly from your
          dashboard.
        </p>
        <p className="text-sm mb-6 text-gray-400 max-w-xl">
          Nigerian Treasury Bills are short-term, government-backed investments
          with fixed returns. They offer a safe and reliable way to grow your
          money over a set period.
        </p>

        {/* Search and Filters */}
        <div className=" mb-6">
          <div className="flex flex-col gap-y-4 lg:flex-row  justify-between flex-wrap">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#002C6C] h-4 w-4" />
              <input
                type="text"
                placeholder="Search Investments.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="placeholder:text-gray-400 placeholder:text-sm w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:ring-2 focus:ring-[#002C6C] focus:border-transparent outline-none shadow"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <TenorFilter
                onClick={() => {
                  setShowTenorDropdown(!showTenorDropdown);
                  setShowStatusDropdown(false);
                }}
                dropDownOnClick={(option) => {
                  setTenorFilter(option);
                  setShowTenorDropdown(false);
                }}
                showTenorDropdown={showTenorDropdown}
                tenorFilter={tenorFilter}
                tenorOptions={tenorOptions}
              />
              {/* Status Filter */}
              <StatusFilter
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowTenorDropdown(false);
                }}
                dropDownOnClick={(option) => {
                  setStatusFilter(option);
                  setShowStatusDropdown(false);
                }}
                showStatusDropdown={showStatusDropdown}
                statusFilter={statusFilter}
                statusOptions={statusOptions}
              />
            </div>
          </div>
        </div>

        <DynamicTable columns={columns} data={filteredData} />
        {modalOpen && selectedInvesmtentDets && (
          <InvestmentModal
            onClose={() => setModalOpen(false)}
            investmentDetails={selectedInvesmtentDets}
          />
        )}

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

export default NTBListingsPage;
