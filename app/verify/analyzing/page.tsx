"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const statusSteps = ["ID Verified", "Liveness Check passed", "Calculating spending limit"];

export default function VerifyingScreen() {
  return (
    <Suspense fallback={<div className="min-h-screen max-w-[400px] mx-auto bg-[#FAF9F6]" />}>
      <VerifyingContent />
    </Suspense>
  );
}

function VerifyingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "fayda";
  const [progress, setProgress] = useState(8);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const p = window.setInterval(() => {
      setProgress((v) => Math.min(v + 8, 98));
    }, 420);
    const s = window.setInterval(() => {
      setStepIndex((v) => Math.min(v + 1, statusSteps.length - 1));
    }, 1200);
    const done = window.setTimeout(() => {
      router.push("/verify/profile?source=" + mode);
    }, 4200);

    return () => {
      window.clearInterval(p);
      window.clearInterval(s);
      window.clearTimeout(done);
    };
  }, [mode, router]);

  const currentSteps = useMemo(() => statusSteps.slice(0, stepIndex + 1), [stepIndex]);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#FAF9F6] px-6 pt-20">
      <h1 className="text-[28px] font-semibold tracking-tight text-zinc-900">
        Verifying your details with the National Registry...
      </h1>
      <p className="mt-3 text-sm text-zinc-500">
        Secure checks are running in real-time. This usually takes a few seconds.
      </p>

      <div className="mt-8 h-1.5 rounded-full bg-zinc-200 overflow-hidden">
        <motion.div
          className="h-full bg-[#31f5c2]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      <div className="mt-8 space-y-3">
        {currentSteps.map((step) => (
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-zinc-700"
          >
            {step}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
