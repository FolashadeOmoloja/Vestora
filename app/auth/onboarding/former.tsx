"use client";
import { useState } from "react";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import {
  FaUserCircle,
  FaFingerprint,
  FaRegAddressCard,
  FaKey,
} from "react-icons/fa";
import LeftPanelSlide from "../../components/ui/LeftPanelSlide";
import OTPInput from "../../components/signup/OTPInput";
import { useRouter } from "next/navigation";

export default function VestoraNTBOnboardingWithPanel() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountNumber: "",
    bvnOrNin: "",
    name: "",
    email: "",
    phone: "",
    otp: "",
  });

  const steps = [
    { label: "Account", icon: <FaUserCircle /> },
    { label: "Identification", icon: <FaFingerprint /> },
    { label: "Details", icon: <FaRegAddressCard /> },
    { label: "Verification", icon: <FaKey /> },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOTPChange = (value: string) => {
    setFormData({ ...formData, otp: value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const router = useRouter();
  return (
    <div className="flex min-h-screen overflow-hidden text-[#0a2e16]">
      <LeftPanelSlide />

      {/* Right Panel - Login Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center p-10 lg:p-14 max-sm:px-4"
      >
        <h2 className="text-3xl font-semibold text-center mb-2 text-[#0a2e16]">
          Welcome to Vestora
        </h2>
        <p className="text-center max-w-md text-gray-600 mb-8 text-sm mx-auto">
          Make secure investments in Nigerian Treasury Bills with ease,
          confidence, and{" "}
          <span className="font-medium text-[#1a5c2e]">{`Vestora's support.`}</span>
        </p>

        <ProgressBar currentStep={step} totalSteps={4} steps={steps} />

        {step === 1 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Account Number</label>
            <input
              name="accountNumber"
              type="text"
              value={formData.accountNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your account number"
            />
            <Button onClick={nextStep} className="w-full mt-6">
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">BVN or NIN</label>
            <input
              name="bvnOrNin"
              type="text"
              value={formData.bvnOrNin}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your BVN or NIN"
            />
            <div className="flex justify-between gap-3 mt-6">
              <Button
                onClick={prevStep}
                variant="outline"
                className="min-w-[162px]"
              >
                Back
              </Button>
              <Button onClick={nextStep} className="min-w-[162px]">
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="youremail@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+234123456789"
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 mt-6">
              <Button
                onClick={prevStep}
                variant="outline"
                className="min-w-[162px]"
              >
                Back
              </Button>
              <Button onClick={nextStep} className="min-w-[162px]">
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Enter OTP</label>
            <OTPInput value={formData.otp} onChange={handleOTPChange} />

            <p className="text-xs text-gray-500 ">
              Enter the 6-digit code sent to your phone
            </p>
            <div className="flex justify-between gap-3 mt-6">
              <Button
                onClick={prevStep}
                variant="outline"
                className="min-w-[162px]"
              >
                Back
              </Button>
              <Button type="submit">
                Complete Signup
              </Button>
            </div>
          </div>
        )}

        <p className="mt-3 text-sm">
          Already have an investment account?{" "}
          <span className="font-semibold border-b border-[#3db86a] cursor-pointer text-[#1a5c2e]">
            Log in
          </span>
        </p>
      </form>
    </div>
  );
}
