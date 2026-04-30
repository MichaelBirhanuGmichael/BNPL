"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X } from "lucide-react";
import { LazyImage } from "@/components/lazy-image";

type MerchBrowserProps = {
  merchantId: string;
  merchantName: string;
  merchantLogo: string;
  merchantUrl: string;
  hasNativeApp?: boolean;
  onClose: () => void;
};

export function MerchBrowser({
  merchantId,
  merchantName,
  merchantLogo,
  merchantUrl,
  hasNativeApp = false,
  onClose,
}: MerchBrowserProps) {
  const [showHowToPay, setShowHowToPay] = useState(false);
  const [showAppPrompt, setShowAppPrompt] = useState(hasNativeApp);

  const screenshotUrl = useMemo(() => {
    const map: Record<string, string> = {
      "m1": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
      "m5": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
      "m6": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    };
    return map[merchantId] ?? "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80";
  }, [merchantId]);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-white relative overflow-hidden">
      <div className="sticky top-0 z-30 px-4 pt-4 pb-3 bg-white/70 backdrop-blur-xl border-b border-zinc-100 flex items-center gap-2">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
          <X className="w-4 h-4 text-zinc-700" />
        </button>
        <div className="flex-1 h-8 rounded-full bg-zinc-100 flex items-center px-3 gap-2 text-xs text-zinc-700">
          <Lock className="w-3.5 h-3.5" />
          <span className="truncate">{merchantUrl}</span>
        </div>
      </div>

      <div className="px-4 pt-4 pb-40">
        <div className="rounded-3xl overflow-hidden border border-zinc-100 shadow-sm">
          <div className="h-[430px] bg-zinc-100">
            <LazyImage
              src={screenshotUrl}
              alt={`${merchantName} storefront`}
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto rounded-t-3xl bg-black px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] z-30">
        <p className="text-white text-sm leading-relaxed">
          Shop as usual. At checkout, select MEREQ to split your payment in 4.
        </p>
        <button
          onClick={() => setShowHowToPay(true)}
          className="mt-3 px-3 py-2 rounded-full text-xs font-semibold text-black"
          style={{ backgroundColor: "#31f5c2" }}
        >
          How to pay
        </button>
      </div>

      <AnimatePresence>
        {showHowToPay && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHowToPay(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto bg-white rounded-t-[28px] z-50 p-6"
              style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
            >
              <h3 className="text-lg font-semibold text-black">Pay with MEREQ in 3 steps</h3>
              <ol className="mt-3 space-y-2 text-sm text-zinc-600">
                <li>1. Add items and proceed to checkout.</li>
                <li>2. Choose MEREQ as your payment method.</li>
                <li>3. Confirm split in 4 and place your order.</li>
              </ol>
              <button
                onClick={() => setShowHowToPay(false)}
                className="mt-5 w-full h-11 rounded-2xl bg-black text-white text-sm font-medium"
              >
                Got it
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                className="mt-5 w-full h-11 rounded-2xl bg-black text-white text-sm font-medium"
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
    </div>
  );
}
