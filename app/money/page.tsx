"use client";

import Link from "next/link";
import { ChevronRight, Coins, CreditCard, Percent, ShoppingBag } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { useAvailableLimit } from "@/lib/limit-state";

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
  const availableLimit = useAvailableLimit();

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-white">
      <div className="px-4 pt-8 pb-28 space-y-5">
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

        <section className="space-y-4">
          <Link
            href="/money/card"
            className="block w-full rounded-[2.5rem] text-white px-6 py-6"
            style={{ background: "linear-gradient(135deg, #121212 0%, #2a2a2a 100%)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: MINT }}>
                  <CreditCard className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-3xl leading-none tracking-wide font-semibold">
                    Br {availableLimit.toLocaleString("en-ET")}
                  </p>
                  <p className="text-[12px] text-zinc-400 mt-1">Available Limit</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-300" />
            </div>
          </Link>

          <div
            className="w-full rounded-[2.5rem] text-white px-6 py-5"
            style={{ background: "linear-gradient(135deg, #121212 0%, #2a2a2a 100%)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/90 flex items-center justify-center">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Cashback</p>
                  <p className="text-3xl leading-none tracking-wide font-medium mt-1">Br 0.00</p>
                  <p className="text-[12px] text-zinc-400 mt-1">Earn cashback as you spend</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-300" />
            </div>
          </div>

          <Link href="/orders" className="block rounded-[2.5rem] bg-[#F9FAFB] border border-[#E5E7EB] text-black px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[#71717A]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Purchases</p>
                  <div className="mt-2 flex items-center">
                    {[
                      { logo: "No", bg: "#FEF08A", border: "#FDE047" },
                      { logo: "Sa", bg: "#E2E8F0", border: "#CBD5E1" },
                      { logo: "Sh", bg: "#DCFCE7", border: "#BBF7D0" },
                    ].map((item, i) => (
                      <span
                        key={item.logo}
                        className="w-7 h-7 rounded-full text-black text-[10px] font-medium flex items-center justify-center border-2 border-white"
                        style={{ backgroundColor: item.bg, boxShadow: `0 0 0 1px ${item.border}`, marginLeft: i === 0 ? 0 : -8 }}
                      >
                        {item.logo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-white border border-[#E5E7EB] text-xs flex items-center justify-center text-[#71717A]">4</span>
                <ChevronRight className="w-5 h-5 text-[#71717A]" />
              </div>
            </div>
          </Link>
        </section>

        <section className="rounded-[2.5rem] bg-[#F9FAFB] border border-[#E5E7EB] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-black">History</h2>
            <button className="px-3 py-1 text-sm rounded-full bg-white text-[#71717A]">View all</button>
          </div>
          <div className="space-y-5">
            {historyItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white border border-[#E5E7EB] py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-[#111827] bg-[#F1F5F9]">
                    {item.merchant.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">{item.merchant}</p>
                    <p className="text-xs text-[#71717A]">{item.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium tracking-wide text-black">{item.amount}</p>
                  <p className="text-xs text-[#71717A]">{item.card}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-[#F9FAFB] border border-[#E5E7EB] p-5">
          <h2 className="text-2xl font-bold text-black mb-3">Help centre</h2>
          <div className="divide-y divide-zinc-200">
            {helpItems.map((item) => (
              <button key={item} className="w-full py-3 flex items-center justify-between text-left">
                <span className="text-sm text-black">{item}</span>
                <ChevronRight className="w-4 h-4 text-[#71717A]" />
              </button>
            ))}
          </div>
        </section>
      </div>

      <AppBottomNav active="money" />
    </div>
  );
}
