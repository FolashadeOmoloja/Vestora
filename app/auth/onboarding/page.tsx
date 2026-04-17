"use client";
import React, { useState } from "react";

import OnboardingEntry from "../components/OnboardingEntry";
import LeftSide from "../components/LeftSide";
import VestoraNTBOnboarding from "../components/VestoraNTBOnboarding";
import BankAccountLinkingDemo from "../components/BankAccountLinking";

const page = () => {
  const [step, setStep] = useState("entry");
  return (
    <div className="min-h-screen flex bg-white">
      <LeftSide />

      <div className="flex-1 min-h-screen overflow-y-auto bg-white lg:border-l border-gray-100">
        {step === "entry" ? (
          <OnboardingEntry setStep={setStep} />
      ) : step === "vestora" ? (
        <VestoraNTBOnboarding />
        ) : step === "link_only" ? (
          <BankAccountLinkingDemo handleBack={() => setStep("entry")} />
        ) : null}
      </div>
    </div>
  );
};

export default page;
