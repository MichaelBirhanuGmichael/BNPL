"use client";

import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto flex flex-col relative overflow-hidden">
      <div className="flex-1 px-6 pt-10 pb-32 flex flex-col">
        <div className="rounded-3xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-100 p-7">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.16em]">MEREQ</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Shop now.
            <br />
            Pay with confidence.
          </h1>
          <p className="mt-4 text-base text-gray-500 leading-relaxed">
            Discover trusted merchants, split purchases responsibly, and build your credit profile with MEREQ.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 border border-gray-100 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium text-gray-600">Bank-grade security and buyer protection</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <div className="max-w-[400px] mx-auto px-6 pt-4 pb-8 safe-bottom">
          <button
            type="button"
            onClick={() => router.push("/auth/phone?flow=signup")}
            className="w-full h-[58px] rounded-full font-semibold text-[17px] transition-all duration-300 ease-out active:scale-[0.98] bg-[#00D084] text-white shadow-lg shadow-[#00D084]/25"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => router.push("/auth/phone?flow=login")}
            className="w-full mt-3 h-[54px] rounded-full border border-gray-200 bg-white text-[#1A1A1A] font-semibold text-[16px] hover:bg-gray-50 transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
