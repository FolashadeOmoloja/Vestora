import { useState } from "react";
import {
  Home,
  List,
  Wallet,
  ArrowLeftRight,
  Settings,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface SidebarProps {
  activeItem: string;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  isCollapsed,
  setIsCollapsed,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      id: "ntbs",
      label: "NTB Listings",
      icon: List,
      href: "/dashboard/ntb-listing",
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: Wallet,
      href: "/dashboard/wallet",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: ArrowLeftRight,
      href: "/dashboard/transactions",
    },
    {
      id: "ai-forecast",
      label: "AI Forecast",
      icon: TrendingUp,
      href: "/dashboard/ai-forecast",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden text-white shadow-lg"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 p-1 left-64 top-3 fixed z-50" />
        ) : (
          <Menu className="w-5 h-5 bg-[#1a5c2e] p-1 left-4 top-3 rounded-lg fixed z-50 hover:bg-[#3db86a]/90 transition-colors duration-200" />
        )}
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`lg:h-svh h-full bg-[#0a2e16] border-r border-white/8 text-white py-10 px-4 fixed transition-all duration-300 ease-in-out shadow-xl z-40 ${
          isCollapsed ? "w-20" : "w-72"
        } ${
          isMobileOpen
            ? "lg:block translate-x-0"
            : "hidden lg:block max-lg:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8 relative">
          <div className={`transition-opacity duration-300 `}>
            <h2
              className={`${
                isCollapsed
                  ? "opacity-0 transition-all duration-300"
                  : "opacity-100 text-xl font-semibold tracking-tight text-white transition-all duration-500"
              } `}
            >
              Vest<span className="text-[#3db86a]">ora</span>
            </h2>
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute right-0 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 ml-auto hidden lg:block"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`group relative flex items-center px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive
                    ? "bg-[#3db86a] text-white shadow-md"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setIsMobileOpen(false)}
              >
                <div
                  className={`flex-shrink-0 transition-transform duration-200 ${
                    isHovered && !isActive ? "scale-110" : ""
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isActive ? "text-white" : "text-white/80"
                    }`}
                  />
                </div>

                <span
                  className={`ml-4 font-medium text-sm ${
                    isCollapsed
                      ? "opacity-0 translate-x-4 transition-all duration-300 lg:block hidden"
                      : "opacity-100 translate-x-0 transition-all duration-500 "
                  } ${isActive ? "text-white" : ""}`}
                >
                  {item.label}
                </span>

                {isCollapsed && isHovered && (
                  <div className="absolute left-16 bg-[#071d0e] text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-50 transition-all duration-200 hidden lg:block border border-white/10">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#071d0e] rotate-45 border-l border-b border-white/10" />
                  </div>
                )}

                {isHovered && !isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3db86a]/10 to-transparent rounded-lg transition-opacity duration-200 pointer-events-none" />
                )}
              </a>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="absolute bottom-6 left-4 right-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3db86a] rounded-full flex items-center justify-center">
                  <span className="text-[#0a2e16] font-bold text-sm">FO</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Folashade Omoloja
                  </p>
                  <p className="text-xs text-white/55 truncate">
                    omolojashade@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
