"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full bg-gray-900 overflow-hidden max-w-[400px] mx-auto">
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"
        alt="Premium shopping lifestyle"
        className="absolute top-0 left-0 w-full h-[65%] object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-[65%] bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.1)] px-8 pt-10 pb-[calc(3rem+env(safe-area-inset-bottom))] flex flex-col">
        <p className="text-emerald-500 font-bold tracking-widest text-sm uppercase mb-4">MEREQ</p>
        <h1 className="text-[2.75rem] font-black tracking-tighter text-slate-900 leading-[1.05]">Shop now. Pay with confidence.</h1>
        <p className="text-slate-500 text-[1.05rem] leading-relaxed mt-5 font-medium">
          Discover trusted merchants, split purchases responsibly, and build your credit profile with MEREQ.
        </p>

        <div className="flex items-center gap-2 bg-slate-100/80 backdrop-blur-sm px-4 py-3 rounded-2xl w-fit mt-8">
          <Shield className="w-4 h-4 text-slate-700 fill-slate-700" />
          <span className="text-sm font-semibold text-slate-700">Bank-grade security & buyer protection</span>
        </div>

        <div className="mt-10 flex flex-col gap-3 w-full">
          <button
            type="button"
            onClick={() => router.push("/auth/phone?flow=signup")}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg py-4 rounded-full transition-all shadow-[0_8px_30px_rgba(16,185,129,0.3)]"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-900 font-bold hover:text-emerald-600 transition-colors">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
