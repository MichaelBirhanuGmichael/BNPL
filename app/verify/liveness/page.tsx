"use client";

import { useState } from "react";
import { ChevronLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const tips = ["Look straight", "Blink now", "Move closer"];

export default function LivenessPage() {
  const router = useRouter();
  const [hasConsent, setHasConsent] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const startScan = () => {
    if (!hasConsent || isScanning) return;
    setIsScanning(true);
    const tipTimer = window.setInterval(() => {
      setTipIndex((v) => (v + 1) % tips.length);
    }, 800);
    window.setTimeout(() => {
      window.clearInterval(tipTimer);
      router.push("/verify/analyzing?mode=fayda");
    }, 2600);
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
        <h1 className="text-[30px] font-semibold tracking-tight text-gray-900">Take a quick selfie</h1>
        <p className="mt-3 text-sm leading-7 text-gray-500">
          We need to make sure it&apos;s really you. Position your face inside the frame.
        </p>

        <div className="relative w-64 h-64 mx-auto mt-12">
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(49,245,194,0.1)", "0 0 0 12px rgba(49,245,194,0.22)", "0 0 0 0 rgba(49,245,194,0.1)"] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="absolute -inset-3 rounded-full border border-[#31f5c266]"
          />
          <div className="w-64 h-64 rounded-full mx-auto bg-zinc-900 border-2 border-[#31f5c2] relative overflow-hidden shadow-[0_0_36px_rgba(49,245,194,0.24)]">
            {isScanning && (
              <motion.div
                className="absolute left-4 right-4 h-0.5 bg-[#31f5c2]"
                animate={{ top: ["4%", "95%", "4%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <User className="w-24 h-24 text-gray-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tips[tipIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute -bottom-14 left-1/2 -translate-x-1/2 rounded-full border border-white/40 bg-white/40 backdrop-blur-md px-4 py-2 text-xs text-zinc-700"
            >
              {tips[tipIndex]}
            </motion.div>
          </AnimatePresence>
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

      <footer className="fixed bottom-0 left-0 right-0 bg-[#FAF9F6] border-t border-zinc-200">
        <div className="max-w-[400px] mx-auto">
          <button
            type="button"
            disabled={!hasConsent}
            onClick={startScan}
            className="mx-6 my-4 w-[calc(100%-3rem)] h-14 rounded-full bg-black text-white font-semibold text-base disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
          >
            {isScanning ? "Scanning..." : "Scan Face"}
          </button>
        </div>
      </footer>
    </div>
  );
}
