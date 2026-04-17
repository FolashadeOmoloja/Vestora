import {
  FaHome,
  FaListAlt,
  FaWallet,
  FaExchangeAlt,
  FaCog,
} from "react-icons/fa";
const FormerSideBar = ({ activeItem }: { activeItem: string }) => (
  <aside className="w-72 h-screen bg-[#0a2e16] border-r border-white/8 text-white py-10 px-8 hidden md:block fixed">
    <h2 className="text-xl font-semibold tracking-tight mb-10">
      Vest<span className="text-[#3db86a]">ora</span>
    </h2>
    <nav className="space-y-2">
      <a
        href="/dashboard"
        className={`dashboard-nav ${
          activeItem === "dashboard" ? "active" : ""
        }`}
      >
        <FaHome /> Dashboard
      </a>
      <a
        href="/dashboard/ntb-listing"
        className={`dashboard-nav ${activeItem === "ntbs" ? "active" : ""}`}
      >
        <FaListAlt /> NTB Listings
      </a>
      <a
        href="/dashboard/wallet"
        className={`dashboard-nav ${activeItem === "wallet" ? "active" : ""}`}
      >
        <FaWallet /> Wallet
      </a>
      <a
        href="/dashboard/transactions"
        className={`dashboard-nav ${
          activeItem === "transactions" ? "active" : ""
        }`}
      >
        <FaExchangeAlt /> Transactions
      </a>
      <a
        href="#"
        className={`dashboard-nav ${activeItem === "settings" ? "active" : ""}`}
      >
        <FaCog /> Settings
      </a>
      <a
        href="/dashboard/ai-forecast"
        className={`dashboard-nav ${
          activeItem === "ai-forecast" ? "active" : ""
        }`}
      >
        <FaListAlt /> AI Forecast
      </a>
    </nav>
  </aside>
);

export default FormerSideBar;
