"use client";
import { useState, useRef, useEffect } from "react";

// OTP Input Component
interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

const OTPInput = ({ length = 6, value, onChange }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update internal state when value prop changes
  useEffect(() => {
    const otpArray = value.split("");
    const newOtp = new Array(length).fill("");
    otpArray.forEach((digit, index) => {
      if (index < length) newOtp[index] = digit;
    });
    setOtp(newOtp);
  }, [value, length]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const val = element.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1); // Take only the last character
    setOtp(newOtp);

    // Call parent onChange
    onChange(newOtp.join(""));

    // Focus next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Focus previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pasteArray = pasteData.replace(/\D/g, "").split("").slice(0, length);

    const newOtp = new Array(length).fill("");
    pasteArray.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus the next empty input or the last filled input
    const nextEmptyIndex = newOtp.findIndex((val) => val === "");
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex gap-3 ">
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
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none transition-all duration-200 ${
            digit
              ? "border-[#002C6C] bg-blue-50 text-[#002C6C]"
              : "border-gray-300 hover:border-gray-400 focus:border-[#002C6C]"
          }`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
