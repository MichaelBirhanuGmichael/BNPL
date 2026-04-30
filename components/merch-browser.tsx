"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, RefreshCw, Share2, X } from "lucide-react";
import { LazyImage } from "@/components/lazy-image";
import { MereqOverlayCheckout } from "@/components/mereq-overlay-checkout";

type MerchBrowserProps = {
  merchantId: string;
  merchantName: string;
  merchantLogo: string;
  merchantUrl: string;
  productName: string;
  productPrice: number;
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
  hasNativeApp = false,
  onClose,
}: MerchBrowserProps) {
  const [showCheckoutOverlay, setShowCheckoutOverlay] = useState(false);
  const [isCardReady, setIsCardReady] = useState(false);
  const [activePlan, setActivePlan] = useState<"split" | "full" | null>(null);
  const [showAppPrompt, setShowAppPrompt] = useState(hasNativeApp);
  const [loadingProgress, setLoadingProgress] = useState(12);

  const screenshotUrl = useMemo(() => {
    const map: Record<string, string> = {
      samsung: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80",
      "m1": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
      "m5": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
      "m6": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    };
    return map[merchantId] ?? "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80";
  }, [merchantId]);

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
          <span className="truncate text-center font-mono tracking-wide">{merchantUrl}</span>
        </div>
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
            <LazyImage
              src={screenshotUrl}
              alt={`${merchantName} storefront`}
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto rounded-t-3xl bg-black/90 backdrop-blur-xl px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] z-30">
        <p className="text-white text-sm font-medium truncate">{productName}</p>
        <p className="text-[#D4FFF4] text-xs mt-1">
          {isCardReady && activePlan === "split"
            ? `Br ${splitAmount.toLocaleString("en-ET")} Installment Active`
            : activePlan === "full"
            ? `Full payment ready: Br ${productPrice.toLocaleString("en-ET")}`
            : `Pay Br ${splitAmount.toLocaleString("en-ET")} x 4`}
        </p>
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
          setShowCheckoutOverlay(false);
        }}
      />
    </div>
  );
}
