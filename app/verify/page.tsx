"use client";

import { Suspense, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<VerifyFallback />}>
      <VerifyOtpContent />
    </Suspense>
  );
}

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") === "login" ? "login" : "signup";
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const otpInputRef = useRef<HTMLInputElement>(null);

  const nextRoute = flow === "signup" ? "/verify/fayda-id" : "/dashboard";

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);

    // Prototype flow: no validation, auto-continue on full OTP length.
    if (value.length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        router.push(nextRoute);
      }, 350);
    }
  };

  return (
    <div className="h-screen bg-[#FAF9F6] max-w-[400px] mx-auto flex flex-col relative overflow-hidden">
      <div className="flex-1 flex flex-col px-6 pt-5 pb-32">
        <button
          type="button"
          onClick={() => router.push(`/auth/phone?flow=${flow}`)}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 -ml-2"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
        </button>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mt-12">
          <h1 className="text-[32px] leading-[1.15] font-bold text-[#1A1A1A] tracking-tight">
            Enter OTP code
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#9CA3AF]">
            We sent a 6-digit code to your mobile number.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }} className="mt-10">
          <input
            ref={otpInputRef}
            type="tel"
            inputMode="numeric"
            value={otp}
            onChange={handleOtpChange}
            placeholder=""
            autoFocus
            className="absolute opacity-0 pointer-events-none"
          />
          <div className="grid grid-cols-6 gap-2.5">
            {Array.from({ length: 6 }).map((_, index) => {
              const isActive = index === otp.length && otp.length < 6;
              const isFilled = index < otp.length;
              return (
                <button
                  key={`otp-${index}`}
                  type="button"
                  onClick={() => {
                    otpInputRef.current?.focus();
                  }}
                  className="h-14 rounded-xl border text-center text-[22px] font-semibold transition-all duration-300"
                  style={{
                    borderColor: isActive || isFilled ? "#31f5c2" : "#D7DCE2",
                    boxShadow: isActive ? "0 0 0 3px rgba(49,245,194,0.2)" : "none",
                    color: "#111827",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  {otp[index] ?? ""}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-[#9CA3AF]">
            For prototype: any OTP will continue.
          </p>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#FAF9F6]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="max-w-[400px] mx-auto px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
        >
          <button
            type="button"
            onClick={() => {
              if (isLoading) return;
              setIsLoading(true);
              router.push(nextRoute);
            }}
            className="w-full h-[56px] rounded-full font-semibold text-[17px] bg-[#111111] text-white shadow-[0_8px_28px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="mx-auto block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Verify & Continue"
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function VerifyFallback() {
  return (
    <div className="h-screen bg-[#FAF9F6] max-w-[400px] mx-auto flex flex-col relative overflow-hidden">
      <div className="flex-1 flex flex-col px-6 pt-4 pb-32">
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full -ml-2"
          aria-label="Go back"
          disabled
        >
          <ArrowLeft className="w-6 h-6 text-[#D1D5DB]" strokeWidth={2} />
        </button>
        <div className="mt-12">
          <h1 className="text-[32px] leading-[1.15] font-bold text-[#1A1A1A] tracking-tight">Enter OTP code</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#9CA3AF]">Loading...</p>
        </div>
      </div>
    </div>
  );
}
