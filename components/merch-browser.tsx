"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, RefreshCw, Share2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { LazyImage } from "@/components/lazy-image";
import { MereqOverlayCheckout } from "@/components/mereq-overlay-checkout";
import { markPayInFullCredit } from "@/lib/credit-builder-state";

type MerchBrowserProps = {
  merchantId: string;
  merchantName: string;
  merchantLogo: string;
  merchantUrl: string;
  productName: string;
  productPrice: number;
  productUrl: string;
  hasNativeApp?: boolean;
  onClose: () => void;
};

export function MerchBrowser({
  merchantId,
  merchantName,
  merchantLogo,
  merchantUrl,
  productName,
  productPrice,
  productUrl,
  hasNativeApp = false,
  onClose,
}: MerchBrowserProps) {
  const router = useRouter();
  const [showCheckoutOverlay, setShowCheckoutOverlay] = useState(false);
  const [isCardReady, setIsCardReady] = useState(false);
  const [activePlan, setActivePlan] = useState<"split" | "full" | null>(null);
  const [showAppPrompt, setShowAppPrompt] = useState(hasNativeApp);
  const [showCelebration, setShowCelebration] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(12);

  const splitAmount = Math.round(productPrice / 4);

  useEffect(() => {
    setLoadingProgress(16);
    const timer = window.setInterval(() => {
      setLoadingProgress((v) => {
        const next = Math.min(v + 14, 100);
        if (next >= 100) window.clearInterval(timer);
        return next;
      });
    }, 170);
    return () => window.clearInterval(timer);
  }, [merchantId]);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-white relative overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-[#31f5c2] z-40"
        animate={{ width: `${loadingProgress}%` }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      <div className="sticky top-0 z-30 px-4 pt-4 pb-3 bg-white/70 backdrop-blur-xl border-b border-zinc-100 flex items-center gap-2">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
          <X className="w-4 h-4 text-zinc-700" />
        </button>
        <div className="flex-1 h-8 rounded-full bg-zinc-100 flex items-center justify-center px-3 gap-2 text-xs text-zinc-700">
          <Lock className="w-3.5 h-3.5" />
          <span className="truncate text-center font-mono tracking-wide">{productUrl}</span>
        </div>
        <span className="text-[10px] font-semibold text-[#0f8d70] bg-[#31f5c226] px-2 py-1 rounded-full">Secure by MEREQ</span>
        <button className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
          <Share2 className="w-4 h-4 text-zinc-700" />
        </button>
        <button className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
          <RefreshCw className="w-4 h-4 text-zinc-700" />
        </button>
      </div>

      <div className="px-4 pt-3 pb-[calc(7rem+env(safe-area-inset-bottom))]">
        <div className="rounded-3xl overflow-hidden border border-zinc-100 shadow-sm">
          <div className="h-[calc(100dvh-11.5rem-env(safe-area-inset-bottom))] bg-zinc-100">
            <iframe title={`${merchantName} product page`} src={productUrl} className="w-full h-full border-0" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto rounded-t-3xl bg-black/90 backdrop-blur-xl px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] z-30">
        <p className="text-white text-sm font-medium truncate">{productName}</p>
        <p className="text-[#D4FFF4] text-xs mt-1">
          {isCardReady && activePlan === "split"
            ? `Card Ready for Checkout`
            : activePlan === "full"
            ? `Full payment ready: Br ${productPrice.toLocaleString("en-ET")}`
            : `Pay by MEREQ - 4 monthly installments of Br ${splitAmount.toLocaleString("en-ET")}`}
        </p>
        {isCardReady && activePlan === "split" && (
          <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-[#CFFFEF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#31f5c2] animate-pulse" />
            One-time card active for checkout
          </div>
        )}
        <button
          onClick={() => setShowCheckoutOverlay(true)}
          className="mt-3 px-4 py-2 rounded-full text-xs font-semibold text-black bg-[#31f5c2]"
        >
          {isCardReady && activePlan === "split" ? "View Card" : "Pay with MEREQ"}
        </button>
      </div>

      <AnimatePresence>
        {showAppPrompt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/45 backdrop-blur-xl z-40"
              onClick={() => setShowAppPrompt(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto bg-white rounded-t-[28px] z-50 p-6"
              style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
            >
              <div className="flex items-center gap-3">
                <LazyImage
                  src={merchantLogo}
                  alt={merchantName}
                  wrapperClassName="w-10 h-10 rounded-full border border-zinc-200"
                  className="w-full h-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-black">Open {merchantName} app?</p>
                  <p className="text-xs text-zinc-500">Premium handoff experience</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
                For the best experience, open the {merchantName} app. We&apos;ve pre-loaded your MEREQ discount there.
              </p>
              <button
                onClick={() => setShowAppPrompt(false)}
                className="mt-5 w-full h-11 rounded-2xl bg-gradient-to-r from-[#121212] to-[#2a2a2a] text-white text-sm font-medium"
              >
                Open App
              </button>
              <button
                onClick={() => setShowAppPrompt(false)}
                className="mt-3 w-full h-11 rounded-2xl bg-zinc-100 text-zinc-800 text-sm font-medium"
              >
                Continue in Browser
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-black/70 backdrop-blur-xl flex items-center justify-center px-6"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 24 }).map((_, index) => (
                <motion.span
                  key={`confetti-${index}`}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: index % 2 === 0 ? "#31f5c2" : "#ffffff", left: `${(index * 13) % 100}%` }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: "100vh", opacity: [0, 1, 0], rotate: 220 }}
                  transition={{ duration: 1.8, delay: (index % 8) * 0.08, ease: "easeInOut" }}
                />
              ))}
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative z-10 w-full max-w-[320px] rounded-[2rem] bg-white p-6 text-center"
            >
              <p className="text-lg font-semibold tracking-tight text-zinc-900">
                Purchase Successful! You are now 1 step closer to a Br 1,500 limit.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MereqOverlayCheckout
        open={showCheckoutOverlay}
        merchantName={merchantName}
        productName={productName}
        totalPrice={productPrice}
        onClose={() => setShowCheckoutOverlay(false)}
        initialPlan={activePlan ?? "split"}
        initialStep={isCardReady && activePlan === "split" ? "reveal" : "choose"}
        onPlanConfirmed={(plan) => {
          setActivePlan(plan);
          setIsCardReady(plan === "split");
          if (plan === "full") {
            markPayInFullCredit(productPrice);
            setShowCelebration(true);
            window.setTimeout(() => {
              setShowCelebration(false);
              router.push("/money");
            }, 2100);
            return;
          }
          router.push("/money");
          setShowCheckoutOverlay(false);
        }}
      />
    </div>
  );
}
