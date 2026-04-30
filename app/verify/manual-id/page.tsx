"use client";

import { useState } from "react";
import { Camera, CheckCircle2, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type CaptureTarget = "front" | "back" | null;

export default function ManualIdPage() {
  const router = useRouter();
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);
  const [captureTarget, setCaptureTarget] = useState<CaptureTarget>(null);

  const canContinue = frontUploaded && backUploaded;

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#FAF9F6] px-6 pt-8 pb-[calc(7rem+env(safe-area-inset-bottom))] relative">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center"
      >
        <ChevronLeft className="w-5 h-5 text-zinc-700" />
      </button>

      <h1 className="mt-6 text-[29px] font-semibold tracking-tight text-zinc-900">Upload identity document</h1>
      <p className="mt-3 text-sm leading-7 text-zinc-500">
        Capture clear photos for fast manual review. Keep all edges visible.
      </p>

      <div className="mt-8 space-y-4">
        <UploadCard
          title="Front of ID"
          complete={frontUploaded}
          onClick={() => setCaptureTarget("front")}
        />
        <UploadCard
          title="Back of ID / Signature"
          complete={backUploaded}
          onClick={() => setCaptureTarget("back")}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-zinc-200">
        <div className="max-w-[400px] mx-auto px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => router.push("/verify/analyzing?mode=manual")}
            className="w-full h-14 rounded-full bg-black text-white font-semibold tracking-tight disabled:bg-zinc-300"
          >
            Continue
          </button>
        </div>
      </div>

      <AnimatePresence>
        {captureTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 z-40"
              onClick={() => setCaptureTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
            >
              <div className="w-full max-w-[320px] rounded-[28px] border border-white/30 bg-white/10 backdrop-blur-xl p-4">
                <p className="text-center text-white text-sm mb-4">Position your document inside the frame</p>
                <div className="h-48 rounded-2xl border-2 border-dashed border-[#31f5c2] bg-black/30 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-[#31f5c2]" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (captureTarget === "front") setFrontUploaded(true);
                    if (captureTarget === "back") setBackUploaded(true);
                    setCaptureTarget(null);
                  }}
                  className="mt-4 w-full h-11 rounded-full bg-[#31f5c2] text-black font-semibold"
                >
                  Capture
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function UploadCard({ title, complete, onClick }: { title: string; complete: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[28px] border border-zinc-200 bg-white p-5 text-left shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold tracking-tight text-zinc-900">{title}</p>
        {complete ? <CheckCircle2 className="w-5 h-5 text-[#31f5c2]" /> : <Camera className="w-5 h-5 text-zinc-400" />}
      </div>
      <p className="mt-2 text-xs text-zinc-500">{complete ? "Uploaded successfully" : "Tap to open camera frame"}</p>
    </button>
  );
}
