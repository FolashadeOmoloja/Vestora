import { FileCheck, CheckCircle, Eye, ChevronRight } from "lucide-react";

export const Compliance = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-[#0a2e16] flex items-center gap-2">
      <FileCheck className="w-5 h-5" />
      Compliance & KYC
    </h3>

    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <CheckCircle className="w-6 h-6 text-teal-600" />
        <h4 className="font-semibold text-teal-700">KYC Completion Status</h4>
      </div>
      <div className="w-full bg-teal-200 rounded-full h-2 mb-2">
        <div className="bg-teal-600 h-2 rounded-full w-full"></div>
      </div>
      <p className="text-teal-600 text-sm">
        100% Complete - All documents verified
      </p>
    </div>

    <button className="flex items-center justify-between w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <Eye className="w-5 h-5 text-[#005377]" />
        <span className="text-[#333333] font-medium">
          View Submitted Documents
        </span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  </div>
);
