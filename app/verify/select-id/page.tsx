"use client";

import { Lock, Camera, ChevronRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SelectIdPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#FAF9F6] px-6 pt-10 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
      <h1 className="text-[30px] font-semibold tracking-tight text-zinc-900">How would you like to verify?</h1>
      <p className="mt-3 text-sm leading-7 text-zinc-500">
        Choose your preferred KYC path. MEREQ secures every step with encrypted identity checks.
      </p>

      <div className="mt-8 space-y-4">
        <button
          type="button"
          onClick={() => router.push("/verify/fayda-id")}
          className="w-full rounded-[28px] border border-zinc-200 bg-white p-5 text-left shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#31f5c21f] text-[#0e8b70] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-semibold tracking-tight text-zinc-900">Fayda ID</p>
                <p className="text-xs text-zinc-500">Instant Approval</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400" />
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#31f5c226] px-3 py-1 text-[11px] font-semibold text-zinc-700">
            <Sparkles className="w-3.5 h-3.5" />
            Recommended
          </div>
        </button>

        <button
          type="button"
          onClick={() => router.push("/verify/manual-id")}
          className="w-full rounded-[28px] border border-zinc-200 bg-white p-5 text-left shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-zinc-100 text-zinc-700 flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-semibold tracking-tight text-zinc-900">Passport / National ID</p>
                <p className="text-xs text-zinc-500">Manual Review (24h)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400" />
          </div>
        </button>
      </div>
    </div>
  );
}
