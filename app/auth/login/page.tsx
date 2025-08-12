"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import LeftSide from "../components/LeftSide";
import { useRouter } from "next/navigation";

// Types
interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

const LoginPage = ({ onLogin, onSignUp, onForgotPassword }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"login" | "otp" | "success">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const router = useRouter();

  // Validate form
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email, password);
      setStep("otp");
    }, 100);
  };

  const handleOtpVerify = (otp: string) => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Creative Design */}
      <LeftSide />

      {/* Right Side - Login Form */}
      {step === "otp" ? (
        <LoginOtpVerification
          onVerify={handleOtpVerify}
          onBack={() => setStep("login")}
          email={loginEmail}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-[#002C6C] mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to your FirstBank Treasury account
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
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

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-[#002C6C]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#002C6C] border-gray-300 rounded focus:ring-[#002C6C] focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-[#002C6C] hover:underline font-medium"
                >
                  Reset Password
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleLogin}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#002C6C] hover:bg-[#001a4d] shadow-md hover:shadow-lg"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={onSignUp}
                  className="text-[#002C6C] font-semibold hover:underline"
                >
                  Sign up here
                </button>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-blue-600 mr-2" />
                <p className="text-xs text-blue-700">
                  Your login is secured with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// OTP Verification Component for Login
const LoginOtpVerification = ({
  onVerify,
  onBack,
  email,
}: {
  onVerify: (otp: string) => void;
  onBack: () => void;
  email: string;
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError("");

    setTimeout(() => {
      setIsVerifying(false);
      onVerify(otpString);
    }, 100);
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setTimeLeft(60);
      setOtp(["", "", "", "", "", ""]);
      setIsResending(false);
      inputRefs.current[0]?.focus();
    }, 100);
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="flex items-center justify-center basis-1/2">
      <div className="max-w-md ">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#002C6C]" />
          </div>
          <h2 className="text-2xl font-semibold text-[#002C6C] mb-2">
            Login Verification
          </h2>
          <p className="text-gray-600 text-sm">
            Enter the 6-digit code sent to your email
          </p>
          <p className="text-sm font-medium text-gray-800 mt-2">{email}</p>
        </div>

        <div className="space-y-6">
          {/* OTP Input */}
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className={`w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002C6C] focus:border-transparent transition-all ${
                  error
                    ? "border-red-300 bg-red-50"
                    : digit
                    ? "border-[#002C6C] bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center bg-red-50 px-4 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Timer and Resend */}
          <div className="text-center space-y-2">
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-600">
                Code expires in {timeLeft}s
              </p>
            ) : (
              <p className="text-sm text-red-600">Code has expired</p>
            )}

            <button
              onClick={handleResend}
              disabled={timeLeft > 0 || isResending}
              className={`text-sm font-medium ${
                timeLeft > 0 || isResending
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#002C6C] hover:underline"
              }`}
            >
              {isResending ? (
                <span className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                  Resending...
                </span>
              ) : (
                "Resend code"
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="w-[200px] flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:border-gray-300 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2 inline" />
              Back
            </button>

            <button
              onClick={handleVerify}
              disabled={!isComplete || isVerifying}
              className={`flex-2 px-6 py-3 rounded-lg font-medium text-white transition-all ${
                isComplete && !isVerifying
                  ? "bg-[#002C6C] hover:bg-[#001a4d]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Login
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component
export default function LoginDemo() {
  const [step, setStep] = useState<"login" | "otp" | "success">("login");
  const [loginEmail, setLoginEmail] = useState("");

  const handleLogin = (email: string, password: string) => {
    console.log("Login attempt:", { email, password });
    setLoginEmail(email);
    setStep("otp");
  };

  const handleSignUp = () => {
    alert("Redirecting to sign up page...");
  };

  const handleForgotPassword = () => {
    alert("Redirecting to password reset...");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-green-800 mb-2">
            Welcome Back!
          </h2>
          <p className="text-green-600">
            Login successful. Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <LoginPage
      onLogin={handleLogin}
      onSignUp={handleSignUp}
      onForgotPassword={handleForgotPassword}
    />
  );
}
