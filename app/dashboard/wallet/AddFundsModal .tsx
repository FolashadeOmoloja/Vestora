import { useState } from "react";
import {
  CreditCard,
  Plus,
  CheckCircle,
  Download,
  Shield,
  AlertTriangle,
} from "lucide-react";
import {
  formatCurrency,
  handleAccountSelect,
  handleAmountChange,
  handleOtpChange,
} from "@/app/utils/Functions";
import { linkedAccounts, linkedType } from "@/app/utils/dummy";
import { DashboardBtn } from "@/app/components/ui/Button";
import ModalContainer from "@/app/components/ui/ModalContainer";

const AddFundsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<linkedType | null>(
    null
  );
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    if (currentStep === 1 && amount && selectedAccount) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setIsProcessing(true);
      // Simulate OTP verification
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(4);
      }, 300);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setAmount("");
    setSelectedAccount(null);
    setOtp(["", "", "", "", "", ""]);
    setIsProcessing(false);
    onClose();
  };

  const isAmountValid = amount && parseInt(amount) >= 1000;
  const isOtpComplete = otp.every((digit) => digit !== "");

  if (!isOpen) return null;

  return (
    <ModalContainer
      handleClose={handleClose}
      Icon={<Plus className="text-[#0a2e16]" size={24} />}
      heading={"Add Funds to Wallet"}
      text="Transfer from your Vestora account"
    >
      <div className="p-6">
        {/* Step 1: Amount Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-[#0a2e16] mb-2">
                Amount to Add
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
              <p className="text-xs text-gray-500 mt-1">
                Minimum amount: ₦1,000
              </p>
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <p className="text-sm font-medium text-[#0a2e16] mb-3">
                Quick amounts
              </p>
              <div className="grid grid-cols-3 gap-2 text-[#0a2e16]">
                {[100000, 500000, 1000000].map((quickAmount) => (
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

            {/* Account Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Source Account
              </label>
              <div className="space-y-2">
                {linkedAccounts.map((account) => (
                  <div
                    key={account.id}
                    onClick={() =>
                      handleAccountSelect(account, setSelectedAccount)
                    }
                    className={`p-3 border-[1.5px] rounded-lg cursor-pointer transition-all ${
                      selectedAccount?.id === account.id
                        ? "border-[#002b6c] "
                        : "border-gray-200 hover:border-[#002b6c]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#002b6c] rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {account.name}
                            </span>
                            {account.isPrimary && (
                              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            ****{account.number.slice(-4)} • {account.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatCurrency(account.balance)}
                        </p>
                        <p className="text-xs text-gray-500">Available</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Button */}

            <DashboardBtn
              cta={"Continue"}
              className=" py-4"
              onClick={handleNext}
              disabled={!isAmountValid || !selectedAccount}
            />
          </div>
        )}

        {/* Step 2: Confirmation */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">
                Transfer Summary
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
                  <span className="font-medium text-gray-900">
                    {selectedAccount?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium text-gray-900">My Wallet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fees:</span>
                  <span className="font-medium text-green-700">Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total:</span>
                    <span className="font-bold text-[#0a2e16]">
                      {formatCurrency(parseInt(amount))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-yellow-800 font-medium">
                  Please confirm the details
                </p>
                <p className="text-yellow-700">
                  This transfer will be processed immediately and cannot be
                  reversed.
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
                cta={"Confirm Transfer"}
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
              <h3 className="text-lg font-semibold text-[#0a2e16] mb-2">
                Verify Transaction
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
              <button className="text-sm text-blue-600 hover:underline">
                Didn't receive OTP? Resend
              </button>
            </div>

            <div className="flex space-x-3">
              <DashboardBtn
                cta={"Back"}
                className="py-3 basis-1/2"
                onClick={() => setCurrentStep(2)}
                disabled={isProcessing}
                variant="outline"
                showYellowDot={false}
              />
              <DashboardBtn
                cta={isProcessing ? "Verifying..." : "Verify & Transfer"}
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
                Transfer Successful!
              </h3>
              <p className="text-gray-600 text-sm">
                Your wallet has been funded successfully
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Added:</span>
                <span className="font-bold text-[#0a2e16] text-base">
                  {formatCurrency(parseInt(amount))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">From Account:</span>
                <span className="font-medium">{selectedAccount?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="text-sm text-gray-800">
                  TXN-{Date.now().toString().slice(-8)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  Completed
                </span>
              </div>
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

export default AddFundsModal;
