"use client";

import Link from "next/link";
import { ChevronRight, Coins, CreditCard, History, Percent, ShoppingBag } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";

const MINT = "#31f5c2";

const historyItems = [
  { id: "h1", merchant: "Noon", status: "Payment 3 of 4", amount: "+Br 40.76", card: "•••• 5390" },
  { id: "h2", merchant: "Samsung", status: "Payment 3 of 4", amount: "+Br 25.75", card: "•••• 5390" },
  { id: "h3", merchant: "Shoa", status: "Payment 1 of 4", amount: "+Br 120.00", card: "•••• 5390" },
];

const helpItems = [
  "How does my MEREQ Card work?",
  "How do I shop online and in-store?",
  "How do I pay for my purchases?",
  "How does MEREQ Cashback work?",
];

export default function MoneyPage() {
  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-white">
      <div className="px-6 pt-8 pb-28 space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Money</h1>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-black"
            style={{ backgroundColor: `${MINT}40` }}
          >
            <Coins className="w-4 h-4" />
            Earn cashback
          </button>
        </header>

        <section className="space-y-3">
          <Link href="/money/card" className="block rounded-3xl bg-[#111827] text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: MINT }}>
                  <CreditCard className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-sm font-medium">MEREQ Card</p>
                  <p className="text-3xl leading-none font-bold mt-1">Br 1,000</p>
                  <p className="text-sm text-zinc-300 mt-1">Total limit Br 1,000</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-300" />
            </div>
          </Link>

          <div className="rounded-3xl bg-[#111827] text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/90 flex items-center justify-center">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Cashback</p>
                  <p className="text-3xl leading-none font-bold mt-1">Br 0.00</p>
                  <p className="text-sm text-zinc-300 mt-1">Earn cashback as you spend</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-300" />
            </div>
          </div>

          <Link href="/orders" className="block rounded-3xl bg-[#111827] text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/90 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Purchases</p>
                  <div className="mt-2 flex items-center">
                    {["No", "Sa", "Sh"].map((logo, i) => (
                      <span
                        key={logo}
                        className="w-7 h-7 rounded-full bg-yellow-300 text-black text-[10px] font-bold flex items-center justify-center border-2 border-[#111827]"
                        style={{ marginLeft: i === 0 ? 0 : -8 }}
                      >
                        {logo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-white/10 text-xs flex items-center justify-center">4</span>
                <ChevronRight className="w-5 h-5 text-zinc-300" />
              </div>
            </div>
          </Link>
        </section>

        <section className="rounded-3xl bg-[#F4F4F5] p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-black">History</h2>
            <button className="px-3 py-1 text-sm rounded-full bg-white text-[#71717A]">View all</button>
          </div>
          <div className="space-y-3">
            {historyItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white p-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center text-xs font-bold">{item.merchant[0]}</div>
                  <div>
                    <p className="text-sm font-medium text-black">{item.merchant}</p>
                    <p className="text-xs text-[#71717A]">{item.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-black">{item.amount}</p>
                  <p className="text-xs text-[#71717A]">{item.card}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[#F4F4F5] p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-black">Help centre</h2>
            <button className="px-3 py-1 text-sm rounded-full bg-white text-[#71717A]">View all</button>
          </div>
          <div className="divide-y divide-zinc-200">
            {helpItems.map((item) => (
              <button key={item} className="w-full py-3 flex items-center justify-between text-left">
                <span className="text-sm text-black">{item}</span>
                <ChevronRight className="w-4 h-4 text-[#71717A]" />
              </button>
            ))}
          </div>
        </section>

        <Link href="/money/limits" className="block text-center text-sm text-[#71717A] underline underline-offset-4">
          Need more? Boost in-store limits
        </Link>
      </div>

      <AppBottomNav active="money" />
    </div>
  );
}
