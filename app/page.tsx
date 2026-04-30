"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden max-w-[400px] mx-auto">
      <motion.img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80"
        alt="Premium shopping lifestyle"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-x-4 bottom-0 rounded-[2rem] border border-white/20 bg-white/12 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.35)] px-6 pt-7 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="text-white/80 font-semibold tracking-[0.26em] text-[11px] uppercase mb-4"
        >
          MEREQ
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.5 }}
          className="text-4xl font-bold tracking-tighter text-white leading-[1.05]"
        >
          Shop now. Pay with confidence.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.33, duration: 0.5 }}
          className="text-white/70 text-[15px] leading-7 mt-4"
        >
          Discover trusted merchants, split purchases responsibly, and build your credit profile with MEREQ.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
          className="flex items-center gap-2 bg-white/12 border border-white/20 px-4 py-2.5 rounded-2xl w-fit mt-6"
        >
          <Shield className="w-4 h-4 text-white/80" />
          <span className="text-xs font-medium text-white/85">Bank-grade security & buyer protection</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="mt-7 flex flex-col gap-3 w-full"
        >
          <button
            type="button"
            onClick={() => router.push("/auth/phone?flow=signup")}
            className="w-full bg-gradient-to-b from-[#1f1f1f] to-[#080808] text-white font-semibold text-lg py-4 rounded-full border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_24px_rgba(0,0,0,0.3)]"
          >
            Sign Up
          </button>
          <Link href="/login" className="text-center text-white text-sm underline underline-offset-4">
            Log In
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
