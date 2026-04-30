"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, CreditCard, Eye, EyeOff, ShieldCheck, Smartphone, Sparkles } from "lucide-react";

type MereqOverlayCheckoutProps = {
  open: boolean;
  merchantName: string;
  productName: string;
  totalPrice: number;
  onClose: () => void;
  initialPlan?: "split" | "full";
  initialStep?: "choose" | "generating" | "reveal" | "success";
  onPlanConfirmed: (plan: "split" | "full") => void;
};

type PaymentMethod = "saved-card" | "telebirr";
type OverlayStage = "choose" | "generating" | "reveal" | "success";
type PaymentPlan = "split" | "full";

function addMonths(base: Date, offset: number) {
  const date = new Date(base);
  date.setMonth(date.getMonth() + offset);
  return date;
}

export function MereqOverlayCheckout({
  open,
  merchantName,
  productName,
  totalPrice,
  onClose,
  initialPlan = "split",
  initialStep = "choose",
  onPlanConfirmed,
}: MereqOverlayCheckoutProps) {
  const [method, setMethod] = useState<PaymentMethod>("saved-card");
  const [plan, setPlan] = useState<PaymentPlan>(initialPlan);
  const [stage, setStage] = useState<OverlayStage>(initialStep);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  useEffect(() => {
    if (!open) return;
    setPlan(initialPlan);
    setStage(initialStep);
    setShowCardNumber(false);
    setCopied(false);
    setShowCopiedToast(false);
  }, [open, initialPlan, initialStep]);

  const installments = useMemo(() => {
    const each = totalPrice / 4;
    const now = new Date();
    return [
      { label: "Today", date: addMonths(now, 0), amount: each },
      { label: "In 1 Month", date: addMonths(now, 1), amount: each },
      { label: "In 2 Months", date: addMonths(now, 2), amount: each },
      { label: "In 3 Months", date: addMonths(now, 3), amount: each },
    ];
  }, [totalPrice]);

  const cardData = useMemo(
    () => ({
      number: "4242 8173 9204 1508",
      expiry: "09/29",
      cvv: "731",
      holder: "MEREQ ONE-TIME",
    }),
    []
  );

  const maskedNumber = "•••• •••• •••• 1508";
  const firstPayment = installments[0]?.amount ?? totalPrice / 4;

  const copyCardNumber = async () => {
    try {
      await navigator.clipboard.writeText(cardData.number.replace(/\s/g, ""));
      setCopied(true);
      setShowCopiedToast(true);
      window.setTimeout(() => {
        setCopied(false);
        setShowCopiedToast(false);
      }, 1400);
    } catch {
      setCopied(false);
      setShowCopiedToast(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/55 backdrop-blur-2xl z-[70]"
            onClick={onClose}
          />
          <motion.div
            layoutId="mereq-checkout-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 250 }}
            className="fixed left-0 right-0 bottom-0 max-w-[400px] mx-auto z-[80] bg-white rounded-t-[3rem] p-6"
            style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
          >
            {stage === "choose" ? (
              <>
                <motion.h3 layoutId="mereq-checkout-title" className="text-[24px] font-semibold tracking-tight text-zinc-900">
                  Choose payment method
                </motion.h3>
                <p className="text-sm text-zinc-500 mt-1">Select the way you want to complete this order.</p>
                <div className="mt-5 space-y-3">
                  <button
                    type="button"
                    onClick={() => setPlan("split")}
                    className={`w-full rounded-2xl border p-4 text-left ${
                      plan === "split" ? "border-[#31f5c2] bg-[#31f5c214]" : "border-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div layoutId="mereq-plan-split-icon" className="w-8 h-8 rounded-full bg-[#31f5c233] text-[#0f8d70] flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">Pay by MEREQ</p>
                        <p className="text-xs text-zinc-500">Split automatically into 4 monthly installments</p>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlan("full")}
                    className={`w-full rounded-2xl border p-4 text-left ${
                      plan === "full" ? "border-[#31f5c2] bg-[#31f5c214]" : "border-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div layoutId="mereq-plan-full-icon" className="w-8 h-8 rounded-full bg-[#2BA7FF22] text-[#2BA7FF] flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">Pay in Full</p>
                        <p className="text-xs text-zinc-500">0% interest, pay the full amount today</p>
                      </div>
                    </div>
                  </button>
                </div>
                {plan === "full" && (
                  <div className="mt-3 rounded-2xl border border-[#31f5c244] bg-[#31f5c214] px-3 py-2 text-xs text-zinc-700">
                    ✨ Unlocks higher limits. Paying in full now gets you Br 200 closer to your Br 1,500 limit boost.
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (plan === "split") {
                      setStage("generating");
                      window.setTimeout(() => setStage("reveal"), 1300);
                      return;
                    }
                    setStage("success");
                  }}
                  className="mt-5 w-full h-12 rounded-full bg-black text-white font-semibold"
                >
                  Continue
                </button>
              </>
            ) : stage === "generating" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[320px] flex flex-col items-center justify-center text-center">
                <motion.div
                  layoutId="mereq-plan-split-icon"
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-[#31f5c229] flex items-center justify-center"
                >
                  <ShieldCheck className="w-8 h-8 text-[#0f8d70]" />
                </motion.div>
                <p className="mt-4 text-base font-semibold tracking-tight text-zinc-900">
                  Securing your One-time Card for {merchantName}...
                </p>
              </motion.div>
            ) : stage === "reveal" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[280px]">
                <p className="text-lg font-semibold tracking-tight text-zinc-900">Your one-time card is ready</p>
                <p className="text-xs text-zinc-500 mt-1">Use these details at {merchantName} checkout.</p>
                <motion.div
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="mt-4 rounded-[1.8rem] bg-gradient-to-br from-black via-zinc-900 to-[#0f8d70] p-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.2em] font-semibold">MEREQ</span>
                    <motion.div layoutId="mereq-plan-split-icon">
                      <ShieldCheck className="w-4 h-4 text-[#31f5c2]" />
                    </motion.div>
                  </div>
                  <button type="button" onClick={copyCardNumber} className="mt-6 font-mono text-lg tracking-[0.15em] text-left">
                    {showCardNumber ? cardData.number : maskedNumber}
                  </button>
                  <p className="text-[10px] text-white/70 mt-1">Tap card number to copy</p>
                  <p className="text-[10px] text-white/70">{cardData.holder}</p>
                  <div className="mt-4 flex items-center justify-between text-[11px] font-mono">
                    <span>EXP {cardData.expiry}</span>
                    <span>CVV {showCardNumber ? cardData.cvv : "•••"}</span>
                  </div>
                </motion.div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCardNumber((v) => !v)}
                    className="h-10 px-3 rounded-full border border-zinc-200 text-sm font-medium text-zinc-700 flex items-center gap-1.5"
                  >
                    {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showCardNumber ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    onClick={copyCardNumber}
                    className="h-10 px-3 rounded-full bg-black text-white text-sm font-medium flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#31f5c2]" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Card Number"}
                  </button>
                </div>
                <div className="mt-5 w-full rounded-2xl border border-zinc-100 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-zinc-700">
                    <Copy className="w-4 h-4 text-[#0f8d70]" />
                    <span><strong>Copy:</strong> Tap the card details above.</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-700">
                    <CreditCard className="w-4 h-4 text-[#0f8d70]" />
                    <span><strong>Paste:</strong> Enter these details at merchant checkout.</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-700">
                    <Sparkles className="w-4 h-4 text-[#0f8d70]" />
                    <span><strong>Relax:</strong> We&apos;ll handle the rest in 4 easy installments.</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-zinc-500">
                  First payment of Br {firstPayment.toFixed(2)} will be charged to your{" "}
                  {method === "saved-card" ? "Linked Visa" : "Telebirr"} today.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onPlanConfirmed("split");
                    onClose();
                  }}
                  className="mt-5 w-full h-11 rounded-full bg-black text-white text-sm font-semibold"
                >
                  Done
                </button>
                {showCopiedToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed left-1/2 -translate-x-1/2 bottom-6 z-[90] px-3 py-2 rounded-full bg-[#31f5c2] text-black text-xs font-semibold"
                  >
                    Copied to clipboard
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[260px] flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 rounded-full bg-[#31f5c2] flex items-center justify-center"
                >
                  <Check className="w-10 h-10 text-black" />
                </motion.div>
                <p className="mt-6 text-lg font-semibold tracking-tight text-zinc-900">
                  Payment Authorized! Redirecting you back to complete the order.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onPlanConfirmed("full");
                    onClose();
                  }}
                  className="mt-5 px-4 py-2 rounded-full bg-black text-white text-sm font-semibold"
                >
                  Continue
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
