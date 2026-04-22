"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Camera, SendHorizontal } from "lucide-react";

export default function OrderSupportPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto flex flex-col">
      <header className="border-b border-[#EEF1F4] px-5 pb-4 pt-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push(`/order/${params.id}`)}
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-[#F4F6F7]"
            aria-label="Back to order details"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-[#1A1A1A]">MEREQ Care</h1>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#00D084]" />
              <span className="text-xs font-medium text-[#5B6470]">Online</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        <div className="mx-auto w-fit rounded-full bg-[#F3F5F7] px-4 py-2 text-center text-xs font-medium text-[#4B5563]">
          ⚠️ Installments for Order #MRQ-284 are now ON HOLD.
        </div>

        <div className="flex justify-end">
          <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[#1A1A1A] px-4 py-3 text-sm leading-relaxed text-white">
            Hi, my TV was delivered but the screen is cracked.
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-[#DDF9EC] px-4 py-3 text-sm leading-relaxed text-[#1A1A1A]">
            I am so sorry to hear that! Don&apos;t worry, I have{" "}
            <span className="font-semibold">Paused your next installment</span>{" "}
            immediately so you aren&apos;t charged while we investigate.
          </div>
        </div>
      </main>

      <footer className="border-t border-[#EEF1F4] bg-white px-4 pb-5 pt-3 safe-bottom">
        <div className="flex items-center gap-2 rounded-full border border-[#E5E9EE] bg-[#FAFBFC] px-3 py-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-[#EDF1F3]"
            aria-label="Attach photo"
          >
            <Camera className="h-4.5 w-4.5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the issue..."
            className="h-9 flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none"
          />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00D084] text-white transition hover:bg-[#00C37C]"
            aria-label="Send message"
          >
            <SendHorizontal className="h-4.5 w-4.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
