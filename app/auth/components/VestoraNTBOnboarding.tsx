"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import DocumentUpload from "./DocumentUpload";
import { PersonalDetails, type PersonalDetailsData } from "./PersonalDetails";
import OTPInput from "../../components/signup/OTPInput";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Search,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  Eye,
  EyeOff,
  Shield,
} from "lucide-react";
import {
  FaEnvelope,
  FaFingerprint,
  FaRegAddressCard,
  FaLink,
  FaKey,
} from "react-icons/fa";
import Logo from "@/app/components/homepage/Logo";

interface Bank {
  id: string;
  name: string;
  code: string;
}

const BANKS: Bank[] = [
  { id: "044", name: "Access Bank", code: "044" },
  { id: "014", name: "Afribank Nigeria Plc", code: "014" },
  { id: "023", name: "Citibank Nigeria Limited", code: "023" },
  { id: "050", name: "Ecobank Nigeria Plc", code: "050" },
  { id: "084", name: "Enterprise Bank Limited", code: "084" },
  { id: "070", name: "Fidelity Bank Plc", code: "070" },
  { id: "214", name: "First City Monument Bank Limited", code: "214" },
  { id: "058", name: "Guaranty Trust Bank Plc", code: "058" },
  { id: "030", name: "Heritage Banking Company Ltd", code: "030" },
  { id: "082", name: "Keystone Bank Limited", code: "082" },
  { id: "076", name: "Polaris Bank Limited", code: "076" },
  { id: "221", name: "Stanbic IBTC Bank Plc", code: "221" },
  { id: "232", name: "Sterling Bank Plc", code: "232" },
  { id: "032", name: "Union Bank of Nigeria Plc", code: "032" },
  { id: "033", name: "United Bank for Africa Plc", code: "033" },
  { id: "215", name: "Unity Bank Plc", code: "215" },
  { id: "035", name: "Wema Bank Plc", code: "035" },
  { id: "057", name: "Zenith Bank Plc", code: "057" },
  { id: "101", name: "Providus Bank", code: "101" },
  { id: "100", name: "Suntrust Bank", code: "100" },
  { id: "102", name: "Titan Trust Bank", code: "102" },
];

const PROGRESS_STEPS = [
  { label: "Account", icon: <FaEnvelope /> },
  { label: "Link", icon: <FaLink /> },
  { label: "Details", icon: <FaFingerprint /> },
  { label: "Docs", icon: <FaRegAddressCard /> },
  { label: "Verify", icon: <FaKey /> },
];

