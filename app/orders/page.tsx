"use client";

import { useState } from "react";
import Link from "next/link";
import { AppBottomNav } from "@/components/app-bottom-nav";

export default function OrdersPage() {
  const [tab, setTab] = useState<"ACTIVE" | "PAID_OFF">("ACTIVE");

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto relative overflow-hidden">
      <div className="flex h-screen flex-col pb-6 pt-8">

        <div className="px-5">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">My Orders</h1>
        </div>

        <div className="mt-4 inline-flex w-full rounded-2xl bg-[#F2F4F5] p-1 mx-5">
          <button
            type="button"
            onClick={() => setTab("ACTIVE")}
            className={`h-10 flex-1 rounded-xl text-sm font-semibold ${
              tab === "ACTIVE" ? "bg-white text-[#1A1A1A] shadow-sm" : "text-[#6B7280]"
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setTab("PAID_OFF")}
            className={`h-10 flex-1 rounded-xl text-sm font-semibold ${
              tab === "PAID_OFF" ? "bg-white text-[#1A1A1A] shadow-sm" : "text-[#6B7280]"
            }`}
          >
            Paid Off
          </button>
        </div>

        <div className="mt-6 space-y-4 overflow-y-auto pb-24 px-5">
          <Link
            href="/order/1"
            className="block rounded-3xl border border-[#ECEFF1] p-4 text-left shadow-[0_12px_28px_rgba(26,26,26,0.06)]"
          >
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"
                alt="Samsung TV"
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="text-base font-semibold text-[#1A1A1A]">
                  Samsung 55&apos; Smart TV
                </p>
                <p className="mt-1 text-sm font-medium text-[#4B5563]">45,000 ETB</p>
                <span className="mt-3 inline-flex rounded-full bg-[#E8F9F1] px-3 py-1 text-xs font-semibold text-[#0F8A55]">
                  Next payment in 12 days
                </span>
              </div>
            </div>
          </Link>

          <div className="rounded-3xl border border-[#ECEFF1] p-4 shadow-[0_12px_28px_rgba(26,26,26,0.04)]">
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
                alt="Nike shoes"
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="text-base font-semibold text-[#1A1A1A]">Nike Air Max</p>
                <p className="mt-1 text-sm font-medium text-[#4B5563]">8,500 ETB</p>
                <span className="mt-3 inline-flex rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-semibold text-[#6B7280]">
                  Paid off
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppBottomNav active="orders" />
    </div>
  );
}
