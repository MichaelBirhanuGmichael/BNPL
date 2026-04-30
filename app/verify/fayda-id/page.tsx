"use client";

import { ChangeEvent, useState } from "react";
import { CheckCircle2, ChevronLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FaydaIdPage() {
  const router = useRouter();
  const [faydaId, setFaydaId] = useState("");

  const handleFaydaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 12);
    const grouped = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    setFaydaId(grouped);
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#FAF9F6] flex flex-col">
      <div className="px-6 pt-8 pb-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="w-10 h-10 rounded-full bg-white border border-zinc-200 transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <main className="flex-1 px-6">
        <h1 className="text-[30px] font-semibold tracking-tight text-gray-900">Verify your identity</h1>
        <p className="mt-3 text-sm leading-7 text-gray-500">
          Enter your 12-digit National Fayda ID to unlock your financial profile.
        </p>

        <input
          type="text"
          inputMode="numeric"
          value={faydaId}
          onChange={handleFaydaChange}
          placeholder="0000 0000 0000"
          className="w-full mt-8 text-[34px] font-semibold tracking-[0.22em] text-center text-gray-900 placeholder:text-gray-300 bg-white border border-zinc-200 rounded-3xl py-6 px-3 outline-none focus:ring-2 focus:ring-[#31f5c244] focus:border-[#31f5c2]"
        />

        <div className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#31f5c21f] border border-[#31f5c240] px-3 py-2">
          <CheckCircle2 className="w-4 h-4 text-[#11a784]" />
          <span className="text-xs text-gray-600">Secured by Ethiopia National ID Program</span>
        </div>
        <div className="mt-3 flex items-start gap-2">
          <Lock className="w-3.5 h-3.5 text-zinc-500 mt-0.5" />
          <p className="text-xs leading-6 text-zinc-500">
            We only use this to verify your identity. Your data is encrypted and never shared.
          </p>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-[#FAF9F6] border-t border-zinc-200">
        <div className="max-w-[400px] mx-auto">
          <button
            type="button"
            onClick={() => router.push("/verify/liveness")}
            className="mx-6 my-4 w-[calc(100%-3rem)] h-14 rounded-full bg-black text-white font-semibold text-base"
          >
            Continue
          </button>
        </div>
      </footer>
    </div>
  );
}
