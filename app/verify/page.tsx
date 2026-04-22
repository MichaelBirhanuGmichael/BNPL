"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);

    // Prototype flow: no validation, auto-continue on full OTP length.
    if (value.length === 6) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 350);
    }
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
          <h1 className="text-[32px] leading-[1.15] font-bold text-[#1A1A1A] tracking-tight">
            Enter OTP code
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#9CA3AF]">
            We sent a 6-digit code to your mobile number.
          </p>
        </div>

        <div className="mt-10 opacity-0 animate-slide-up delay-200">
          <input
            type="tel"
            inputMode="numeric"
            value={otp}
            onChange={handleOtpChange}
            placeholder="000 000"
            autoFocus
            className="w-full h-[60px] px-5 bg-[#F5F5F5] rounded-2xl text-[24px] tracking-[0.25em] font-semibold text-[#1A1A1A] caret-[#00D084] placeholder:text-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#00D084]/30 transition-all duration-200"
          />
          <p className="mt-3 text-sm text-[#9CA3AF]">
            For prototype: any OTP will continue.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <div className="max-w-[400px] mx-auto px-6 pt-4 pb-8 safe-bottom opacity-0 animate-slide-up delay-300">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full h-[58px] rounded-full font-semibold text-[17px] bg-[#00D084] text-white shadow-lg shadow-[#00D084]/25 transition-all duration-300 ease-out active:scale-[0.98]"
          >
            Verify & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
