"use client";

import { ChangeEvent, useState } from "react";
import { ChevronLeft, Lock } from "lucide-react";
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
    <div className="min-h-screen max-w-[400px] mx-auto bg-white flex flex-col">
      <div className="px-6 pt-8 pb-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <main className="flex-1 px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Verify your identity</h1>
        <p className="mt-3 text-gray-500">
          Enter your 12-digit National Fayda ID to unlock your financial profile.
        </p>

        <input
          type="text"
          inputMode="numeric"
          value={faydaId}
          onChange={handleFaydaChange}
          placeholder="0000 0000 0000"
          className="w-full mt-8 text-4xl font-bold tracking-widest text-center text-gray-900 placeholder:text-gray-200 bg-gray-50 rounded-3xl py-6 px-3 outline-none focus:ring-2 focus:ring-emerald-200"
        />

        <div className="mt-5 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4 text-emerald-500" />
          <span className="text-xs text-gray-500">Secured by Ethiopia National ID Program</span>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="max-w-[400px] mx-auto">
          <button
            type="button"
            onClick={() => router.push("/verify/liveness")}
            className="w-full h-14 rounded-full bg-emerald-500 text-white font-semibold text-base hover:bg-emerald-600 transition-colors"
          >
            Continue
          </button>
        </div>
      </footer>
    </div>
  );
}
