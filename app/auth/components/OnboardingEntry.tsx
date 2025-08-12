"use client";
import React, { useState } from "react";
import { Building, CreditCard, Shield, ArrowRight } from "lucide-react";

// Types
interface UserTypeSelectionProps {
  onSelect: (type: "firstbank" | "open_account" | "link_only") => void;
}

const UserTypeSelection = ({ onSelect }: UserTypeSelectionProps) => {
  const [selectedType, setSelectedType] = useState<
    "firstbank" | "open_account" | "link_only" | null
  >(null);

  const userTypes = [
    {
      id: "firstbank" as const,
      title: "I'm a FirstBank Customer",
      description: "I have an existing FirstBank account",
      icon: Building,
      color: "bg-[#002C6C]",
      hoverColor: "hover:border-[#002C6C] hover:bg-blue-50",
    },
    {
      id: "open_account" as const,
      title: "Open FirstBank Account",
      description: "I want to open a new FirstBank account",
      icon: CreditCard,
      color: "bg-[#002C6C]",
      hoverColor: "hover:border-[#002C6C] hover:bg-blue-50",
    },
    {
      id: "link_only" as const,
      title: "Link Other Bank Account",
      description: "I'll use my existing bank account from another bank",
      icon: Shield,
      color: "bg-[#002C6C]",
      hoverColor: "hover:border-[#002C6C] hover:bg-blue-50",
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
        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-semibold text-[#002C6C] mb-4">
            Welcome to FirstBank Treasury
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-8">
            Make secure investments in Nigerian Treasury Bills with ease,
            confidence, and
            <span className="font-medium text-[#002C6C]">
              {" "}
              FirstBank's support.
            </span>
          </p>
        </div>

        {/* Form Container */}
        <div className="">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-[#002C6C] mb-2">
                How would you like to proceed?
              </h3>
              <p className="text-gray-600 text-sm">
                Choose the option that best describes your situation
              </p>
            </div>

            {/* User Type Options */}
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
                        ? `border-[#002C6C] bg-blue-50 shadow-md`
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
                            isSelected ? "text-[#002C6C]" : "text-gray-800"
                          }`}
                        >
                          {type.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {type.description}
                        </p>
                      </div>

                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 bg-[#002C6C] rounded-full flex items-center justify-center">
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

            {/* Continue Button */}
            <div className="pt-6">
              <button
                onClick={handleContinue}
                disabled={!selectedType}
                className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-medium text-white transition-all ${
                  selectedType
                    ? "bg-[#002C6C] hover:bg-[#001a4d] shadow-md hover:shadow-lg"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">
            Already have a treasury account?
            <span className="text-[#002C6C] font-medium cursor-pointer hover:underline ml-1">
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Demo component to show how it works
export default function OnboardingEntry({ setStep }: any) {
  const handleUserTypeSelect = (
    type: "firstbank" | "open_account" | "link_only"
  ) => {
    setStep(type);

    const typeNames = {
      firstbank: "FirstBank Customer",
      open_account: "Open FirstBank Account",
      link_only: "Link Other Bank Account",
    };
  };

  return <UserTypeSelection onSelect={handleUserTypeSelect} />;
}
