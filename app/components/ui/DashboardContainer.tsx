import Sidebar from "./SideBar";
import { useState } from "react";

const DashboardContainer = ({
  activeItem,
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex">
      <Sidebar
        activeItem={activeItem}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div
        className={`flex-1 ml-0 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-72"
        } min-h-screen bg-[#F5F8FC] p-10  max-xl:px-5 max-md:p-6  max-sm:p-4 max-md:!pt-10 transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardContainer;
