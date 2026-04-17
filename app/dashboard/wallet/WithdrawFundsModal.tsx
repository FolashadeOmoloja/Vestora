"use client";
import React, { useState } from "react";
import {
  Minus,
  CheckCircle,
  Download,
  Shield,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import {
  formatCurrency,
  handleAmountChange,
  handleOtpChange,
} from "@/app/utils/Functions";
import { linkedType } from "@/app/utils/dummy";
import ModalContainer from "@/app/components/ui/ModalContainer";
import AccountSelection from "./AccountSelection";
import { DashboardBtn } from "@/app/components/ui/Button";

const WithdrawFundsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Amount, 2: Confirm, 3: OTP, 4: Success
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<linkedType | null>(
    null
  );
  const [note, setNote] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample wallet data
  const walletData = {
    withdrawableBalance: 2450000,
    totalBalance: 2500000,
    pendingTransfers: 50000,
  };

  const handleNext = () => {
    if (currentStep === 1 && amount) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedAccount) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setIsProcessing(true);
      // Simulate OTP verification
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(4);
      }, 300);
    } else if (currentStep === 4) {
      setIsProcessing(true);
      // Simulate OTP verification
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(5);
      }, 300);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setAmount("");
    setSelectedAccount(null);
    setNote("");
    setOtp(["", "", "", "", "", ""]);
    setIsProcessing(false);
    onClose();
  };

  const isAmountValid =
    amount &&
    parseInt(amount) >= 1000 &&
    parseInt(amount) <= walletData.withdrawableBalance;
  const isOtpComplete = otp.every((digit) => digit !== "");

  if (!isOpen) return null;

  return (
    <ModalContainer
      handleClose={handleClose}
      Icon={<Minus className="text-[#0a2e16]" size={24} />}
      heading={"Withdraw from Wallet"}
      text="Transfer to your Vestora account"
    >
      <div className="p-6">
        {/* Step 1: Amount and Account Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Wallet Balance Info */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <Wallet className="w-5 h-5 text-[#0a2e16]" />
                <h3 className="font-semibold text-[#0a2e16]">Wallet Balance</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Balance</p>
                  <p className="font-bold text-gray-900">
                    {formatCurrency(walletData.totalBalance)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Available to Withdraw</p>
                  <p className="font-bold text-gray-900">
                    {formatCurrency(walletData.withdrawableBalance)}
                  </p>
                </div>
              </div>
              {walletData.pendingTransfers > 0 && (
                <div className="mt-2 text-xs text-yellow-700">
                  ₦{walletData.pendingTransfers.toLocaleString()} in pending
                  transfers
                </div>
              )}
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Withdraw
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  ₦
                </span>
                <input
                  type="text"
                  value={amount ? parseInt(amount).toLocaleString() : ""}
                  onChange={(e) => handleAmountChange(e, setAmount)}
                  className="form-input  !pl-8 !py-3 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">Minimum: ₦1,000</p>
                <button
                  onClick={() =>
                    setAmount(walletData.withdrawableBalance.toString())
                  }
                  className="text-xs font-semibold text-[#0a2e16] hover:underline"
                >
                  Withdraw All
                </button>
              </div>
              {amount && parseInt(amount) > walletData.withdrawableBalance && (
                <p className="text-xs text-red-600 mt-1">
                  Amount exceeds withdrawable balance
                </p>
              )}
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Quick amounts
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[10000, 50000, 100000, 250000, 500000, 1000000]
                  .filter(
                    (quickAmount) =>
                      quickAmount <= walletData.withdrawableBalance
                  )
                  .map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="py-2 px-3 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      ₦{quickAmount.toLocaleString()}
                    </button>
                  ))}
              </div>
            </div>
            {/*Continue */}
            <DashboardBtn
              cta={"Continue"}
              className=" py-4"
              onClick={handleNext}
              disabled={!isAmountValid}
            />
          </div>
        )}
        {/* Step 2: Confirmation */}
        {currentStep == 2 && (
          <div className="space-y-6">
            {/* Account Selection */}
            <AccountSelection
              label={"Select Destination Account"}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
            />

            {/* Optional Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="form-input rounded-lg resize-none"
                rows={3}
                maxLength={100}
                placeholder="Add a note for this withdrawal..."
              />
              <p className="text-xs text-gray-500 mt-1">
                {note.length}/100 characters
              </p>
            </div>
            <div className="flex space-x-3">
              <DashboardBtn
                cta={"Back"}
                className="py-3 basis-1/2"
                onClick={() => setCurrentStep(1)}
                variant="outline"
                showYellowDot={false}
              />
              <DashboardBtn
                cta={"Next"}
                className="py-3 basis-1/2"
                onClick={handleNext}
                disabled={!selectedAccount}
              />
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">
                Withdrawal Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(parseInt(amount))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium text-gray-900">My Wallet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium text-gray-900">
                    {selectedAccount?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account:</span>
                  <span className="font-medium text-gray-900">
                    ****{selectedAccount?.number.slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee:</span>
                  <span className="font-medium text-green-700">Free</span>
                </div>
                {note && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Note:</span>
                    <span className="font-medium text-gray-900 text-right max-w-48 truncate">
                      {note}
                    </span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">
                      You'll Receive:
                    </span>
                    <span className="font-bold text-[#0a2e16]">
                      {formatCurrency(parseInt(amount))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-yellow-800 font-medium">Withdrawal Notice</p>
                <p className="text-yellow-700 text-xs">
                  Funds will be processed within 24 hours. This action cannot be
                  reversed once confirmed.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-900">
              <p>
                <strong>Processing Time:</strong> Instant to your Vestora
                account, up to 24 hours for verification.
              </p>
            </div>
            <div className="flex space-x-3">
              <DashboardBtn
                cta={"Back"}
                className="py-3 basis-1/2"
                onClick={() => setCurrentStep(2)}
                variant="outline"
                showYellowDot={false}
              />
              <DashboardBtn
                cta={"Confirm Withdrawal"}
                className="py-3 basis-1/2"
                onClick={handleNext}
              />
            </div>
          </div>
        )}

        {/* Step 4: OTP Verification */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-800" />
              </div>
              <h3 className="text-lg font-semibold text-[#0a2e16] mb-2">
                Authorize Withdrawal
              </h3>
              <p className="text-gray-600 text-sm">
                Enter the 6-digit OTP sent to your registered phone number
                ending in ****{selectedAccount?.number.slice(-4)}
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
                onClick={() => setCurrentStep(3)}
                variant="outline"
                disabled={isProcessing}
                showYellowDot={false}
              />
              <DashboardBtn
                cta={isProcessing ? "Processing..." : "Authorize Withdrawal"}
                className="py-3 basis-1/2"
                onClick={handleNext}
                disabled={!isOtpComplete || isProcessing}
              />
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {currentStep === 5 && (
          <div className="text-center space-y-5">
            <div className="w-18 h-18 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700">
                Withdrawal Successful!
              </h3>
              <p className="text-gray-600 text-sm">
                Your withdrawal request has been processed
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Withdrawn:</span>
                <span className="font-bold text-[#0a2e16] text-base">
                  {formatCurrency(parseInt(amount))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">To Account:</span>
                <span className="font-medium">{selectedAccount?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Number:</span>
                <span className="text-sm text-gray-800">
                  ****{selectedAccount?.number.slice(-4)}
                </span>
              </div>
              {note && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Note:</span>
                  <span className="font-medium text-sm text-gray-800 max-w-32 truncate">
                    {note}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="text-sm text-gray-800">
                  WDR-{Date.now().toString().slice(-8)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                  Processing
                </span>
              </div>

              <p className="mt-1 text-xs text-start text-blue-900 font-medium">
                <strong>Expected Credit Time:</strong> Funds will reflect in
                your account within 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full border border-[#0a2e16] text-[#0a2e16] py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
                <Download size={16} />
                <span>Download Receipt</span>
              </button>

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
export default WithdrawFundsModal;
