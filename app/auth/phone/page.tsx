"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PhoneAuthPage() {
  return (
    <Suspense fallback={<PhoneAuthFallback />}>
      <PhoneAuthContent />
    </Suspense>
  );
}

function PhoneAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") === "login" ? "login" : "signup";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    if (isLoading) return;
    setIsLoading(true);
    router.push(`/verify?flow=${flow}`);
  };

  return (
    <div className="h-screen bg-[#FAF9F6] max-w-[400px] mx-auto flex flex-col relative overflow-hidden">
      <div className="flex-1 flex flex-col px-6 pt-5 pb-32">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 -ml-2"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
        </button>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mt-12">
          <h1 className="text-[32px] leading-[1.15] font-bold text-[#1A1A1A] tracking-tight text-balance">
            What&apos;s your mobile number?
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#9CA3AF]">
            We will send you a secure OTP to {flow === "signup" ? "create your account" : "log in"}.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }} className="mt-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center px-4 h-[52px] bg-[#F2F4F7] rounded-full border border-[#E5E7EB]">
              <span className="text-[16px] font-medium text-[#1A1A1A]">+251</span>
            </div>

            <div className="flex-1 relative">
              <input
                type="tel"
                inputMode="numeric"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="900 000 000"
                className="w-full h-[52px] px-5 bg-transparent rounded-full text-[18px] font-medium text-[#1A1A1A] caret-[#31f5c2] placeholder:text-[#C5CBD4] border border-[#D7DCE2] focus:outline-none focus:border-[#31f5c2] focus:shadow-[0_0_0_3px_rgba(49,245,194,0.2)] transition-all duration-300"
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
            onClick={handleContinue}
            className="w-full h-[56px] rounded-full font-semibold text-[17px] transition-all duration-300 ease-out active:scale-[0.98] bg-[#111111] text-white shadow-[0_8px_28px_rgba(0,0,0,0.28)] disabled:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="mx-auto block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Continue"
            )}
          </button>

          <p className="mt-4 text-center text-[13px] text-[#9CA3AF] leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="text-[#1A1A1A] underline underline-offset-2">Terms of Service</span> and{" "}
            <span className="text-[#1A1A1A] underline underline-offset-2">Privacy Policy</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function PhoneAuthFallback() {
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
          <h1 className="text-[32px] leading-[1.15] font-bold text-[#1A1A1A] tracking-tight text-balance">
            What&apos;s your mobile number?
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#9CA3AF]">Loading...</p>
        </div>
      </div>
    </div>
  );
}
