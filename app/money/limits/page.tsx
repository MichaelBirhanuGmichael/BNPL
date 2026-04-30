"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";

const merchants = [
  { id: "m1", name: "Level Shoes", category: "Fashion", logo: "L" },
  { id: "m2", name: "Faces", category: "Fashion", logo: "F" },
  { id: "m3", name: "L'Occitane", category: "Activities", logo: "O" },
  { id: "m4", name: "Bloomingdale's", category: "Fashion", logo: "B" },
  { id: "m5", name: "Shoa Supermarket", category: "Restaurants & Food Delivery", logo: "S" },
  { id: "m6", name: "IKEA", category: "Home", logo: "I" },
];

const chips = ["Restaurants & Food Delivery", "Activities", "Fashion", "Home"] as const;

export default function MoneyLimitsPage() {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState<(typeof chips)[number]>("Restaurants & Food Delivery");
  const [selectedMerchant, setSelectedMerchant] = useState<(typeof merchants)[number] | null>(null);

  const filtered = useMemo(() => {
    return merchants.filter(
      (m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) &&
        (activeChip === "Restaurants & Food Delivery" ? true : m.category === activeChip)
    );
  }, [query, activeChip]);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-white">
      <div className="px-6 pt-8 pb-28">
        <header className="flex items-center gap-3 mb-5">
          <Link href="/money/card" className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-black" />
          </Link>
          <h1 className="text-2xl font-bold text-black">Boost in-store limits</h1>
        </header>

        <div className="sticky top-0 z-20 bg-white pb-3 space-y-3">
          <div className="flex items-center gap-2 rounded-full px-4 py-3 bg-[#F4F4F5]">
            <Search className="w-4 h-4 text-[#71717A]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm text-black placeholder:text-[#71717A]"
              placeholder="Search"
            />
          </div>
          <div className="flex overflow-x-auto gap-2 no-scrollbar">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-sm border ${
                  chip === activeChip ? "bg-black text-white border-black" : "bg-white text-[#71717A] border-zinc-200"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 divide-y divide-zinc-200">
          {filtered.map((merchant) => (
            <div key={merchant.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F4F4F5] text-black text-sm font-medium flex items-center justify-center">
                  {merchant.logo}
                </div>
                <p className="text-sm font-medium text-black">{merchant.name}</p>
              </div>
              <button
                onClick={() => setSelectedMerchant(merchant)}
                className="px-4 py-2 rounded-xl bg-[#EEF2F7] text-sm font-medium text-black"
              >
                Get limit
              </button>
            </div>
          ))}
        </div>
      </div>

      <AppBottomNav active="money" />

      <AnimatePresence>
        {selectedMerchant && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/45 backdrop-blur-md z-40"
              onClick={() => setSelectedMerchant(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto bg-white rounded-t-[32px] z-50 p-6"
              style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-black text-center">You can spend Br 1,000</h3>
              <p className="text-sm text-[#71717A] mt-2 text-center leading-relaxed">
                Would you like to spend more at {selectedMerchant.name}?
              </p>
              <button className="w-full mt-6 py-4 rounded-2xl bg-[#111827] text-white text-base font-medium">
                Yes, I would like more
              </button>
              <button
                onClick={() => setSelectedMerchant(null)}
                className="w-full mt-3 py-4 rounded-2xl bg-[#F4F4F5] text-[#71717A] text-base font-medium"
              >
                No, I&apos;m good
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
