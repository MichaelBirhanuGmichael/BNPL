"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function PhoneAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") === "login" ? "login" : "signup";
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const formatPhoneDisplay = (value: string) => {
    if (value.length <= 3) return value;
    if (value.length <= 6) return `${value.slice(0, 3)} ${value.slice(3)}`;
    return `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
  };

  const handleContinue = () => {
    router.push(`/verify?flow=${flow}`);
  };

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto flex flex-col relative overflow-hidden">
      <div className="flex-1 flex flex-col px-6 pt-4 pb-32 animate-slide-up">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F5F5F5] transition-colors duration-200 -ml-2 opacity-0 animate-fade-in"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
        </button>

        <div className="mt-12 opacity-0 animate-slide-up delay-100">
          <h1 className="text-[32px] leading-[1.15] font-bold text-[#1A1A1A] tracking-tight text-balance">
            What&apos;s your mobile number?
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#9CA3AF]">
            We will send you a secure OTP to {flow === "signup" ? "create your account" : "log in"}.
          </p>
        </div>

        <div className="mt-10 opacity-0 animate-slide-up delay-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center px-4 h-[60px] bg-[#F5F5F5] rounded-2xl">
              <span className="text-[18px] font-semibold text-[#1A1A1A]">+251</span>
            </div>

            <div className="flex-1 relative">
              <input
                type="tel"
                inputMode="numeric"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="900 000 000"
                className="w-full h-[60px] px-5 bg-[#F5F5F5] rounded-2xl text-[18px] font-semibold text-[#1A1A1A] caret-[#00D084] placeholder:text-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#00D084]/30 transition-all duration-200"
                autoFocus
              />
            </div>
          </div>

          {phoneNumber.length > 0 && (
            <div
              className="mt-4 opacity-0 animate-fade-in"
              style={{ animationDelay: "0ms", animationFillMode: "forwards", opacity: 1 }}
            >
              <p className="text-[15px] text-[#9CA3AF]">
                We&apos;ll send a code to <span className="text-[#1A1A1A] font-medium">+251 {formatPhoneDisplay(phoneNumber)}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <div className="max-w-[400px] mx-auto px-6 pt-4 pb-8 safe-bottom opacity-0 animate-slide-up delay-300">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full h-[58px] rounded-full font-semibold text-[17px] transition-all duration-300 ease-out active:scale-[0.98] bg-[#00D084] text-white shadow-lg shadow-[#00D084]/25"
          >
            Continue
          </button>

          <p className="mt-4 text-center text-[13px] text-[#9CA3AF] leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="text-[#1A1A1A] underline underline-offset-2">Terms of Service</span> and{" "}
            <span className="text-[#1A1A1A] underline underline-offset-2">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
