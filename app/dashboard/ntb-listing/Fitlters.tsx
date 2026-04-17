import { Filter, ChevronDown, Calendar } from "lucide-react";
import { getStatusIcon } from "../../utils/Functions";

export const StatusFilter = ({
  onClick,
  showStatusDropdown,
  statusFilter,
  dropDownOnClick,
  statusOptions,
}: {
  onClick: () => void;
  dropDownOnClick: (option: string) => void;
  showStatusDropdown: boolean;
  statusFilter: string;
  statusOptions: string[];
}) => (
  <div className="relative text-[#0a2e16]">
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-3  bg-white rounded-lg shadow"
    >
      <Filter className="h-4 w-4  text-[#3db86a]" />
      <span className="text-sm">
        Status: <span className="font-medium">{statusFilter}</span>
      </span>
      <ChevronDown className="h-4 w-4" />
    </button>

    {showStatusDropdown && (
      <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
        {statusOptions.map((option) => (
          <button
            key={option}
            onClick={() => dropDownOnClick(option)}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
          >
            {option !== "All" && getStatusIcon(option)}
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);

export const TenorFilter = ({
  onClick,
  showTenorDropdown,
  tenorFilter,
  dropDownOnClick,
  tenorOptions,
}: {
  onClick: () => void;
  dropDownOnClick: (option: string) => void;
  showTenorDropdown: boolean;
  tenorFilter: string;
  tenorOptions: string[];
}) => (
  <div className="relative text-[#0a2e16]">
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-3  bg-white rounded-lg shadow"
    >
      <Calendar className="h-4 w-4 text-[#3db86a] font-semibold" />
      <span className="text-sm">
        Tenor: <span className="font-medium">{tenorFilter}</span>
      </span>
      <ChevronDown className="h-4 w-4 " />
    </button>

    {showTenorDropdown && (
      <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
        {tenorOptions.map((option) => (
          <button
            key={option}
            onClick={() => dropDownOnClick(option)}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);
