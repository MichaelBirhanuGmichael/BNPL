"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, Circle } from "lucide-react";

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto relative overflow-hidden">
      <div className="h-screen overflow-y-auto px-5 pb-6 pt-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/orders")}
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-[#F4F6F7]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Order Details</h1>
        </div>

        <div className="mt-5 rounded-3xl border border-[#ECEFF1] p-4 shadow-[0_12px_28px_rgba(26,26,26,0.06)]">
          <div className="flex items-start gap-4">
            <img
              src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"
              alt="Samsung TV"
              className="h-24 w-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="text-base font-semibold text-[#1A1A1A]">
                Samsung 55&apos; Smart TV
              </p>
              <p className="mt-1 text-sm text-[#6B7280]">Order #MRQ-284</p>
              <p className="mt-2 text-lg font-bold text-[#1A1A1A]">45,000 Br</p>
              <p className="text-sm font-semibold text-[#00D084]">
                1,500 Br / month for 30 months
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">
            Crystal UHD 4K Smart TV with HDR support, streaming apps, and voice
            assistant control.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-[#E8EEF2] p-4">
          <h2 className="mb-4 text-base font-semibold text-[#1A1A1A]">
            Installment Schedule
          </h2>
          <div className="space-y-5">
            <StepperRow
              icon={
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00D084] text-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              }
              title="1st Installment: Paid Apr 22"
              amount="1,500 Br"
              showLine
            />
            <StepperRow
              icon={
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#8FA3B6] bg-[#F4F7FA]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7C8FA6] animate-pulse" />
                </span>
              }
              title="2nd Installment: Due May 22"
              amount="1,500 Br"
              showLine
            />
            <StepperRow
              icon={
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#CBD5E1] bg-white text-[#94A3B8]">
                  <Circle className="h-3.5 w-3.5 fill-transparent" />
                </span>
              }
              title="3rd Installment: Due Jun 22"
              amount="1,500 Br"
            />
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-[#BEEFD9] bg-[#ECFCF5] p-4">
          <p className="text-sm leading-relaxed text-[#1A1A1A]">
            Problem with this item? We can pause your payments while we help you
            resolve it.
          </p>
          <button
            type="button"
            onClick={() => router.push(`/order/${params.id}/support`)}
            className="mt-4 rounded-full border border-[#00D084] px-4 py-2 text-sm font-semibold text-[#0E7A4E] transition hover:bg-[#E1FAEE]"
          >
            Report an Issue / Get Help
          </button>
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
