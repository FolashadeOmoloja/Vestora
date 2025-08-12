import { ChevronDown } from "lucide-react";

export const TranscationFilter = ({
  onClick,
  showFilterDropdown,
  filter,
  filterName,
  dropDownOnClick,
  filterOptions,
  Icon,
}: {
  onClick: () => void;
  dropDownOnClick: (option: string) => void;
  showFilterDropdown: boolean;
  filter: string;
  filterName: string;
  filterOptions: string[];
  Icon: React.ElementType;
}) => {
  return (
    <div className="relative text-[#002C6C]">
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 h-[48px]  bg-white rounded-lg shadow"
      >
        {Icon && <Icon className="h-4 w-4 text-[#FFD100] font-semibold" />}
        <span className="text-sm">
          {filterName}: <span className="font-medium">{filter}</span>
        </span>
        <ChevronDown className="h-4 w-4 " />
      </button>

      {showFilterDropdown && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {filterOptions.map((option) => (
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
};
