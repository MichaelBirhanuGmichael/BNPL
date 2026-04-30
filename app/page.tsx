"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=1400&auto=format&fit=crop&q=80", // phones
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&auto=format&fit=crop&q=80", // products
  "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=1400&auto=format&fit=crop&q=80", // clothing
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1400&auto=format&fit=crop&q=80", // product
];

export default function OnboardingPage() {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-screen h-[100svh] min-h-[100svh] bg-black overflow-hidden overscroll-none"
      style={{ height: "100dvh" }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={heroImages[activeImage]}
          src={heroImages[activeImage]}
          alt="Premium shopping lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.15, ease: [0.4, 0, 0.2, 1] }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-20 px-5 pt-[max(env(safe-area-inset-top),1.75rem)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 backdrop-blur-md">
          <span className="text-[11px] tracking-[0.24em] font-semibold text-white/90">MEREQ</span>
          <Shield className="w-3.5 h-3.5 text-white/80" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="absolute left-1/2 -translate-x-1/2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] w-[92%] rounded-[2rem] border border-white/20 border-t-white/30 bg-white/12 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.35)] px-6 pt-7 pb-6"
      >
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
