"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaShieldAlt,
  FaFileDownload,
  FaExchangeAlt,
  FaChartLine,
} from "react-icons/fa";

export default function FirstBankCTA() {
  const [invest, showInvest] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#002C6C] text-white font-sans">
      {invest ? (
        <section id="landing" className="bg-white text-[#002C6C]">
          {/* Navbar */}
          <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
            <div className="text-2xl font-bold">
              FirstBank <span className="text-[#FFD100]">Treasury </span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium">
              <a href="#">Home</a>
              <a href="#">Products</a>
              <a href="#">About</a>
              <a href="#">Support</a>
            </div>
            <div className="flex gap-4">
              <button className="text-[#002C6C]">Log In</button>
              <button
                className="bg-[#002C6C] text-white px-4 py-2 rounded"
                onClick={() => router.push("/onboarding")}
              >
                Sign Up
              </button>
            </div>
          </nav>

          {/* Hero */}
          <section className=" p-20 flex items-center justify-between">
            <div className="">
              <h2 className="text-6xl leading-[1.2] tracking-tight max-w-xl font-bold mb-4">
                Invest in Treasury Bills with Ease
              </h2>
              <p className="text-lg max-w-2xl mx-auto mb-8">
                A secure digital platform to access Nigerian Treasury Bills.
                Backed by FirstBank, simplified by technology.
              </p>
              <div className="space-x-4">
                <button className="bg-[#002C6C] cursor-pointer text-white px-4 py-3 rounded">
                  Download on Playstore
                </button>
                <button className="bg-[#002C6C] cursor-pointer text-white px-4 py-3 rounded">
                  Download on App Store
                </button>
              </div>
            </div>
            <div>
              <img src="/invest2.avif" alt="" />
            </div>
          </section>

          {/* Info Section */}
          <section className="bg-[#E5EDF4] px-6 py-16 text-center">
            <h3 className="text-5xl font-bold mb-4">
              What Are Treasury Bills?
            </h3>
            <p className="max-w-2xl mx-auto text-lg">
              Treasury Bills (NTBs) are short-term, risk-free government
              securities that allow you to earn fixed interest income. Ideal for
              low-risk investors looking for predictable returns and full
              capital protection.
            </p>
          </section>

          {/* Email Signup CTA */}
          <section className="p-20 flex justify-between items-center">
            <div className="">
              <img src="/invest.avif" alt="" />
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-4">Get Started Today</h4>
              <p className="mb-6 text-lg">
                Enter your email to log in or create an account instantly
              </p>
              <div className="flex justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-md w-88"
                />
                <button className="bg-[#002C6C] text-white px-6 py-2 rounded">
                  Continue
                </button>
              </div>
            </div>
          </section>
          {/* Benefits Section */}
          <section className="py-20 px-6 bg-[#F9FAFB]">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-semibold text-center mb-12">
                Why Use Our Treasury App?
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="text-center">
                  <FaShieldAlt className="text-4xl text-[#FFD100] mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Secure & Reliable</h4>
                  <p className="text-sm text-gray-700">
                    Built on FirstBank’s trusted infrastructure and protected
                    with enterprise-grade security.
                  </p>
                </div>
                <div className="text-center">
                  <FaFileDownload className="text-4xl text-[#FFD100] mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Proof of Investment</h4>
                  <p className="text-sm text-gray-700">
                    Instantly download your First Bank-branded Proof of
                    Investment (POI) upon purchase.
                  </p>
                </div>
                <div className="text-center">
                  <FaExchangeAlt className="text-4xl text-[#FFD100] mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Easy Liquidation</h4>
                  <p className="text-sm text-gray-700">
                    Easily request early liquidation and receive alerts once
                    approved by the treasury desk.
                  </p>
                </div>
                <div className="text-center">
                  <FaChartLine className="text-4xl text-[#FFD100] mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Maturity Tracking</h4>
                  <p className="text-sm text-gray-700">
                    Stay updated with maturity dates, interest forecasts, and
                    reinvestment options.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="px-6 py-16">
            <h5 className="text-2xl font-bold mb-8 text-center">FAQs</h5>
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h6 className="font-semibold">Is my investment safe?</h6>
                <p>
                  Yes. Treasury Bills are backed by the Federal Government of
                  Nigeria.
                </p>
              </div>
              <div>
                <h6 className="font-semibold">
                  Can I access this if I don’t have a FirstBank account?
                </h6>
                <p>
                  This service is currently for FirstBank account holders only.
                </p>
              </div>
              <div>
                <h6 className="font-semibold">What happens at maturity?</h6>
                <p>
                  You’ll receive both your capital and interest directly in your
                  linked bank account.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#002C6C] text-white text-center py-6">
            <p>
              &copy; {new Date().getFullYear()} FirstBank. All rights reserved.
            </p>
          </footer>
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center py-20 bg-[#002C6C] text-center w-full min-h-screen">
          <h1 className="text-4xl font-bold mb-4">
            Secure Your Future with Treasury Bills
          </h1>
          <p className="text-lg mb-6 max-w-xl">
            Invest in government-backed securities — safe, stable, and fully
            digital.
          </p>
          <button
            onClick={() => showInvest(true)}
            className="bg-[#FDB913] text-[#002C6C] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400"
          >
            Invest in Treasury Bills
          </button>
        </section>
      )}
    </div>
  );
}
