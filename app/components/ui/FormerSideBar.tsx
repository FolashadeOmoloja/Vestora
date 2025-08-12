import {
  FaHome,
  FaListAlt,
  FaWallet,
  FaExchangeAlt,
  FaCog,
} from "react-icons/fa";
const FormerSideBar = ({ activeItem }: { activeItem: string }) => (
  <aside className="w-72 h-screen bg-[#002C6C] text-white py-10 px-8 hidden md:block fixed">
    <h2 className="text-2xl font-bold mb-10">
      FirstBank <span className="text-[#FFD100]">Treasury </span>
    </h2>
    <nav className="space-y-4">
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
