"use client";
import React, { useState } from "react";

import OnboardingEntry from "../components/OnboardingEntry";
import LeftSide from "../components/LeftSide";
import FirstBankNTBOnboarding from "../components/FirstBankNTBOnboarding";
import BankAccountLinkingDemo from "../components/BankAccountLinking";

const page = () => {
  const [step, setStep] = useState("entry");
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Creative Design */}
      <LeftSide />

      {/* Right Side - Login Form */}
      {step === "entry" ? (
        <OnboardingEntry setStep={setStep} />
      ) : step === "firstbank" ? (
        <FirstBankNTBOnboarding />
      ) : step === "link_only" ? (
        <BankAccountLinkingDemo />
      ) : null}
    </div>
  );
};

export default page;
