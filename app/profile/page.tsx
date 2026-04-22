"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Gift,
  Globe,
  Headphones,
  Lock,
  LogOut,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { MainTopNav } from "@/components/main-top-nav";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.28 }}
        className="flex h-screen flex-col"
      >
        <MainTopNav />
        <div className="flex-1 overflow-y-auto px-5 pb-32 pt-1">
          <div className="flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F1F3F4] text-3xl font-bold text-[#1A1A1A]">
              AK
            </div>
            <div className="mt-4 flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1A1A1A]">Abebe Kebede</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F9F1] px-2.5 py-1 text-xs font-semibold text-[#0E7A4E]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Fayda Verified
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#F9F9F9] p-4">
            <div>
              <p className="text-xs text-[#6B7280]">Total BNPL Limit</p>
              <p className="mt-1 text-xl font-bold text-[#1A1A1A]">1,500 ETB</p>
            </div>
            <button type="button" className="text-sm font-semibold text-[#00D084]">
              How to increase?
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-[#D9F5E8] bg-gradient-to-r from-[#EFFFF7] to-white p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white p-2 text-[#00D084] shadow-sm">
                <Gift className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  Invite friends &amp; earn up to 300 ETB
                </p>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Get 30 ETB for every friend who joins MEREQ.
                </p>
                <button
                  type="button"
                  className="mt-3 rounded-full border border-[#00D084] px-3 py-1.5 text-xs font-semibold text-[#0E7A4E]"
                >
                  Copy Invite Link
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-[#1A1A1A]">Business &amp; Growth</p>
            <button
              type="button"
              className="mt-2 flex w-full items-start gap-3 rounded-2xl border border-[#ECEFF1] bg-white p-4 text-left shadow-[0_8px_22px_rgba(26,26,26,0.05)]"
            >
              <div className="rounded-xl bg-[#F2FBF7] p-2 text-[#00D084]">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  Boost your limit with Business Docs
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                  Own a shop or freelance? Upload your TIN or Trade License to unlock up
                  to 5,000 ETB instantly.
                </p>
              </div>
              <BriefcaseBusiness className="mt-0.5 h-4.5 w-4.5 text-[#9CA3AF]" />
            </button>
          </div>

          <div className="mt-5 space-y-2">
            <SettingRow
              icon={<Wallet className="h-5 w-5 text-[#1A1A1A]" />}
              title="Payment Methods"
              subtitle="Telebirr, Bank Accounts"
            />
            <SettingRow
              icon={<User className="h-5 w-5 text-[#1A1A1A]" />}
              title="Personal Details"
              subtitle="Phone, Fayda ID"
            />
            <SettingRow
              icon={<Globe className="h-5 w-5 text-[#1A1A1A]" />}
              title="Language"
              subtitle="English / Amharic"
            />
            <SettingRow
              icon={<Lock className="h-5 w-5 text-[#1A1A1A]" />}
              title="Security"
              subtitle="PIN & Biometrics"
            />
            <SettingRow
              icon={<Headphones className="h-5 w-5 text-[#1A1A1A]" />}
              title="Help & Support"
              subtitle="Contact MEREQ Care"
            />
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl bg-[#F9F9F9] px-3 py-3 text-left"
            >
              <LogOut className="h-5 w-5 text-[#DC2626]" />
              <span className="text-sm font-semibold text-[#DC2626]">Logout</span>
            </button>
          </div>
        </div>

        <AppBottomNav active="profile" />
      </motion.div>
    </div>
  );
}

function SettingRow({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button type="button" className="flex w-full items-center gap-3 rounded-2xl bg-[#F9F9F9] px-3 py-3 text-left">
      {icon}
      <div>
        <p className="text-sm font-semibold text-[#1A1A1A]">{title}</p>
        <p className="text-xs text-[#6B7280]">{subtitle}</p>
      </div>
    </button>
  );
}

