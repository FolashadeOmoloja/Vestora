"use client";
import { useState } from "react";

import { investDest } from "@/app/utils/TableData";
import { HiSparkles } from "react-icons/hi";
import { recommendations } from "@/app/utils/dummy";
import { AiInsights, UserProfileSummary } from "./LeftPanel";
import AiRecommendations from "./AiRecommendations";
import AiChat from "./AiChat";
import DashboardContainer from "@/app/components/ui/DashboardContainer";
import Header from "@/app/components/ui/Header";

const AIForecastPage = () => {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvesmtentDets, setSelectedInvesmtentDets] =
    useState<investDest | null>(null);

  // Mock data

  return (
    <DashboardContainer activeItem="ai-forecast">
      <div className="min-h-screen">
        <Header
          Icon={HiSparkles}
          headline="AI Investment Forecast"
          text="Personalized NTB recommendations powered by AI"
        />

        <div className="max-w-7xl mx-auto  py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <UserProfileSummary />
              <AiInsights />
            </div>

            {/* Center Panel - Recommendations */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <nav className="flex">
                    <button
                      onClick={() => setActiveTab("recommendations")}
                      className={`sm:px-6 px-3 py-4 text-sm font-medium border-b-2 ${
                        activeTab === "recommendations"
                          ? "border-[#0a2e16] text-[#0a2e16]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      AI Recommendations
                    </button>
                    <button
                      onClick={() => setActiveTab("chat")}
                      className={`sm:px-6 px-3 text-sm font-medium border-b-2 ${
                        activeTab === "chat"
                          ? "border-[#0a2e16] text-[#0a2e16]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Chat with AI
                    </button>
                  </nav>
                </div>

                {activeTab === "recommendations" && (
                  <div className="sm:p-6 p-4">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-[#0a2e16] mb-2">
                        Recommended NTBs for You
                      </h2>
                      <p className="text-gray-600">
                        Based on your investment profile and market analysis
                      </p>
                    </div>

                    <div className="space-y-6">
                      {recommendations.map((ntb) => (
                        <AiRecommendations
                          ntb={ntb}
                          modalOpen={modalOpen}
                          setModalOpen={setModalOpen}
                          setSelectedInvesmtentDets={setSelectedInvesmtentDets}
                          setActiveTab={setActiveTab}
                          selectedInvesmtentDets={selectedInvesmtentDets}
                          key={ntb.code}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "chat" && <AiChat />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default AIForecastPage;
