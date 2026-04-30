"use client";

import { useRouter } from "next/navigation";
import { QrCode, ArrowLeft } from "lucide-react";

export default function ScannerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full max-w-[400px] mx-auto bg-white px-6 pt-6 pb-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center"
      >
        <ArrowLeft className="w-5 h-5 text-black" />
      </button>

      <div className="mt-10 rounded-3xl bg-[#F4F4F5] p-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center">
          <QrCode className="w-8 h-8 text-black" />
        </div>
        <h1 className="mt-4 text-xl font-medium text-black">In-store QR Scanner</h1>
        <p className="mt-2 text-sm text-[#71717A]">
          Scan merchant QR to continue your in-store MEREQ checkout.
        </p>
        <button
          type="button"
          onClick={() => router.push("/checkout")}
          className="w-full mt-6 py-4 rounded-2xl bg-black text-white font-medium tracking-tight"
        >
          Start scanning
        </button>
      </div>
    </div>
  );
}
