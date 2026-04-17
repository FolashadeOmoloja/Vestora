"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What investment products does Vestora offer?",
    a: "Vestora offers Treasury Bills, Mutual Funds, Stocks (NSE-listed), ETFs, Bonds, and Fixed Deposits — all accessible from a single platform.",
  },
  {
    q: "How secure are my investments?",
    a: "Investments are secured by Vestora's enterprise infrastructure, backed by the Federal Government of Nigeria (for T-Bills and Bonds), and NDIC-protected where applicable.",
  },
  {
    q: "What is the minimum investment amount?",
    a: "Minimum varies by product: ₦1,000 for stocks, ₦5,000 for mutual funds, ₦10,000 for T-Bills, and ₦50,000 for bonds.",
  },
  {
    q: "Can I invest in stocks directly?",
    a: "Yes. Vestora gives you direct access to NSE-listed equities. You can buy and sell shares of top Nigerian companies in real time.",
  },
  {
    q: "Can I liquidate my investment early?",
    a: "Stocks and ETFs can be sold anytime markets are open. T-Bills and bonds support early liquidation requests, which are reviewed by the treasury desk within 48 hours.",
  },
  {
    q: "How are returns paid out?",
    a: "Returns are credited to your Vestora wallet at maturity or on dividend dates. You can withdraw to any Nigerian bank account instantly.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#f4f8f5] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#e8f5ed] text-[#1a5c2e] text-xs font-medium px-3 py-1 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-[#0a2e16] text-3xl font-semibold mb-3">
            Frequently asked questions
          </h2>
          <p className="text-gray-500 text-base">
            Everything you need to know before you invest
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-[#f9fdfb] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[#0a2e16] text-sm font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-[#3db86a] shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-50">
                  <div className="pt-3">{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
