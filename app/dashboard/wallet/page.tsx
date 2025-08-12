"use client";
import React, { useState } from "react";
import { Plus, Minus, CreditCard, Shield, Settings, Users } from "lucide-react";
import DashboardContainer from "@/app/components/ui/DashboardContainer";
import {
  walletData,
  linkedAccounts,
  recentTransactions,
} from "@/app/utils/dummy";
import { DashboardBtn } from "@/app/components/ui/Button";
import EmptyState, { DetailCards } from "./EmptyState";
import { FiCreditCard } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import DynamicTable from "@/app/components/ui/DynamicTable";
import { walletColumn } from "@/app/utils/TableData";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/app/utils/Functions";
import AddFundsModal from "./AddFundsModal ";
import WithdrawFundsModal from "./WithdrawFundsModal";
import LinkAccountModal from "./LinkAccountModal";
import AutoTopupModal from "./AutoTopUpModel";

const WalletPage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);

  const router = useRouter();

  const hasBalance = walletData.totalBalance > 0;

  return (
    <DashboardContainer activeItem="wallet">
      <div className="min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#002C6C]">My Wallet</h1>
            <p className="text-sm text-gray-600">
              Manage your treasury investment wallet. View balance funding
              options.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#FFD100]" />
              <span className="text-sm font-medium text-[#002C6C]">
                KYC Verified
              </span>
            </div>
          </div>
        </header>

        <div className="mt-8">
          {hasBalance ? (
            <>
              {/* Wallet Balance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <DetailCards
                  Icon={FiCreditCard}
                  title="Total Wallet Balance"
                  value={walletData.totalBalance}
                  showBalance={showBalance}
                  setShowBalance={setShowBalance}
                  text={"Available for Withdrawals"}
                  walletBalance
                />

                <DetailCards
                  Icon={HiOutlineRefresh}
                  title="Pending Transfers"
                  value={walletData.pendingTransfers}
                  showBalance={showBalance}
                  setShowBalance={setShowBalance}
                  text={"Transfers in progress"}
                />
                <DetailCards
                  Icon={FiCreditCard}
                  title="Withdrawable Balance"
                  value={walletData.withdrawableBalance}
                  showBalance={showBalance}
                  setShowBalance={setShowBalance}
                  text={"Ready for withdrawal"}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  className="flex bg-[#002C6C] items-center space-x-2 px-6 py-3 rounded-lg font-medium text-white transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Funds</span>
                </button>
                <button
                  className="flex border-[#002C6C] text-[#002C6C] items-center space-x-2 bg-white border-2 px-6 py-3 rounded-lg font-medium transition-colors hover:bg-gray-50"
                  onClick={() => setIsWithdrawModalOpen(true)}
                >
                  <Minus className="w-5 h-5" />
                  <span>Withdraw</span>
                </button>
                <button
                  className="flex items-center space-x-2 bg-white border border-gray-300 px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsLinkModalOpen(true)}
                >
                  <Users className="w-5 h-5" />
                  <span>Link New Account</span>
                </button>
                <button
                  className="flex items-center space-x-2 bg-white border border-gray-300 px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsTopUpModalOpen(true)}
                >
                  <Settings className="w-5 h-5" />
                  <span>Auto Top-up</span>
                </button>
              </div>

              {/* Quick Stats & Limits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Wallet Limits */}
                <div className="bg-white rounded shadow  border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-[#002C6C] mb-4">
                    Wallet Limits
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          Daily Limit
                        </span>
                        <span className="text-sm font-medium">
                          {formatCurrency(walletData.usedDaily)} /{" "}
                          {formatCurrency(walletData.dailyLimit)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${
                              (walletData.usedDaily / walletData.dailyLimit) *
                              100
                            }%`,
                            backgroundColor: "#002C6C",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          Monthly Limit
                        </span>
                        <span className="text-sm font-medium">
                          {formatCurrency(walletData.usedMonthly)} /{" "}
                          {formatCurrency(walletData.monthlyLimit)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${
                              (walletData.usedMonthly /
                                walletData.monthlyLimit) *
                              100
                            }%`,
                            backgroundColor: "#FFD100",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="bg-white rounded shadow  border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-[#002C6C] mb-4">
                    Investment Funding Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total Funded
                      </span>
                      <span className="font-medium text-green-700">
                        {formatCurrency(3500000)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total Invested
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "#002C6C" }}
                      >
                        {formatCurrency(1050000)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Liquid Balance
                      </span>
                      <span className="font-medium text-gray-800">
                        {formatCurrency(2450000)}
                      </span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-800">
                          Investment Rate
                        </span>
                        <span className="font-bold text-blue-600">30%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Linked Accounts */}
              <div className="bg-white rounded shadow  border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-[#002C6C] mb-4">
                  Linked FirstBank Accounts
                </h3>
                <div className="space-y-3">
                  {linkedAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#002C6C" }}
                        >
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">
                              {account.name}
                            </span>
                            {account.isPrimary && (
                              <span
                                className="px-2 py-1 text-xs rounded-full text-white"
                                style={{
                                  backgroundColor: "#FFD100",
                                  color: "#002C6C",
                                }}
                              >
                                Primary
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-600">
                            ****{account.number.slice(-4)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-800">
                          {formatCurrency(account.balance)}
                        </div>
                        <div className="text-sm text-gray-600">Available</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded shadow  border border-gray-200 p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#002C6C]">
                      Recent Transactions
                    </h3>

                    <DashboardBtn
                      cta="View All"
                      onClick={() => router.push("/dashboard/transactions")}
                      className="max-w-[150px]"
                    />
                  </div>
                </div>

                <DynamicTable
                  columns={walletColumn}
                  data={recentTransactions}
                />
              </div>
              <AddFundsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
              <WithdrawFundsModal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
              />
              <LinkAccountModal
                isOpen={isLinkModalOpen}
                onClose={() => setIsLinkModalOpen(false)}
              />
              <AutoTopupModal
                isOpen={isTopUpModalOpen}
                onClose={() => setIsTopUpModalOpen(false)}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </DashboardContainer>
  );
};

export default WalletPage;
