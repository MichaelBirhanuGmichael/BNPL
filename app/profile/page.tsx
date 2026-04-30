"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, LogOut } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { mockDashboardData } from "@/data/mockDashboardData";
import { useCreditBuilderProgress } from "@/lib/credit-builder-state";

const settingsItems = [
  "Personal Information",
  "Payment Methods",
  "Notifications",
];

export default function ProfilePage() {
  const router = useRouter();
  const creditBuilderProgress = useCreditBuilderProgress();
  const transactionProgress =
    (creditBuilderProgress.transactionsCurrent / mockDashboardData.creditBuilder.transactions.required) * 100;
  const remainingTransactions = Math.max(
    mockDashboardData.creditBuilder.transactions.required - creditBuilderProgress.transactionsCurrent,
    0
  );

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto relative overflow-hidden">
      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28 }} className="flex h-screen flex-col">
        <div className="flex-1 overflow-y-auto px-4 pb-28 pt-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Profile</h1>

          <div className="mt-5 flex items-center gap-3 rounded-[2.5rem] bg-[#F9FAFB] border border-[#E5E7EB] p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F3F4] text-xl font-bold text-[#1A1A1A]">
              AK
            </div>
            <div>
              <p className="text-lg font-semibold text-[#1A1A1A]">Abebe Kebede</p>
              <p className="text-sm text-[#6B7280]">MEREQ Member</p>
            </div>
          </div>

          <section className="mt-5 rounded-[2.5rem] bg-[#F8FAFC] border border-[#E5E7EB] p-5">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#E7F6EE] text-[#0E7A4E]">
              Level Up
            </p>
            <h2 className="text-xl font-bold text-[#1A1A1A] mt-3">
              Credit Builder Target Br {mockDashboardData.wallet.lockedTierEtb.toLocaleString("en-ET")}
            </h2>
            <div className="h-3 rounded-full bg-[#E5E7EB] overflow-hidden mt-3">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${transactionProgress}%` }} />
            </div>
            <p className="text-sm text-[#6B7280] mt-3">
              {creditBuilderProgress.transactionsCurrent}/{mockDashboardData.creditBuilder.transactions.required} complete. {remainingTransactions} more Pay-in-Full transactions to unlock full limit.
            </p>
          </section>

          <section className="mt-5 rounded-[2.5rem] bg-white border border-[#E5E7EB] p-5">
            <h3 className="text-4 font-bold text-[#1A1A1A]">Own a business?</h3>
            <p className="mt-2 text-[#6B7280] leading-relaxed">
              Upload your TIN to skip the wait and unlock up to 3,000 Br instantly.
            </p>
            <button className="mt-4 rounded-full border border-emerald-500 px-4 py-2 text-emerald-600 font-semibold">
              Verify Business
            </button>
          </section>

          <section className="mt-5 rounded-[2.5rem] bg-[#F9FAFB] border border-[#E5E7EB] p-2">
            {settingsItems.map((item) => (
              <button key={item} className="w-full flex items-center justify-between rounded-2xl px-3 py-3 text-left">
                <span className="text-sm font-medium text-[#1A1A1A]">{item}</span>
                <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full flex items-center justify-between rounded-2xl px-3 py-3 text-left"
            >
              <span className="text-sm font-semibold text-[#DC2626]">Log Out</span>
              <LogOut className="h-4 w-4 text-[#DC2626]" />
            </button>
          </section>
        </div>

        <AppBottomNav active="profile" />
      </motion.div>
    </div>
  );
}
