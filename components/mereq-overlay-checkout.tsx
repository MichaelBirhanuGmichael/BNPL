"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, CreditCard, Eye, EyeOff, ShieldCheck, Smartphone, Sparkles } from "lucide-react";

type MereqOverlayCheckoutProps = {
  open: boolean;
  merchantName: string;
  productName: string;
  totalPrice: number;
  onClose: () => void;
  initialPlan?: "split" | "full";
  initialStep?: "choose" | "review" | "reveal" | "success";
  onPlanConfirmed: (plan: "split" | "full") => void;
};

type PaymentMethod = "saved-card" | "telebirr";
type OverlayStage = "choose" | "review" | "generating" | "reveal" | "success";
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

  const confirmPayment = () => {
    if (stage !== "review") return;
    if (plan === "split") {
      setStage("generating");
      window.setTimeout(() => {
        setStage("reveal");
        onPlanConfirmed("split");
      }, 1600);
      return;
    }
    onPlanConfirmed("full");
    setStage("success");
  };

  const copyCardNumber = async () => {
    try {
      await navigator.clipboard.writeText(cardData.number.replace(/\s/g, ""));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
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
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 250 }}
            className="fixed left-0 right-0 bottom-0 max-w-[400px] mx-auto z-[80] bg-white rounded-t-[3rem] p-6"
            style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
          >
            {stage === "choose" ? (
              <>
                <h3 className="text-[24px] font-semibold tracking-tight text-zinc-900">Choose payment method</h3>
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
                      <div className="w-8 h-8 rounded-full bg-[#31f5c233] text-[#0f8d70] flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">Pay in 4</p>
                        <p className="text-xs text-zinc-500">Interest-free, split over 3 months</p>
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
                      <div className="w-8 h-8 rounded-full bg-[#2BA7FF22] text-[#2BA7FF] flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">Pay in Full</p>
                        <p className="text-xs text-zinc-500">0% interest, pay the full amount today</p>
                      </div>
                    </div>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setStage("review")}
                  className="mt-5 w-full h-12 rounded-full bg-black text-white font-semibold"
                >
                  Continue
                </button>
              </>
            ) : stage === "review" ? (
              <>
                <h3 className="text-[24px] font-semibold tracking-tight text-zinc-900">Review & Confirm</h3>
                <p className="text-sm text-zinc-500 mt-1">
                  {plan === "split"
                    ? "We’ll create a temporary card for this purchase. You pay us in 4, and we pay the merchant in full."
                    : `You are paying ${merchantName} in full today via your linked payment method.`}
                </p>
                <p className="text-xs text-zinc-500 mt-2">
                  {plan === "split"
                    ? `Br ${firstPayment.toFixed(2)} will be charged to your ${method === "saved-card" ? "Linked Visa" : "Telebirr"} today.`
                    : `Br ${totalPrice.toFixed(2)} will be charged to your ${method === "saved-card" ? "Visa" : "Telebirr"} today.`}
                </p>

                {plan === "split" && (
                  <div className="mt-5 rounded-[2rem] bg-[#F8F9FB] p-4 space-y-3">
                    {installments.map((item, index) => (
                      <div key={`${item.label}-${index}`} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{item.label}</p>
                          <p className="text-xs text-zinc-500">
                            {item.date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-zinc-900">Br {item.amount.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-5 text-xs tracking-wide uppercase text-zinc-500">Payment method</p>
                <div className="mt-2 space-y-2">
                  <button
                    type="button"
                    onClick={() => setMethod("saved-card")}
                    className={`w-full rounded-2xl border p-4 flex items-center justify-between ${
                      method === "saved-card" ? "border-[#31f5c2] bg-[#31f5c214]" : "border-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-zinc-700" />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-zinc-900">Visa / Mastercard</p>
                        <p className="text-xs text-zinc-500">Visa ending in · 4242</p>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500 underline underline-offset-2">Change card</span>
                    {method === "saved-card" && <Check className="w-4 h-4 text-[#0f8d70]" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod("telebirr")}
                    className={`w-full rounded-2xl border p-4 flex items-center justify-between ${
                      method === "telebirr" ? "border-[#31f5c2] bg-[#31f5c214]" : "border-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#2BA7FF]/20 text-[#2BA7FF] flex items-center justify-center text-[11px] font-bold">
                        T
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-zinc-900">Telebirr / Mobile Money</p>
                        <p className="text-xs text-zinc-500">Secure mobile authorization</p>
                      </div>
                    </div>
                    {method === "telebirr" ? <Check className="w-4 h-4 text-[#0f8d70]" /> : <Smartphone className="w-4 h-4 text-zinc-400" />}
                  </button>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Virtual Card is only required for In-Store purchases.</p>

                <button
                  type="button"
                  onClick={confirmPayment}
                  className="mt-5 w-full h-12 rounded-full bg-black text-white font-semibold"
                >
                  Confirm Payment
                </button>
              </>
            ) : stage === "generating" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[320px] flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  className="w-9 h-9 border-2 border-zinc-200 border-t-[#31f5c2] rounded-full"
                />
                <p className="mt-4 text-base font-semibold tracking-tight text-zinc-900">Generating your secure card...</p>
              </motion.div>
            ) : stage === "reveal" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[280px]"
              >
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
                    <ShieldCheck className="w-4 h-4 text-[#31f5c2]" />
                  </div>
                  <p className="mt-6 font-mono text-lg tracking-[0.15em]">
                    {showCardNumber ? cardData.number : maskedNumber}
                  </p>
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
                  onClick={onClose}
                  className="mt-5 w-full h-11 rounded-full bg-black text-white text-sm font-semibold"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[260px] flex flex-col items-center justify-center text-center"
              >
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
                  onClick={onClose}
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
