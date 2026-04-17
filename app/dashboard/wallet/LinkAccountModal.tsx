"use client";
import React, { useState } from "react";
import {
  CreditCard,
  Users,
  CheckCircle,
  Shield,
  AlertTriangle,
  Search,
  Eye,
  EyeOff,
} from "lucide-react";
import ModalContainer from "@/app/components/ui/ModalContainer";
import { formatCurrency, handleOtpChange } from "@/app/utils/Functions";
import { DashboardBtn } from "@/app/components/ui/Button";
import { AccountDetails, SampleDetails } from "@/app/utils/dummy";

const LinkAccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Search, 2: Verify, 3: OTP, 4: Success
  const [accountNumber, setAccountNumber] = useState("");

  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
    null
  );
  const [pin, setPin] = useState(["", "", "", ""]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSearching, setIsSearching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [accountAlias, setAccountAlias] = useState("");

  // Sample account data for demo
  const sampleAccounts: SampleDetails = {
    [accountNumber]: {
      accountNumber: accountNumber,
      accountName: "Folashade Omoloja",
      accountType: "Savings Account",
      balance: 5500000,
      isEligible: true,
    },
  };

  const handleAccountSearch = () => {
    if (accountNumber.length === 10) {
      setIsSearching(true);
      // Simulate API call
      setTimeout(() => {
        const foundAccount = sampleAccounts[accountNumber];
        if (foundAccount) {
          setAccountDetails(foundAccount);
          if (foundAccount.isEligible) {
            setAccountAlias(
              foundAccount.accountType === "Savings Account"
                ? "My Savings"
                : "My Current"
            );
          }
        } else {
          setAccountDetails({
            accountNumber,
            isEligible: false,
            reason: "Account not found or invalid account number",
          });
        }
        setIsSearching(false);
      }, 300);
    }
  };

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && accountDetails?.isEligible) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setIsProcessing(true);
      // Simulate account linking
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(4);
      }, 300);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setAccountNumber("");
    setAccountDetails(null);
    setPin(["", "", "", ""]);
    setOtp(["", "", "", "", "", ""]);
    setAccountAlias("");
    setIsProcessing(false);
    onClose();
  };

  const isPinComplete = pin.every((digit) => digit !== "");
  const isOtpComplete = otp.every((digit) => digit !== "");

  if (!isOpen) return null;

  return (
    <ModalContainer
      handleClose={handleClose}
      Icon={<Users className="text-[#0a2e16]" size={24} />}
      heading={"Link New Account"}
      text="Add another Vestora account"
    >
      <div className="p-6">
        {/* Step 1: Account Search */}
        {currentStep === 1 && (
          <div className="space-y-5">
            {/* Info Card */}
            <div className="bg-blue-50 rounded-lg py-2 px-3 border border-blue-200">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-[#0a2e16] mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-[#0a2e16] text-sm leading-tight">
                    You can only link Vestora accounts that belong to you.
                    We'll verify account ownership before linking.
                  </p>
                </div>
              </div>
            </div>

            {/* Account Number Input */}
            <div>
              <label className="block text-sm font-medium text-[#0a2e16] mb-2">
                Vestora Account Number
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 10);
                    setAccountNumber(value);
                    if (accountDetails) setAccountDetails(null);
                  }}
                  className="form-input !py-3 text-sm"
                  placeholder="Enter 10-digit account number"
                  maxLength={10}
                />
                <button
                  onClick={handleAccountSearch}
                  disabled={accountNumber.length !== 10 || isSearching}
                  className="px-6 py-3 bg-[#0a2e16] text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#1a5c2e] transition-colors flex items-center"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Search size={20} />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Account must be a valid Vestora account in your name
              </p>
            </div>

            {/* Account Search Results */}
            {accountDetails && (
              <div
                className={`rounded-lg p-4 border ${
                  accountDetails.isEligible
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                {accountDetails.isEligible ? (
                  <div className="text-xs">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <h3 className="font-semibold text-green-900">
                        Account Found & Eligible
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Name:</span>
                        <span className="font-medium text-gray-900">
                          {accountDetails.accountName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Type:</span>
                        <span className="font-medium text-gray-900">
                          {accountDetails.accountType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Balance:</span>
                        <span className="font-medium text-green-700">
                          {formatCurrency(accountDetails.balance)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-2 mb-2 text-sm">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h3 className="font-semibold text-red-900">
                        Account Not Eligible
                      </h3>
                    </div>
                    <p className=" text-red-800">{accountDetails.reason}</p>
                  </div>
                )}
              </div>
            )}

            {/* Account Alias */}
            {accountDetails?.isEligible && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Nickname (Optional)
                </label>
                <input
                  type="text"
                  value={accountAlias}
                  onChange={(e) => setAccountAlias(e.target.value.slice(0, 20))}
                  className="form-input  !py-3 text-sm"
                  placeholder="e.g., Business Account, Emergency Fund"
                  maxLength={20}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Give this account a memorable name ({accountAlias.length}
                  /20)
                </p>
              </div>
            )}

            {/* Continue Button */}

            <DashboardBtn
              cta={"Continue to Verification"}
              className=" py-4"
              onClick={handleNext}
              disabled={!accountDetails?.isEligible}
            />
          </div>
        )}

        {/* Step 2: PIN Verification */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-800" />
              </div>
              <h3 className="text-lg font-semibold text-[#0a2e16] mb-2">
                Verify Account Ownership
              </h3>
              <p className="text-gray-600">
                Enter your 4-digit transaction PIN for account ****
                {accountDetails?.accountNumber.slice(-4)}
              </p>
            </div>

            {/* Account Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0a2e16]">
                    {accountAlias || accountDetails?.accountType}
                  </p>
                  <p className="text-sm text-gray-600">
                    ****{accountDetails?.accountNumber.slice(-4)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#0a2e16]">
                    {formatCurrency(accountDetails?.balance)}
                  </p>
                  <p className="text-xs text-gray-500">Available Balance</p>
                </div>
              </div>
            </div>

            {/* PIN Input */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-[#0a2e16]">
                  Transaction PIN
                </label>
                <button
                  onClick={() => setShowPin(!showPin)}
                  className="text-sm text-[#0a2e16] hover:underline flex items-center space-x-1"
                >
                  {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span>{showPin ? "Hide" : "Show"}</span>
                </button>
              </div>
              <div className="flex justify-center space-x-2">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    id={`pin-${index}`}
                    type={showPin ? "number" : "password"}
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:border-[#0a2e16]"
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <button className="text-sm text-blue-800 hover:underline">
                Forgot your PIN?
              </button>
            </div>
            <div className="flex space-x-3">
              <DashboardBtn
                cta={"Back"}
                className="py-3 basis-1/2"
                onClick={() => setCurrentStep(1)}
                variant="outline"
                disabled={isProcessing}
                showYellowDot={false}
              />
              <DashboardBtn
                cta="Verify PIN"
                className="py-3 basis-1/2"
                onClick={handleNext}
                disabled={!isPinComplete}
              />
            </div>
          </div>
        )}

        {/* Step 3: OTP Verification */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-800" />
              </div>
              <h3 className="text-lg font-semibold text-[#0a2e16] mb-2">
                Final Verification
              </h3>
              <p className="text-gray-600 text-sm">
                Enter the 6-digit OTP sent to your registered phone number for
                account linking
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter OTP
              </label>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="number"
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(index, e.target.value, otp, setOtp)
                    }
                    className="w-12 h-12 text-[#0a2e16] text-center text-lg font-bold border border-gray-300 rounded-lg focus:border-[#0a2e16]"
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <button className="text-sm text-blue-800 hover:underline">
                Didn't receive OTP? Resend
              </button>
            </div>

            <div className="flex space-x-3">
              <DashboardBtn
                cta={"Back"}
                className="py-3 basis-1/2"
                onClick={() => setCurrentStep(2)}
                variant="outline"
                disabled={isProcessing}
                showYellowDot={false}
              />
              <DashboardBtn
                cta={isProcessing ? "Linking Account..." : "Link Account"}
                className="py-3 basis-1/2"
                onClick={handleNext}
                disabled={!isOtpComplete || isProcessing}
              />
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {currentStep === 4 && (
          <div className="text-center space-y-5">
            <div className="w-18 h-18 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700">
                Account Linked Successfully!
              </h3>
              <p className="text-gray-600 text-sm">
                Your new account is now connected to your wallet
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Name:</span>
                <span className="font-medium text-gray-900">
                  {accountAlias || accountDetails?.accountType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Number:</span>
                <span className=" text-sm text-gray-800">
                  ****{accountDetails?.accountNumber.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Type:</span>
                <span className="font-medium text-gray-900">
                  {accountDetails?.accountType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Balance:</span>
                <span className="font-bold text-[#0a2e16]">
                  {formatCurrency(accountDetails?.balance)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  Linked & Active
                </span>
              </div>
              <p className="mt-1 text-xs text-start text-blue-900 font-medium">
                You can now fund your wallet from this account and Withdraw to
                this account anytime
              </p>
            </div>

            <div className="space-y-3">
              <DashboardBtn
                cta="Back to Wallet"
                onClick={handleClose}
                className="py-4 text-lg"
              />
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Shield size={16} />
                <span>Secured by Vestora's treasury system</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default LinkAccountModal;
