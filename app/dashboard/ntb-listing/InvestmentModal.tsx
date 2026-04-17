"use client";
import React, { useState } from "react";
import {
  X,
  TrendingUp,
  DollarSign,
  Shield,
  CheckCircle,
  Download,
} from "lucide-react";
import { DashboardBtn } from "@/app/components/ui/Button";
import { investDest } from "@/app/utils/TableData";
import ModalContainer from "@/app/components/ui/ModalContainer";

export default function InvestmentModal({
  onClose,
  investmentDetails,
  backdrop = "bg-black/60 backdrop-blur-sm",
}: {
  onClose: () => void;
  investmentDetails: investDest;
  backdrop?: string;
}) {
  const [amount, setAmount] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState(false);
  const [autoRollover, setAutoRollover] = useState(false);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setSuccess(true);
    }, 1500);
  };

  const estimatedInterest = () => {
    const rate = parseInt(investmentDetails.rate) / 100; // 17.25%
    const duration = parseInt(investmentDetails.tenor);
    const amt = parseInt(amount || "0");
    return (amt * rate * (duration / 365)).toFixed(2).toLocaleString();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ModalContainer
      handleClose={onClose}
      Icon={<TrendingUp className="text-[#0a2e16]" size={24} />}
      heading={"Treasury Bill Investment"}
      text="Secure your financial future"
      backdrop={backdrop}
    >
      <div className="p-6">
        {!success ? (
          <>
            {/* Investment Details Display */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-[#0a2e16] mb-3">
                Investment Details
              </h3>
              <ul className="text-xs text-[#0a2e16] space-y-1">
                <li>
                  <strong>Offer:</strong> {investmentDetails.code}
                </li>
                <li>
                  <strong>Rate:</strong> {investmentDetails.rate}
                </li>
                <li>
                  <strong>Settlement Date:</strong>{" "}
                  {investmentDetails.settlement}
                </li>
                <li>
                  <strong>Maturity Date:</strong> {investmentDetails.maturity}
                </li>
                <li>
                  <strong>Minimum Amount:</strong> ₦
                  {investmentDetails.minInvestment.toLocaleString()}
                </li>
              </ul>
            </div>

            {/* Investment Form */}
            <div className="space-y-5">
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-[#0a2e16]">
                  <DollarSign size={16} />
                  <span className="">Investment Amount</span>
                  <span className="text-xs text-gray-500 font-normal">
                    (Minimum: ₦
                    {investmentDetails.minInvestment.toLocaleString()})
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-input  !pl-8  text-sm"
                    placeholder="0"
                    min={investmentDetails.minInvestment}
                  />
                </div>
                {amount &&
                  parseInt(amount) <
                    parseInt(investmentDetails.minInvestment) && (
                    <p className="text-xs text-red-600">
                      Amount must be at least ₦{investmentDetails.minInvestment}
                    </p>
                  )}
              </div>

              {/* Interest Calculation */}
              {amount &&
                parseInt(amount) >=
                  parseInt(investmentDetails.minInvestment) && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-green-800">
                          Estimated Return: ₦{estimatedInterest()}
                        </p>
                        <p className="text-xs text-green-600">
                          On {formatCurrency(parseInt(amount))} over{" "}
                          {investmentDetails.tenor} at {investmentDetails.rate}{" "}
                          p.a.
                        </p>
                      </div>
                      <div className="bg-green-100 p-2 rounded-full">
                        <TrendingUp className="text-green-700" size={20} />
                      </div>
                    </div>
                  </div>
                )}

              {/* Auto Rollover */}
              <div className="bg-gray-50 rounded-xl p-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRollover}
                    onChange={() => setAutoRollover(!autoRollover)}
                    className=" w-4 h-4 text-[#0a2e16] border-2 border-gray-300 rounded  accent-[#0a2e16]"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-700">
                      Auto-rollover at maturity
                    </span>
                    <p className="text-xs text-gray-500">
                      Automatically reinvest when the investment matures
                    </p>
                  </div>
                </label>
              </div>

              {/* Confirm Button */}
              <DashboardBtn
                cta={
                  confirming ? "Processing Investment" : "Confirm Investment"
                }
                loading={confirming}
                disabled={confirming}
                onClick={handleConfirm}
                className="mb-2"
              />

              {/* Security Notice */}
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Shield size={14} className="text-[#0a2e16]" />
                <span>Secured by Vestora's treasury system</span>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-4">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                Investment Successful!
              </h3>
              <p className="text-gray-600">
                Your investment has been processed successfully
              </p>
            </div>

            {/* Investment Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left text-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Invested:</span>
                  <span className="font-semibold">
                    {formatCurrency(parseInt(amount))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Period:</span>
                  <span className="font-semibold">
                    {investmentDetails.tenor}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Returns:</span>
                  <span className="font-semibold text-green-700">
                    ₦{estimatedInterest()}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Total at Maturity:</span>
                  <span className="font-bold text-base">
                    {formatCurrency(
                      parseInt(amount) +
                        parseInt(estimatedInterest().replace(/,/g, ""))
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <DashboardBtn
                cta="Download Proof of Investment"
                variant="outline"
                showYellowDot={false}
                icon={<Download size={18} />}
              />
              <DashboardBtn cta="Go to Dashboard" onClick={onClose} />
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
