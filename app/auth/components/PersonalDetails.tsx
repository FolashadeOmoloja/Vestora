"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  CreditCard,
  FileText,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
} from "lucide-react";

// Types
interface PersonalDetailsProps {
  onContinue: (data: PersonalDetailsData) => void;
  onBack: () => void;
  linkedAccount?: {
    bank: string;
    accountNumber: string;
    accountName: string;
  };
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

  // Handle file upload
  const handleFileUpload = (
    type: keyof PersonalDetailsData["documents"],
    file: File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: file,
      },
    }));
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
    } else if (
      formData.phoneNumber.length !== 14 ||
      !formData.phoneNumber.startsWith("234")
    ) {
      newErrors.phoneNumber = "Please enter a valid Nigerian phone number";
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

    if (!formData.documents.idCard) {
      newErrors.idCard = "Valid ID card is required";
    }

    if (!formData.documents.utilityBill) {
      newErrors.utilityBill = "Utility bill is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleContinue = async () => {
    if (!validateForm()) return;

    setIsValidating(true);

    // Simulate validation delay
    setTimeout(() => {
      setIsValidating(false);
      onContinue(formData);
    }, 2000);
  };

  // File input component
  const FileUpload = ({
    type,
    label,
    accept,
    required = true,
    description,
  }: {
    type: keyof PersonalDetailsData["documents"];
    label: string;
    accept: string;
    required?: boolean;
    description: string;
  }) => {
    const file = formData.documents[type];
    const error = errors[type];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
            error
              ? "border-red-300 bg-red-50"
              : file
              ? "border-green-300 bg-green-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {file ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleFileUpload(type, null)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept={accept}
                  onChange={(e) =>
                    handleFileUpload(type, e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
                <span className="text-blue-600 hover:text-blue-700 font-medium">
                  Choose file
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  };

  const isFormValid =
    !Object.keys(errors).length &&
    formData.fullName &&
    formData.email &&
    formData.phoneNumber &&
    formData.bvn &&
    formData.nin &&
    formData.documents.idCard &&
    formData.documents.utilityBill;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-[#002C6C] mb-4">
            Personal Details & KYC
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Complete your profile with personal information and required
            documents for verification
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#002C6C] text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-[#002C6C]">
                Select Type
              </span>
            </div>
            <div className="w-8 h-px bg-[#002C6C]"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#002C6C] text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-[#002C6C]">
                Link Account
              </span>
            </div>
            <div className="w-8 h-px bg-[#002C6C]"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#002C6C] text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-[#002C6C]">
                Personal Details
              </span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm text-gray-500">Verification</span>
            </div>
          </div>
        </div>

        {/* Linked Account Info */}
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

        {/* Form Container */}
        <div className="bg-white rounded-xl  p-8">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#002C6C] mb-4">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="Enter your full name as on ID"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
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
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email address"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
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
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formatPhoneDisplay(formData.phoneNumber)}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="+234 XXX XXX XXXX"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
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
                  <label className="block text-sm font-semibold text-gray-700">
                    Bank Verification Number (BVN){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showBvn ? "text" : "password"}
                      value={formData.bvn}
                      onChange={(e) => handleBvnChange(e.target.value)}
                      placeholder="Enter your 11-digit BVN"
                      maxLength={11}
                      className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.bvn
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-[#002C6C]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowBvn(!showBvn)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
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
                  <label className="block text-sm font-semibold text-gray-700">
                    National Identification Number (NIN){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showNin ? "text" : "password"}
                      value={formData.nin}
                      onChange={(e) => handleNinChange(e.target.value)}
                      placeholder="Enter your 11-digit NIN"
                      maxLength={11}
                      className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.nin
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-[#002C6C]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNin(!showNin)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
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

            {/* Document Upload Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#002C6C] mb-4">
                Required Documents
              </h3>

              <div className="space-y-4">
                <FileUpload
                  type="idCard"
                  label="Valid ID Card"
                  accept="image/*,.pdf"
                  description="Upload National ID, Driver's License, or International Passport (Max 5MB)"
                />

                <FileUpload
                  type="utilityBill"
                  label="Proof of Address"
                  accept="image/*,.pdf"
                  description="Upload utility bill not older than 3 months (Max 5MB)"
                />

                <FileUpload
                  type="passport"
                  label="Passport Photograph"
                  accept="image/*"
                  required={false}
                  description="Optional: Upload recent passport photograph (Max 2MB)"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                onClick={onBack}
                className="flex-1 flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>

              <button
                onClick={handleContinue}
                disabled={!isFormValid || isValidating}
                className={`flex-2 flex items-center justify-center px-6 py-4 rounded-xl font-medium text-white transition-all ${
                  isFormValid && !isValidating
                    ? "bg-[#002C6C] hover:bg-[#001a4d] shadow-md hover:shadow-lg"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isValidating ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Validating...
                  </>
                ) : (
                  <>
                    Continue to Verification
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
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

        {/* Privacy Notice */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-green-800 mb-1">
                Data Privacy & Security
              </h4>
              <p className="text-sm text-green-700">
                Your personal information and documents are encrypted and
                securely stored. We comply with CBN KYC requirements and data
                protection regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component
export default function PersonalDetailsDemo() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [submittedData, setSubmittedData] =
    useState<PersonalDetailsData | null>(null);

  const handleContinue = (data: PersonalDetailsData) => {
    console.log("Personal details submitted:", data);
    setSubmittedData(data);
    setStep("success");

    // Show success and move to next step
    setTimeout(() => {
      alert(
        `Personal Details Submitted!\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phoneNumber}\nBVN: ${data.bvn}\nNIN: ${data.nin}\n\nNext: OTP Verification`
      );
      // Reset for demo
      setStep("form");
      setSubmittedData(null);
    }, 1500);
  };

  const handleBack = () => {
    console.log("Going back to bank account linking");
    alert("Going back to bank account linking...");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen">
        <div className="text-centermax-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-green-800 mb-2">
            Details Submitted!
          </h2>
          <p className="text-green-600 mb-4">
            Your personal details and KYC documents have been submitted for
            verification.
          </p>
          <div className="text-sm text-gray-600">
            Processing verification...
          </div>
        </div>
      </div>
    );
  }

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
    />
  );
}
