"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  ChevronRight,
  CreditCard,
  MoreHorizontal,
  Plus,
  ShoppingBag,
  Store,
  Utensils,
  Plane,
  CheckCircle2,
} from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";

const MINT = "#05FFC4";

type Txn = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  card: string;
  declined?: boolean;
};

export default function MoneyCardPage() {
  const [available, setAvailable] = useState(1000);
  const [statementDue, setStatementDue] = useState(350);
  const [showTopUpSheet, setShowTopUpSheet] = useState(false);
  const [showPayEarlySheet, setShowPayEarlySheet] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [selectedTopUp, setSelectedTopUp] = useState(500);
  const [history, setHistory] = useState<Txn[]>([
    { id: "t1", title: "CLAUDE.AI SUBSCRIPTION", subtitle: "Other", amount: "Br 77.16", card: "Declined", declined: true },
    { id: "t2", title: "Card repayment", subtitle: "MEREQ Card", amount: "+Br 900.00", card: "Successful" },
  ]);

  const applyTopUp = () => {
    setAvailable((v) => v + selectedTopUp);
    setHistory((prev) => [
      {
        id: `t-topup-${Date.now()}`,
        title: "Top up",
        subtitle: "MEREQ Card",
        amount: `+Br ${selectedTopUp.toFixed(2)}`,
        card: "Successful",
      },
      ...prev,
    ]);
    setShowTopUpSheet(false);
  };

  const confirmPayEarly = () => {
    if (statementDue <= 0) return;
    setAvailable((v) => v + statementDue);
    setHistory((prev) => [
      {
        id: `t-${Date.now()}`,
        title: "Early payment",
        subtitle: "MEREQ Card",
        amount: `+Br ${statementDue.toFixed(2)}`,
        card: "Successful",
      },
      ...prev,
    ]);
    setStatementDue(0);
    setShowPayEarlySheet(false);
    setShowPaymentSuccess(true);
    setTimeout(() => setShowPaymentSuccess(false), 1500);
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-white tracking-tight overflow-x-hidden">
      <div className="px-4 pt-4 pb-28 space-y-6">
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm pt-3 pb-4">
          <div className="flex items-center justify-between">
            <Link href="/money" className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center transition-colors hover:bg-zinc-50">
              <ArrowLeft className="w-5 h-5 text-black" strokeWidth={1.5} />
            </Link>
            <h1 className="text-2xl font-bold text-black">MEREQ Card</h1>
            <button className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center transition-colors hover:bg-zinc-50">
              <MoreHorizontal className="w-5 h-5 text-black" strokeWidth={1.5} />
            </button>
          </div>
          <div className="mt-5 relative">
            <div className="pr-20">
              <p className="text-[11px] uppercase tracking-widest text-zinc-500">Available</p>
              <p className="mt-1 text-4xl leading-none tracking-tighter font-bold text-black whitespace-nowrap">
                <span className="text-2xl font-medium mr-1.5">Br</span>
                {available.toFixed(2)}
              </p>
              <p className="mt-2 text-[12px] text-[#71717A]">Total limit Br 1,000.00</p>
            </div>
            <div
              className="absolute -right-4 top-1 rounded-l-2xl w-[70px] h-[90px] px-2 py-2.5 flex flex-col items-center justify-between"
              style={{ backgroundColor: "#00FFAB", boxShadow: "inset 0 1px 8px rgba(255,255,255,0.4)" }}
            >
              <span />
              <p className="text-2xl font-medium leading-none text-black/70">₿</p>
              <p className="text-[10px] leading-none text-black/70">8120 &gt;</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => setShowTopUpSheet(true)}
              className="h-10 min-w-[140px] flex-1 rounded-2xl bg-white border shadow-sm text-black text-sm font-medium flex items-center justify-center gap-2 transition-colors hover:bg-zinc-50"
              style={{ borderColor: "#E5E7EB", borderWidth: 0.5 }}
            >
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              Top up
            </button>
            <Link
              href="/money/limits"
              className="h-10 min-w-[140px] flex-1 rounded-2xl bg-white border shadow-sm text-black text-sm font-medium flex items-center justify-center gap-2 transition-colors hover:bg-zinc-50"
              style={{ borderColor: "#E5E7EB", borderWidth: 0.5 }}
            >
              <Store className="w-4 h-4" strokeWidth={1.5} />
              Shop in-store
            </Link>
          </div>
        </header>

        <section className="rounded-[24px] bg-[#F8F9FA] shadow-sm p-5">
          <p className="text-sm text-[#71717A]">Limited April offer</p>
          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black">Earn 5% cashback</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center"><Utensils className="w-4 h-4" strokeWidth={1.5} /></span>
              <span className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center"><Plane className="w-4 h-4" strokeWidth={1.5} /></span>
              <span className="w-8 h-8 rounded-full bg-zinc-100 text-[#71717A] text-sm font-semibold flex items-center justify-center">+3</span>
            </div>
          </div>
          <button className="w-full mt-4 h-11 rounded-full bg-[#F3F4F6] text-sm font-medium text-black transition-colors hover:bg-zinc-50">Select categories</button>
        </section>

        <section className="rounded-[24px] bg-[#F8F9FA] shadow-sm p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black">April statement</h2>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full text-[#166534]" style={{ backgroundColor: `${MINT}40` }}>
              Active
            </span>
          </div>
          <div className="mt-3 rounded-2xl bg-white p-4 flex items-center justify-between shadow-sm transition-colors hover:bg-zinc-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F9FAFB] border border-zinc-100 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-[#71717A]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xl font-medium text-black">Br {statementDue.toFixed(2)}</p>
                <p className="text-sm text-[#71717A]">Due on 10 May · Statement balance</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#71717A]" strokeWidth={1.5} />
          </div>
          <p className="mt-3 text-sm text-[#71717A]">Purchases made before or on 30 Apr are added to your current statement</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="h-10 min-w-[140px] flex-1 rounded-2xl bg-gray-100/50 text-sm font-medium text-black transition-colors hover:bg-zinc-50">Autopay settings</button>
            <button
              onClick={() => setShowPayEarlySheet(true)}
              className="h-10 min-w-[140px] flex-1 rounded-2xl bg-white text-sm font-medium text-black disabled:text-zinc-400 transition-colors hover:bg-zinc-50"
              disabled={statementDue <= 0}
            >
              Pay early
            </button>
          </div>
        </section>

        <section className="rounded-[24px] bg-[#F8F9FA] shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-black">History</h2>
            <button className="px-3 py-1 rounded-full bg-[#F4F4F5] text-sm text-[#71717A] transition-colors hover:bg-zinc-50">View all</button>
          </div>
          <div className="space-y-5">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-zinc-100 shadow-sm py-4 px-4 flex items-center justify-between transition-colors hover:bg-zinc-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F3E8FF] text-[#6D28D9] flex items-center justify-center">
                    {item.title.toLowerCase().includes("claude") ? <Bot className="w-4 h-4" strokeWidth={1.5} /> : <CreditCard className="w-4 h-4 text-[#475569]" strokeWidth={1.5} />}
                  </div>
                  <div>
                  <p className="text-sm font-medium text-black">{item.title}</p>
                    <p className="text-sm text-[#71717A]">{item.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium tracking-wide text-black">{item.amount}</p>
                  <p className={`text-sm ${item.declined ? "text-[#B4535F]" : "text-black"}`}>{item.card}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <AppBottomNav active="money" />

      <AnimatePresence>
        {showTopUpSheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/35 backdrop-blur-xl z-[120]"
              onClick={() => setShowTopUpSheet(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto bg-white rounded-t-[32px] z-[130] p-6 pb-10"
              style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))" }}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-black">How much would you like to add?</h3>
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[100, 500, 1000].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSelectedTopUp(value)}
                    className={`h-11 rounded-2xl border text-sm font-medium ${
                      selectedTopUp === value ? "border-black bg-black text-white" : "border-[#F3F4F6] bg-white text-black"
                    } transition-colors hover:bg-zinc-50`}
                  >
                    Br {value}
                  </button>
                ))}
              </div>
              <button
                onClick={applyTopUp}
                className="w-full mt-5 py-4 rounded-2xl bg-[#000000] text-white text-base font-medium transition-colors hover:bg-zinc-900"
              >
                Confirm top up
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPayEarlySheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/35 backdrop-blur-xl z-[120]"
              onClick={() => setShowPayEarlySheet(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto bg-white rounded-t-[32px] z-[130] p-6 pb-10"
              style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))" }}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-black">Pay Br {statementDue.toFixed(2)} now using Telebirr?</h3>
              <button
                onClick={confirmPayEarly}
                className="w-full mt-6 py-4 rounded-2xl bg-[#000000] text-white text-base font-medium transition-colors hover:bg-zinc-900"
              >
                Confirm payment
              </button>
              <button
                onClick={() => setShowPayEarlySheet(false)}
                className="w-full mt-3 py-4 rounded-2xl bg-[#F4F4F5] text-[#111827] text-base font-medium transition-colors hover:bg-zinc-50"
              >
                Cancel
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPaymentSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[150] bg-white border border-[#F3F4F6] shadow-sm rounded-2xl px-4 py-3 flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-[#31f5c2]" />
            <span className="text-sm font-medium text-black">Payment successful</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
