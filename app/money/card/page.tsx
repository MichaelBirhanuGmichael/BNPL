"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, CreditCard, MoreHorizontal, Plus, Store } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";

const MINT = "#31f5c2";

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
  const [history, setHistory] = useState<Txn[]>([
    { id: "t1", title: "CLAUDE.AI SUBSCRIPTION", subtitle: "Other", amount: "Br 77.16", card: "Declined", declined: true },
    { id: "t2", title: "Card repayment", subtitle: "MEREQ Card", amount: "+Br 900.00", card: "•••• 5390" },
  ]);

  const payEarly = () => {
    if (statementDue <= 0) return;
    setAvailable((v) => v + statementDue);
    setHistory((prev) => [
      { id: `t-${Date.now()}`, title: "Early payment", subtitle: "MEREQ Card", amount: `+Br ${statementDue.toFixed(2)}`, card: "•••• 5390" },
      ...prev,
    ]);
    setStatementDue(0);
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-white">
      <div className="px-6 pt-8 pb-28 space-y-5">
        <header className="flex items-center justify-between">
          <Link href="/money" className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-black" />
          </Link>
          <h1 className="text-2xl font-bold text-black">MEREQ Card</h1>
          <button className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-black" />
          </button>
        </header>

        <section className="rounded-3xl bg-[#F4F4F5] p-5">
          <p className="text-sm text-[#71717A]">Available</p>
          <div className="mt-2 inline-flex px-3 py-1 rounded-xl" style={{ backgroundColor: `${MINT}40` }}>
            <p className="text-[2.5rem] leading-none font-bold text-black">Br {available.toFixed(2)}</p>
          </div>
          <p className="mt-2 text-sm text-[#71717A]">Total limit Br 1,000.00</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="h-11 rounded-2xl bg-white text-black text-sm font-medium flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Top up
            </button>
            <Link href="/money/limits" className="h-11 rounded-2xl bg-white text-black text-sm font-medium flex items-center justify-center gap-2">
              <Store className="w-4 h-4" />
              Shop in-store
            </Link>
          </div>
        </section>

        <section className="rounded-3xl bg-[#F4F4F5] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black">April statement</h2>
            <span className="text-xs font-medium px-2 py-1 rounded-full text-[#0b7b64]" style={{ backgroundColor: `${MINT}40` }}>
              Active
            </span>
          </div>
          <div className="mt-3 rounded-2xl bg-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F4F4F5] flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-[#71717A]" />
              </div>
              <div>
                <p className="text-xl font-medium text-black">Br {statementDue.toFixed(2)}</p>
                <p className="text-sm text-[#71717A]">Due on 10 May · Statement balance</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#71717A]" />
          </div>
          <p className="mt-3 text-sm text-[#71717A]">Purchases made before or on 30 Apr are added to your current statement</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="h-11 rounded-2xl bg-white text-sm font-medium text-black">Autopay settings</button>
            <button
              onClick={payEarly}
              className="h-11 rounded-2xl bg-white text-sm font-medium text-black disabled:text-zinc-400"
              disabled={statementDue <= 0}
            >
              Pay early
            </button>
          </div>
        </section>

        <section className="rounded-3xl bg-[#F4F4F5] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-black">History</h2>
            <button className="px-3 py-1 rounded-full bg-white text-sm text-[#71717A]">View all</button>
          </div>
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black">{item.title}</p>
                  <p className="text-sm text-[#71717A]">{item.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-black">{item.amount}</p>
                  <p className={`text-sm ${item.declined ? "text-[#B4535F]" : "text-[#71717A]"}`}>{item.card}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <AppBottomNav active="money" />
    </div>
  );
}
