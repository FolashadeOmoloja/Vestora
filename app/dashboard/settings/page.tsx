"use client";
import React, { useState } from "react";
import {
  User,
  TrendingUp,
  RefreshCw,
  FileCheck,
  Bell,
  Scale,
  Settings,
} from "lucide-react";
import { AccountInfo } from "./components/AccountInfo";

import { AIPreferences } from "./components/AIPreferences";
import { AutoRollover } from "./components/AutoRollover";
import { Compliance } from "./components/Compliance";
import { Legal } from "./components/Legal";
import { Notifications } from "./components/Notifications";
import Header from "@/app/components/ui/Header";
import { DashboardBtn } from "@/app/components/ui/Button";
import DashboardContainer from "@/app/components/ui/DashboardContainer";

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("account");

  const sections = [
    { id: "account", label: "Account Information", icon: User },
    {
      id: "ai-preferences",
      label: "AI Investment Preferences",
      icon: TrendingUp,
    },
    { id: "auto-rollover", label: "Auto-Rollover Settings", icon: RefreshCw },
    { id: "compliance", label: "Compliance & KYC", icon: FileCheck },
    { id: "notifications", label: "Preferences & Notifications", icon: Bell },
    { id: "legal", label: "Legal & Security", icon: Scale },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return <AccountInfo />;
      case "ai-preferences":
        return <AIPreferences />;
      case "auto-rollover":
        return <AutoRollover />;
      case "compliance":
        return <Compliance />;
      case "notifications":
        return <Notifications />;
      case "legal":
        return <Legal />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <DashboardContainer activeItem="seettings">
      <div className="min-h-screen">
        <div>
          {/* Header */}
          <Header
            Icon={Settings}
            headline="Settings"
            text="Manage your account preferences and security settings"
          />

          <div className="grid grid-cols-1 xl:grid-cols-6 gap-8 mt-9">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          activeSection === section.id
                            ? "bg-[#3db86a] text-[#0a2e16] shadow-sm"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#0a2e16]"
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium text-left">
                          {section.label}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl sm:p-8 p-4 shadow-sm">
                {renderContent()}

                {/* Save Button */}
                <div className="flex sm:justify-end justify-start mt-8 pt-6">
                  <DashboardBtn
                    cta="Save Changes"
                    className="py-4 max-w-[280px] "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default SettingsPage;
