"use client";
import React from "react";

import LeftSide from "../components/LeftSide";
import VestoraNTBOnboarding from "../components/VestoraNTBOnboarding";

const page = () => {
  return (
    <div className="min-h-screen flex bg-white">
      <LeftSide />

      <div className="flex-1 min-h-screen overflow-y-auto bg-white lg:border-l border-gray-100">
        <VestoraNTBOnboarding />
      </div>
    </div>
  );
};

export default page;
