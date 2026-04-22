"use client";

import { useState } from "react";
import { ChevronLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LivenessPage() {
  const router = useRouter();
  const [hasConsent, setHasConsent] = useState(false);

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
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Take a quick selfie</h1>
        <p className="mt-3 text-gray-500">
          We need to make sure it&apos;s really you. Position your face inside the frame.
        </p>

        <div className="relative w-64 h-64 mx-auto mt-12">
          <div className="absolute -inset-3 rounded-full border border-emerald-300/60 animate-pulse" />
          <div className="w-64 h-64 rounded-full mx-auto bg-gray-900 border-4 border-emerald-500 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent animate-pulse" />
            <User className="w-24 h-24 text-gray-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </main>

      <div className="px-6 pb-28 mt-8">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <button
            type="button"
            onClick={() => setHasConsent((current) => !current)}
            className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              hasConsent ? "bg-emerald-500 border-emerald-500" : "bg-white border-gray-300"
            }`}
            aria-label="Toggle biometric consent"
          >
            {hasConsent && <span className="w-2 h-2 rounded-sm bg-white" />}
          </button>
          <span className="text-xs text-gray-500">
            I explicitly consent to the processing of my biometric data and MEREQ&apos;s Terms of Service.
          </span>
        </label>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="max-w-[400px] mx-auto">
          <button
            type="button"
            disabled={!hasConsent}
            onClick={() => router.push("/dashboard")}
            className="w-full h-14 rounded-full bg-emerald-500 text-white font-semibold text-base disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
          >
            Scan Face
          </button>
        </div>
      </footer>
    </div>
  );
}
