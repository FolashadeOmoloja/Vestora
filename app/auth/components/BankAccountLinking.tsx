"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Search,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import PersonalDetailsDemo from "./PersonalDetails";

// Types
interface BankAccountLinkingProps {
  onContinue: (data: {
    bank: string;
    accountNumber: string;
    accountName: string;
  }) => void;
  onBack: () => void;
}

interface Bank {
  id: string;
  name: string;
  code: string;
}

const BankAccountLinking = ({
  onContinue,
  onBack,
}: BankAccountLinkingProps) => {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  // Nigerian banks list
  const banks: Bank[] = [
    { id: "044", name: "Access Bank", code: "044" },
    { id: "014", name: "Afribank Nigeria Plc", code: "014" },
    { id: "023", name: "Citibank Nigeria Limited", code: "023" },
    { id: "050", name: "Ecobank Nigeria Plc", code: "050" },
    { id: "084", name: "Enterprise Bank Limited", code: "084" },
    { id: "070", name: "Fidelity Bank Plc", code: "070" },
    { id: "214", name: "First City Monument Bank Limited", code: "214" },
    { id: "058", name: "Guaranty Trust Bank Plc", code: "058" },
    { id: "030", name: "Heritage Banking Company Ltd", code: "030" },
    { id: "082", name: "Keystone Bank Limited", code: "082" },
    { id: "076", name: "Polaris Bank Limited", code: "076" },
    { id: "221", name: "Stanbic IBTC Bank Plc", code: "221" },
    { id: "232", name: "Sterling Bank Plc", code: "232" },
    { id: "032", name: "Union Bank of Nigeria Plc", code: "032" },
    { id: "033", name: "United Bank for Africa Plc", code: "033" },
    { id: "215", name: "Unity Bank Plc", code: "215" },
    { id: "035", name: "Wema Bank Plc", code: "035" },
    { id: "057", name: "Zenith Bank Plc", code: "057" },
    { id: "101", name: "Providus Bank", code: "101" },
    { id: "100", name: "Suntrust Bank", code: "100" },
    { id: "102", name: "Titan Trust Bank", code: "102" },
  ];

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setSearchTerm(bank.name);
    setShowDropdown(false);
    setAccountName("");
    setVerificationStatus("idle");
    setError("");
  };

  const handleAccountNumberChange = (value: string) => {
    // Only allow digits and limit to 10 characters
    const cleanValue = value.replace(/\D/g, "").slice(0, 10);
    setAccountNumber(cleanValue);
    setAccountName("");
    setVerificationStatus("idle");
    setError("");
  };

  const handleNameInquiry = async () => {
    if (!selectedBank || accountNumber.length !== 10) {
      setError(
        "Please select a bank and enter a valid 10-digit account number"
      );
      return;
    }

    setIsVerifying(true);
    setError("");
    setVerificationStatus("idle");

    // Simulate NIBSS name inquiry API call
    setTimeout(() => {
      setIsVerifying(false);

      // Simulate different responses for demo
      if (accountNumber === "0123456789") {
        setError("Account number not found. Please verify and try again.");
        setVerificationStatus("error");
      } else if (accountNumber === "1111111111") {
        setError(
          "Unable to verify account at this time. Please try again later."
        );
        setVerificationStatus("error");
      } else {
        // Success - generate a mock name based on account number
        const mockNames = [
          "ADEBAYO OLUMIDE SAMUEL",
          "CHIOMA BLESSING OKORO",
          "IBRAHIM MOHAMMED HASSAN",
          "FATIMA AISHA USMAN",
          "EMEKA CHRISTIAN NWANKWO",
          "KEMI FOLAKE WILLIAMS",
        ];
        const randomName =
          mockNames[parseInt(accountNumber.slice(-1)) % mockNames.length];
        setAccountName(randomName);
        setVerificationStatus("success");
      }
    }, 2000);
  };

  const handleContinue = () => {
    if (
      selectedBank &&
      accountNumber &&
      accountName &&
      verificationStatus === "success"
    ) {
      onContinue({
        bank: selectedBank.name,
        accountNumber,
        accountName,
      });
    }
  };

  const canVerify = selectedBank && accountNumber.length === 10 && !isVerifying;
  const canContinue =
    verificationStatus === "success" &&
    selectedBank &&
    accountNumber &&
    accountName;

  return (
    <div className="min-h-screen basis-1/2">
      <div className="max-w-2xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-[#002C6C] mb-4">
            Link Your Bank Account
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Connect your existing bank account to fund your Treasury Bill
            investments
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#002C6C] text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-[#002C6C]">
                Select Type
              </span>
            </div>
            <div className="w-8 h-px bg-[#002C6C]"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#002C6C] text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-[#002C6C]">
                Link Account
              </span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm text-gray-500">
                Personal Details
              </span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm text-gray-500">Verification</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="space-y-6">
            {/* Bank Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Your Bank
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                    if (!e.target.value) {
                      setSelectedBank(null);
                    }
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search for your bank..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#002C6C] focus:outline-none transition-colors"
                />
                <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />

                {showDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredBanks.length > 0 ? (
                      filteredBanks.map((bank) => (
                        <button
                          key={bank.id}
                          onClick={() => handleBankSelect(bank)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="font-medium">{bank.name}</span>
                          </div>
                          {selectedBank?.id === bank.id && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-center">
                        No banks found matching "{searchTerm}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Account Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => handleAccountNumberChange(e.target.value)}
                  placeholder="Enter your 10-digit account number"
                  maxLength={10}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    error && verificationStatus === "error"
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-[#002C6C]"
                  }`}
                />
                <div className="absolute right-3 top-3.5">
                  {verificationStatus === "success" && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {verificationStatus === "error" && (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {accountNumber.length}/10 digits
              </p>
            </div>

            {/* Verify Button */}
            <div>
              <button
                onClick={handleNameInquiry}
                disabled={!canVerify}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${
                  canVerify
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verifying Account...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Verify Account Name
                  </>
                )}
              </button>
            </div>

            {/* Account Name Display */}
            {accountName && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Account Name Verified
                    </p>
                    <p className="text-sm text-green-700 mt-1">{accountName}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && verificationStatus === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                onClick={onBack}
                className="flex-1 flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>

              <button
                onClick={handleContinue}
                disabled={!canContinue}
                className={`flex-2 flex items-center justify-center px-6 py-4 rounded-xl font-medium text-white transition-all ${
                  canContinue
                    ? "bg-[#002C6C] hover:bg-[#001a4d] shadow-md hover:shadow-lg"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Continue to Personal Details
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Having trouble?
                <span className="text-[#002C6C] font-medium cursor-pointer hover:underline ml-1">
                  Contact support
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component
export default function BankAccountLinkingDemo() {
  const [step, setStep] = useState<"linking" | "success">("linking");
  const [linkedAccount, setLinkedAccount] = useState<any>(null);

  const handleContinue = (data: {
    bank: string;
    accountNumber: string;
    accountName: string;
  }) => {
    console.log("Account linked:", data);
    setLinkedAccount(data);
    setStep("success");
  };

  const handleBack = () => {
    console.log("Going back to user type selection");
    alert("Going back to user type selection...");
  };

  if (step === "success") {
    return <PersonalDetailsDemo />;
  }

  return <BankAccountLinking onContinue={handleContinue} onBack={handleBack} />;
}