export default function VestoraNTBOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otp, setOtp] = useState("");

  const [, setIdentityDetails] = useState<PersonalDetailsData | null>(null);

  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [bankError, setBankError] = useState("");

  const [accountError, setAccountError] = useState("");
  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const validateStep1 = () => {
    setAccountError("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAccountError("Enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      setAccountError("Password must be at least 8 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      setAccountError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleAccountNumberChange = (value: string) => {
    const clean = value.replace(/\D/g, "").slice(0, 10);
    setAccountNumber(clean);
    setAccountName("");
    setVerificationStatus("idle");
    setBankError("");
  };

  const handleNameInquiry = () => {
    if (!selectedBank || accountNumber.length !== 10) {
      setBankError(
        "Please select a bank and enter a valid 10-digit account number.",
      );
      return;
    }
    setIsVerifying(true);
    setBankError("");
    setVerificationStatus("idle");

    setTimeout(() => {
      setIsVerifying(false);
      if (accountNumber === "0123456789") {
        setBankError("Account number not found. Please verify and try again.");
        setVerificationStatus("error");
      } else if (accountNumber === "1111111111") {
        setBankError(
          "Unable to verify account at this time. Please try again later.",
        );
        setVerificationStatus("error");
      } else {
        const mockNames = [
          "ADEBAYO OLUMIDE SAMUEL",
          "CHIOMA BLESSING OKORO",
          "IBRAHIM MOHAMMED HASSAN",
          "FATIMA AISHA USMAN",
          "EMEKA CHRISTIAN NWANKWO",
          "KEMI FOLAKE WILLIAMS",
        ];
        setAccountName(
          mockNames[parseInt(accountNumber.slice(-1), 10) % mockNames.length],
        );
        setVerificationStatus("success");
      }
    }, 1500);
  };

  const filteredBanks = BANKS.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setSearchTerm(bank.name);
    setShowDropdown(false);
    setAccountName("");
    setVerificationStatus("idle");
    setBankError("");
  };

  const canVerifyBank =
    selectedBank && accountNumber.length === 10 && !isVerifying;
  const canProceedBank =
    verificationStatus === "success" &&
    selectedBank &&
    accountNumber &&
    accountName;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center p-10 lg:p-14 max-sm:px-4 min-h-screen text-[#0a2e16]"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#3db86a]/15 border border-[#3db86a]/30 text-[#1a5c2e] text-xs px-3 py-1.5 rounded-full mb-5">
          <Shield size={12} />
          Secured by Vestora
        </div>
        <div className="flex gap-3 items-center justify-center mb-4">
          <h1 className="text-3xl font-semibold text-[#0a2e16] ">Welcome to</h1>
          <Logo text="text-[#0a2e16]" size={30} font="text-3xl" />
        </div>
        <p className="text-gray-600 text-sm max-w-125] mx-auto">
          Make secure investments with ease, confidence, and
          <span className="font-medium text-[#1a5c2e]">
            {" "}
            {`Vestora's support.`}
          </span>
        </p>
      </div>

      <ProgressBar currentStep={step} totalSteps={5} steps={PROGRESS_STEPS} />

      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#0a2e16]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input pl-10!"
                placeholder="Enter your email address"
                autoComplete="email"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0a2e16]">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-11"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0a2e16]">
                Confirm password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input pr-11"
                  placeholder="Repeat password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {accountError && (
            <p className="text-sm text-red-600">{accountError}</p>
          )}
          <Button
            type="button"
            onClick={() => validateStep1() && nextStep()}
            className="w-full mt-4"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Bank</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                  if (!e.target.value) setSelectedBank(null);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search for your bank..."
                className="form-input"
              />
              <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredBanks.length > 0 ? (
                    filteredBanks.map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => handleBankSelect(bank)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span className="flex items-center">
                          <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="font-medium">{bank.name}</span>
                        </span>
                        {selectedBank?.id === bank.id && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-center text-sm">
                      No banks found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Account number</label>
            <div className="relative">
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => handleAccountNumberChange(e.target.value)}
                placeholder="10-digit NUBAN"
                maxLength={10}
                className="form-input"
              />
              {verificationStatus === "success" && (
                <CheckCircle className="absolute right-3 top-3.5 w-5 h-5 text-green-600" />
              )}
              {verificationStatus === "error" && (
                <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-600" />
              )}
            </div>
            <p className="text-xs text-gray-500">
              {accountNumber.length}/10 digits
            </p>
          </div>

          <Button
            type="button"
            onClick={handleNameInquiry}
            disabled={!canVerifyBank}
            className="w-full"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
                Verifying…
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2 inline" />
                Verify account name
              </>
            )}
          </Button>

          {accountName && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Account name verified
                  </p>
                  <p className="text-sm text-green-700 mt-1">{accountName}</p>
                </div>
              </div>
            </div>
          )}

          {bankError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{bankError}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Back
            </Button>
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canProceedBank}
              className="flex-1"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 &&
        selectedBank &&
        accountName &&
        verificationStatus === "success" && (
          <PersonalDetails
            key={`${selectedBank.id}-${accountNumber}`}
            linkedAccount={{
              bank: selectedBank.name,
              accountNumber,
              accountName,
            }}
            onContinue={(data) => {
              setIdentityDetails(data);
              nextStep();
            }}
            onBack={prevStep}
          />
        )}

      {step === 3 &&
        (!selectedBank || !accountName || verificationStatus !== "success") && (
          <p className="text-sm text-red-600 text-center">
            Complete bank linking on the previous step first.
          </p>
        )}

      {step === 4 && <DocumentUpload onContinue={nextStep} onBack={prevStep} />}

      {step === 5 && (
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Enter the 6-digit code sent to your phone
          </label>
          <OTPInput value={otp} onChange={setOtp} />
          <p className="text-xs text-gray-500">
            Demo: use any 6 digits to complete.
          </p>
          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={otp.length !== 6}
              className="flex-1"
            >
              Go to dashboard
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
          </div>
        </div>
      )}

      <p className="mt-10 text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-[#1a5c2e] hover:text-[#3db86a] underline-offset-2 hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
