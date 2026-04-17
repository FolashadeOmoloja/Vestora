"use client";
import React, { useState } from "react";
import { Building, CreditCard, Shield, ArrowRight } from "lucide-react";

interface UserTypeSelectionProps {
  onSelect: (type: "vestora" | "open_account" | "link_only") => void;
}

const UserTypeSelection = ({ onSelect }: UserTypeSelectionProps) => {
  const [selectedType, setSelectedType] = useState<
    "vestora" | "open_account" | "link_only" | null
  >(null);

  const userTypes = [
    {
      id: "vestora" as const,
      title: "I'm a Vestora customer",
      description: "I have an existing Vestora account",
      icon: Building,
      color: "bg-[#3db86a]",
      hoverColor: "hover:border-[#3db86a]/50 hover:bg-[#f4faf6]",
    },
    {
      id: "open_account" as const,
      title: "Open a Vestora account",
      description: "I want to open a new Vestora account",
      icon: CreditCard,
      color: "bg-[#3db86a]",
      hoverColor: "hover:border-[#3db86a]/50 hover:bg-[#f4faf6]",
    },
    {
      id: "link_only" as const,
      title: "Link Other Bank Account",
      description: "I'll use my existing bank account from another bank",
      icon: Shield,
      color: "bg-[#3db86a]",
      hoverColor: "hover:border-[#3db86a]/50 hover:bg-[#f4faf6]",
    },
  ];

  const handleSelection = (type: (typeof userTypes)[0]["id"]) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-[#3db86a]/15 border border-[#3db86a]/30 text-[#1a5c2e] text-xs px-3 py-1.5 rounded-full mb-5">
            <Shield size={12} />
            CBN Licensed · Secured by Vestora
          </div>
          <h1 className="text-3xl font-semibold text-[#0a2e16] mb-4">
            Welcome to Vestora
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-8">
            Make secure investments in Nigerian Treasury Bills with ease,
            confidence, and
            <span className="font-medium text-[#1a5c2e]">
              {" "}
              {`Vestora's support.`}
            </span>
          </p>
        </div>

        <div className="">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-[#0a2e16] mb-2">
                How would you like to proceed?
              </h3>
              <p className="text-gray-600 text-sm">
                Choose the option that best describes your situation
              </p>
            </div>

            <div className="space-y-4">
              {userTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;

                return (
                  <button
                    key={type.id}
                    onClick={() => handleSelection(type.id)}
                    className={`w-full p-3 border-2 rounded-xl transition-all text-left group relative ${
                      isSelected
                        ? "border-[#3db86a] bg-[#e8f5ed] shadow-md"
                        : `border-gray-200 ${type.hoverColor}`
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`${type.color} text-white p-3 rounded-xl mr-6 group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold text-lg mb-0.5 ${
                            isSelected ? "text-[#0a2e16]" : "text-gray-800"
                          }`}
                        >
                          {type.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {type.description}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 bg-[#3db86a] rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-6">
              <button
                onClick={handleContinue}
                disabled={!selectedType}
                className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-medium text-white transition-all ${
                  selectedType
                    ? "bg-[#3db86a] hover:bg-[#35a55e] shadow-md hover:shadow-lg"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">
            Already have a treasury account?
            <span className="text-[#1a5c2e] font-medium cursor-pointer hover:underline ml-1">
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function OnboardingEntry({ setStep }: any) {
  const handleUserTypeSelect = (
    type: "vestora" | "open_account" | "link_only"
  ) => {
    setStep(type);
  };

  return <UserTypeSelection onSelect={handleUserTypeSelect} />;
}
