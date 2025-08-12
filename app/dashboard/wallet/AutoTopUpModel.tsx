"use client";
import React, { useState } from "react";
import {
  X,
  Settings,
  CheckCircle,
  Download,
  ArrowRight,
  Shield,
  AlertTriangle,
  Calendar,
  Zap,
  CreditCard,
  Info,
} from "lucide-react";
import { formatCurrency, handleOtpChange } from "@/app/utils/Functions";
import ModalContainer from "@/app/components/ui/ModalContainer";
import AccountSelection from "./AccountSelection";
import { linkedType } from "@/app/utils/dummy";
import { TopUpSelectionCards } from "./EmptyState";
import { DashboardBtn } from "@/app/components/ui/Button";

const AutoTopupModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Setup, 2: Confirm, 3: OTP, 4: Success
  const [topupType, setTopupType] = useState("threshold"); // 'threshold' or 'scheduled'
  const [thresholdAmount, setThresholdAmount] = useState("");
  const [topupAmount, setTopupAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<linkedType | null>(
    null
  );
  const [scheduledDay, setScheduledDay] = useState("1");
  const [scheduledAmount, setScheduledAmount] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [maxTopupLimit, setMaxTopupLimit] = useState("");

  // Current wallet balance for demo
  const currentWalletBalance = 2500000;

  const handleAmountChange = (setter: any) => (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setter(value);
  };

  const handleNext = () => {
    if (currentStep === 1 && isSetupValid()) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setIsProcessing(true);
      // Simulate setup completion
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(4);
      }, 300);
    }
  };

  const isSetupValid = () => {
    if (!selectedAccount) return false;

    if (topupType === "threshold") {
      return (
        thresholdAmount &&
        topupAmount &&
        parseInt(thresholdAmount) > 0 &&
        parseInt(topupAmount) >= 1000
      );
    } else {
      return scheduledAmount && parseInt(scheduledAmount) >= 1000;
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setTopupType("threshold");
    setThresholdAmount("");
    setTopupAmount("");
    setScheduledAmount("");
    setSelectedAccount(null);
    setScheduledDay("1");
    setMaxTopupLimit("");
    setOtp(["", "", "", "", "", ""]);
    setIsProcessing(false);
    onClose();
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  if (!isOpen) return null;

  return (
    <ModalContainer
      handleClose={handleClose}
      Icon={<Settings className="text-[#002C6C]" size={24} />}
      heading={"Auto Top-up Settings"}
      text="Never run out of wallet funds"
      scroll
    >
      <div className="p-6">
        {/* Step 1: Setup Configuration */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Current Balance Info */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] text-gray-900">
                    Current Wallet Balance
                  </p>
                  <p className="text-base font-bold text-[#002c6c]">
                    {formatCurrency(currentWalletBalance)}
                  </p>
                </div>
                <Zap className="w-5 h-5 text-[#002c6c]" />
              </div>
            </div>

            {/* Top-up Type Selection */}
            <div>
              <label className="block text-sm font-medium text-[#002c6c] mb-3">
                Auto Top-up Method
              </label>
              <div className="grid grid-cols-1 gap-3">
                <TopUpSelectionCards
                  onClick={() => setTopupType("threshold")}
                  topupTypeStr="threshold"
                  topupType={topupType}
                  heading={"Balance-Based Top-up"}
                  text={
                    "Automatically add funds when balance falls below set amount"
                  }
                />
                <TopUpSelectionCards
                  onClick={() => setTopupType("scheduled")}
                  topupTypeStr="scheduled"
                  topupType={topupType}
                  heading={"Scheduled Top-up"}
                  text={" Add a fixed amount on a specific day each month"}
                />
              </div>
            </div>

            {/* Threshold Configuration */}
            {topupType === "threshold" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#002c6c] mb-2">
                    Minimum Balance Threshold
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      ₦
                    </span>
                    <input
                      type="text"
                      value={
                        thresholdAmount
                          ? parseInt(thresholdAmount).toLocaleString()
                          : ""
                      }
                      onChange={handleAmountChange(setThresholdAmount)}
                      className="form-input  !pl-8 !py-3 text-sm"
                      placeholder="50,000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    When your balance drops below this amount, auto top-up will
                    trigger
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#002c6c] mb-2">
                    Top-up Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      ₦
                    </span>
                    <input
                      type="text"
                      value={
                        topupAmount
                          ? parseInt(topupAmount).toLocaleString()
                          : ""
                      }
                      onChange={handleAmountChange(setTopupAmount)}
                      className="form-input  !pl-8 !py-3 text-sm"
                      placeholder="100,000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This amount will be added to your wallet (Minimum: ₦1,000)
                  </p>
                </div>
              </div>
            )}

            {/* Scheduled Configuration */}
            {topupType === "scheduled" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#002c6c] mb-2">
                      Day of Month
                    </label>
                    <select
                      value={scheduledDay}
                      onChange={(e) => setScheduledDay(e.target.value)}
                      className="form-input  !py-[13px] text-sm"
                    >
                      {Array.from({ length: 28 }, (_, i) => i + 1).map(
                        (day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#002c6c] mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        ₦
                      </span>
                      <input
                        type="text"
                        value={
                          scheduledAmount
                            ? parseInt(scheduledAmount).toLocaleString()
                            : ""
                        }
                        onChange={handleAmountChange(setScheduledAmount)}
                        className="form-input  !pl-8 !py-3 text-sm"
                        placeholder="100,000"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Calendar className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-800">
                    Funds will be automatically added on the {scheduledDay}
                    {scheduledDay === "1"
                      ? "st"
                      : scheduledDay === "2"
                      ? "nd"
                      : scheduledDay === "3"
                      ? "rd"
                      : "th"}{" "}
                    day of each month
                  </p>
                </div>
              </div>
            )}

            {/* Monthly Limit */}
            <div>
              <label className="block text-sm font-medium text-[#002c6c] mb-2">
                Monthly Top-up Limit (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  ₦
                </span>
                <input
                  type="text"
                  value={
                    maxTopupLimit
                      ? parseInt(maxTopupLimit).toLocaleString()
                      : ""
                  }
                  onChange={handleAmountChange(setMaxTopupLimit)}
                  className="form-input  !pl-8 !py-3 text-sm"
                  placeholder="500,000"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Maximum amount that can be auto-topped up per month
              </p>
            </div>

            {/* Source Account Selection */}
            <AccountSelection
              label={"Funding Source Account"}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
            />

            {/* Important Notice */}
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <p className="text-blue-900 font-medium mb-1">
                  Important Information
                </p>
                <ul className="text-blue-900 space-y-1 list-disc list-inside">
                  <li>Auto top-up can be paused or cancelled anytime</li>
                  <li>You'll receive SMS notifications for each transaction</li>
                  <li>Ensure sufficient balance in your source account</li>
                  <li>Failed top-ups will be retried after 24 hours</li>
                </ul>
              </div>
            </div>

            {/* Continue Button */}
            <DashboardBtn
              cta={"Review Settings"}
              className=" py-4"
              onClick={handleNext}
              disabled={!isSetupValid()}
            />
          </div>
        )}

        {/* Step 2: Confirmation */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">
                Auto Top-up Configuration
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-medium text-gray-900">
                    {topupType === "threshold"
                      ? "Balance-Based"
                      : "Scheduled Monthly"}
                  </span>
                </div>

                {topupType === "threshold" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Trigger when balance below:
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(parseInt(thresholdAmount))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Top-up amount:</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(parseInt(topupAmount))}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Schedule:</span>
                      <span className="font-medium text-gray-900">
                        {scheduledDay}
                        {scheduledDay === "1"
                          ? "st"
                          : scheduledDay === "2"
                          ? "nd"
                          : scheduledDay === "3"
                          ? "rd"
                          : "th"}{" "}
                        of each month
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly amount:</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(parseInt(scheduledAmount))}
                      </span>
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Source account:</span>
                  <span className="font-medium text-gray-900">
                    {selectedAccount?.name}
                  </span>
                </div>

                {maxTopupLimit && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly limit:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(parseInt(maxTopupLimit))}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <p className="text-yellow-800 font-medium">
                  Confirm Auto Top-up Setup
                </p>
                <p className="text-yellow-700">
                  Once activated, the system will automatically transfer funds
                  based on your settings. You can modify or disable this
                  anytime.
                </p>
              </div>
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
                cta={" Activate Auto Top-up"}
                className="py-3 basis-1/2"
                onClick={handleNext}
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
              <h3 className="text-lg font-semibold text-[#002c6c] mb-2">
                Secure Activation
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
                    className="w-12 h-12 text-[#002c6c] text-center text-lg font-bold border border-gray-300 rounded-lg focus:border-[#002c6c]"
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
                cta={isProcessing ? "Activating..." : "Activate Now"}
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
              <h3 className="text-xl font-bold text-green-700 mb-2">
                Auto Top-up Activated!
              </h3>
              <p className="text-gray-600 text-sm">
                Your wallet will now be automatically funded
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Method:</span>
                <span className="font-bold text-[#002C6C]">
                  {topupType === "threshold"
                    ? "Balance-Based"
                    : "Scheduled Monthly"}
                </span>
              </div>

              {topupType === "threshold" ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trigger Balance:</span>
                    <span className="font-medium">
                      {formatCurrency(parseInt(thresholdAmount))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Top-up Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(parseInt(topupAmount))}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Next Top-up:</span>
                    <span className="font-medium">
                      {scheduledDay}
                      {scheduledDay === "1"
                        ? "st"
                        : scheduledDay === "2"
                        ? "nd"
                        : scheduledDay === "3"
                        ? "rd"
                        : "th"}{" "}
                      of next month
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(parseInt(scheduledAmount))}
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Source Account:</span>
                <span className="font-medium">{selectedAccount?.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <DashboardBtn
                cta="Back to Wallet"
                onClick={handleClose}
                className="py-4 text-lg"
              />
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Shield size={16} />
                <span>Secured by FirstBank's treasury system</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default AutoTopupModal;
