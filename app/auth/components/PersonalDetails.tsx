"use client";
import React, { ReactNode, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import DocumentUpload from "./DocumentUpload";
import Button from "@/app/components/ui/Button";

// Types
interface PersonalDetailsProps {
  onContinue: (data: PersonalDetailsData) => void;
  onBack: () => void;
  linkedAccount?: {
    bank: string;
    accountNumber: string;
    accountName: string;
  };
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

interface PersonalDetailsData {
  fullName: string;
  email: string;
  phoneNumber: string;
  bvn: string;
  nin: string;
  documents: {
    idCard: File | null;
    utilityBill: File | null;
    passport: File | null;
  };
}

const PersonalDetails = ({
  onContinue,
  onBack,
  linkedAccount,
  step,
  setStep,
}: PersonalDetailsProps) => {
  const [formData, setFormData] = useState<PersonalDetailsData>({
    fullName: linkedAccount?.accountName || "",
    email: "",
    phoneNumber: "",
    bvn: "",
    nin: "",
    documents: {
      idCard: null,
      utilityBill: null,
      passport: null,
    },
  });

  const [showBvn, setShowBvn] = useState(false);
  const [showNin, setShowNin] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  // Handle input changes
  const handleInputChange = (
    field: keyof Omit<PersonalDetailsData, "documents">,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle phone number formatting
  const handlePhoneChange = (value: string) => {
    // Remove all non-digits
    let cleaned = value.replace(/\D/g, "");

    // Ensure it starts with 234 if it's a full international format
    if (cleaned.startsWith("234")) {
      cleaned = cleaned.slice(0, 14); // Limit to 14 digits for +234XXXXXXXXXX
    } else if (cleaned.startsWith("0")) {
      // Convert 0XXXXXXXXXX to 234XXXXXXXXXX
      cleaned = "234" + cleaned.slice(1);
      cleaned = cleaned.slice(0, 14);
    } else if (cleaned.length > 0 && !cleaned.startsWith("234")) {
      // Assume it's a local number without leading 0
      cleaned = "234" + cleaned;
      cleaned = cleaned.slice(0, 14);
    }

    handleInputChange("phoneNumber", cleaned);
  };

  // Format phone for display
  const formatPhoneDisplay = (phone: string) => {
    if (phone.startsWith("234") && phone.length >= 6) {
      return `+${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(
        6,
        9
      )} ${phone.slice(9)}`.trim();
    }
    return phone;
  };

  // Handle BVN input
  const handleBvnChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    handleInputChange("bvn", cleaned);
  };

  // Handle NIN input
  const handleNinChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    handleInputChange("nin", cleaned);
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.bvn) {
      newErrors.bvn = "BVN is required";
    } else if (formData.bvn.length !== 11) {
      newErrors.bvn = "BVN must be 11 digits";
    }

    if (!formData.nin) {
      newErrors.nin = "NIN is required";
    } else if (formData.nin.length !== 11) {
      newErrors.nin = "NIN must be 11 digits";
    }

    // if (!formData.documents.idCard) {
    //   newErrors.idCard = "Valid ID card is required";
    // }

    // if (!formData.documents.utilityBill) {
    //   newErrors.utilityBill = "Utility bill is required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleFinalContinue = async () => {
    if (!validateForm()) return;

    setIsValidating(true);

    // Simulate validation delay
    setTimeout(() => {
      setIsValidating(false);
      onContinue(formData);
    }, 300);
  };
  const handleContinue = async () => {
    if (!validateForm()) return;

    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      onContinue(formData);
    }, 300);
  };

  const isFormValid =
    !Object.keys(errors).length &&
    formData.fullName &&
    formData.email &&
    formData.bvn &&
    formData.nin;
  console.log(step);
  return (
    <div>
      <div>
        {linkedAccount && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Linked Account
                </p>
                <p className="text-sm text-blue-700">
                  {linkedAccount.bank} - {linkedAccount.accountNumber}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-3">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#002C6C] mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter your full name as on ID"
                    className={`form-input !pl-10 ${
                      errors.fullName
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-[#002C6C]"
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                    className={`form-input !pl-10 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-[#002C6C]"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-5 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formatPhoneDisplay(formData.phoneNumber)}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="+234 XXX XXX XXXX"
                    className={`form-input !pl-10 ${
                      errors.phoneNumber
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-[#002C6C]"
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* KYC Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#002C6C] mb-4">
              KYC Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* BVN */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Bank Verification Number (BVN){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showBvn ? "text" : "password"}
                    value={formData.bvn}
                    onChange={(e) => handleBvnChange(e.target.value)}
                    placeholder="Enter your 11-digit BVN"
                    maxLength={11}
                    className={`form-input`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowBvn(!showBvn)}
                    className="absolute right-3 top-5 text-gray-400 hover:text-gray-600"
                  >
                    {showBvn ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {formData.bvn.length}/11 digits
                </p>
                {errors.bvn && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.bvn}
                  </p>
                )}
              </div>

              {/* NIN */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  National Identification Number (NIN){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNin ? "text" : "password"}
                    value={formData.nin}
                    onChange={(e) => handleNinChange(e.target.value)}
                    placeholder="Enter your 11-digit NIN"
                    maxLength={11}
                    className={`form-input`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNin(!showNin)}
                    className="absolute right-3 top-5 text-gray-400 hover:text-gray-600"
                  >
                    {showNin ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {formData.nin.length}/11 digits
                </p>
                {errors.nin && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.nin}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 mt-8">
            <Button
              onClick={onBack}
              variant="outline"
              className="min-w-[200px] flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleContinue}
              className="min-w-[200px] flex items-center justify-center"
              disabled={!isFormValid || isValidating}
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Need help with document requirements?
              <span className="text-[#002C6C] font-medium cursor-pointer hover:underline ml-1">
                View guidelines
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PersonalDetailsDemo({
  nextStep,
  setStep,
}: {
  nextStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [submittedData, setSubmittedData] =
    useState<PersonalDetailsData | null>(null);

  const handleContinue = (data: PersonalDetailsData) => {
    setStep(3);
    setSubmittedData(data);

    setTimeout(() => {
      setSubmittedData(null);
      console.log;
    }, 300);
  };

  const handleBack = () => {
    setStep(1);
  };

  const linkedAccount = {
    bank: "GTBank Plc",
    accountNumber: "0123456789",
    accountName: "ADEBAYO OLUMIDE SAMUEL",
  };

  return (
    <PersonalDetails
      onContinue={handleContinue}
      onBack={handleBack}
      linkedAccount={linkedAccount}
      step={nextStep}
      setStep={setStep}
    />
  );
}
