"use client";

import Link from "next/link";
import { ArrowLeft, Check, Circle } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto relative overflow-hidden">
      <div className="flex h-screen flex-col px-5 pb-6 pt-5">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-[#F4F6F7]"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">My Orders</h1>
        </div>

        <div className="mt-6 inline-flex w-full rounded-2xl bg-[#F2F4F5] p-1">
          <button
            type="button"
            className="h-10 flex-1 rounded-xl bg-white text-sm font-semibold text-[#1A1A1A] shadow-sm"
          >
            Active
          </button>
          <button
            type="button"
            className="h-10 flex-1 rounded-xl text-sm font-semibold text-[#6B7280]"
          >
            Paid Off
          </button>
        </div>

        <Link
          href="/order/1"
          className="mt-6 rounded-3xl border border-[#ECEFF1] p-4 text-left shadow-[0_12px_28px_rgba(26,26,26,0.06)]"
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

        <div className="mt-5 rounded-2xl border border-[#E8EEF2] p-4">
          <div className="mb-4 space-y-5">
            <StepperRow
              icon={
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00D084] text-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              }
              title="1st Installment: Paid Apr 22"
              amount="1,500 ETB"
              showLine
            />
            <StepperRow
              icon={
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#8FA3B6] bg-[#F4F7FA]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7C8FA6] animate-pulse" />
                </span>
              }
              title="2nd Installment: Due May 22"
              amount="1,500 ETB"
              showLine
            />
            <StepperRow
              icon={
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#CBD5E1] bg-white text-[#94A3B8]">
                  <Circle className="h-3.5 w-3.5 fill-transparent" />
                </span>
              }
              title="3rd Installment: Due Jun 22"
              amount="1,500 ETB"
            />
          </div>

          <div className="rounded-3xl border border-[#BEEFD9] bg-[#ECFCF5] p-4">
            <p className="text-sm leading-relaxed text-[#1A1A1A]">
              Problem with this item? We can pause your payments while we help
              you resolve it.
            </p>
            <Link
              href="/order/1"
              className="mt-4 inline-flex rounded-full border border-[#00D084] px-4 py-2 text-sm font-semibold text-[#0E7A4E] transition hover:bg-[#E1FAEE]"
            >
              Report an Issue / Get Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepperRow({
  icon,
  title,
  amount,
  showLine = false,
}: {
  icon: React.ReactNode;
  title: string;
  amount: string;
  showLine?: boolean;
}) {
  return (
    <div className="relative flex gap-3">
      <div className="relative flex w-7 justify-center">
        {icon}
        {showLine && (
          <span className="absolute top-8 h-10 w-[2px] rounded-full bg-[#E2E8F0]" />
        )}
      </div>
      <div className="flex flex-1 items-center justify-between gap-3 pb-1">
        <p className="text-sm font-medium text-[#1A1A1A]">{title}</p>
        <p className="text-sm font-semibold text-[#1A1A1A]">{amount}</p>
      </div>
    </div>
  );
}
