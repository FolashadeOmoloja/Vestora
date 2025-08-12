import { Scale, ChevronRight, Download, AlertCircle } from "lucide-react";

export const Legal = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-[#002C6C] flex items-center gap-2">
      <Scale className="w-5 h-5" />
      Legal & Security
    </h3>

    <div className="space-y-4">
      <button className="flex items-center justify-between w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <span className="text-[#333333] font-medium">Terms & Conditions</span>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <button className="flex items-center justify-between w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <span className="text-[#333333] font-medium">Privacy Policy</span>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <button className="flex items-center justify-between w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <Download className="w-5 h-5 text-[#005377]" />
          <span className="text-[#333333] font-medium">Download My Data</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <div className="border-t border-gray-200 pt-4 mt-6">
        <button className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">Deactivate My Account</span>
        </button>
        <p className="text-sm text-gray-500 mt-2">
          This action cannot be undone. All your data will be permanently
          deleted.
        </p>
      </div>
    </div>
  </div>
);
