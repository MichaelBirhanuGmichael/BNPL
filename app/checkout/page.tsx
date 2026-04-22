"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Store, Lock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"scanning" | "success">("scanning");
  const [scanFlash, setScanFlash] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"full" | "split">("full");
  const [isSliding, setIsSliding] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Auto-scan after 2 seconds (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === "scanning") {
        triggerScan();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  const triggerScan = () => {
    // Flash the brackets green
    setScanFlash(true);
    
    // After flash, show the modal
    setTimeout(() => {
      setPhase("success");
    }, 500);
  };

  const handleSlideStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsSliding(true);
  };

  const handleSlideMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSliding) return;
    
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const progress = Math.min(Math.max((clientX - rect.left - 30) / (rect.width - 60), 0), 1);
    setSlideProgress(progress);
  };

  const handleSlideEnd = () => {
    if (slideProgress > 0.85) {
      setSlideProgress(1);
      setPaymentComplete(true);
    } else {
      setSlideProgress(0);
    }
    setIsSliding(false);
  };

  return (
    <div className="h-screen bg-black max-w-[400px] mx-auto relative overflow-hidden">
      {/* Camera Feed (Simulated) */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        }}
      >
        {/* Simulated store environment blur */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 30% 40%, #4a4a4a 0%, transparent 50%), radial-gradient(circle at 70% 60%, #3a3a3a 0%, transparent 40%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Tap to Simulate Scan Button (Only in scanning phase) */}
      <AnimatePresence>
        {phase === "scanning" && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={triggerScan}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
          >
            <span className="text-white/90 text-sm font-medium">Tap to Simulate Scan</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <span className="text-white/80 text-sm font-medium">Scan QR Code</span>
        <div className="w-10 h-10" />
      </div>

      {/* Scanning Reticle - Full Screen in Phase 1 */}
      <motion.div 
        className="relative z-10 flex items-center justify-center"
        animate={{ 
          marginTop: phase === "scanning" ? "25%" : "8%",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className="relative w-56 h-56">
          {/* Corner brackets - flash green on scan */}
          <motion.div 
            className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 rounded-tl-2xl"
            animate={{ 
              borderColor: scanFlash ? "#00D084" : "#ffffff",
              boxShadow: scanFlash ? "0 0 20px #00D084" : "none",
            }}
            transition={{ duration: 0.15 }}
          />
          <motion.div 
            className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 rounded-tr-2xl"
            animate={{ 
              borderColor: scanFlash ? "#00D084" : "#ffffff",
              boxShadow: scanFlash ? "0 0 20px #00D084" : "none",
            }}
            transition={{ duration: 0.15 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 rounded-bl-2xl"
            animate={{ 
              borderColor: scanFlash ? "#00D084" : "#ffffff",
              boxShadow: scanFlash ? "0 0 20px #00D084" : "none",
            }}
            transition={{ duration: 0.15 }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 rounded-br-2xl"
            animate={{ 
              borderColor: scanFlash ? "#00D084" : "#ffffff",
              boxShadow: scanFlash ? "0 0 20px #00D084" : "none",
            }}
            transition={{ duration: 0.15 }}
          />
          
          {/* Scan line - only animates in scanning phase */}
          {phase === "scanning" && !scanFlash && (
            <motion.div 
              className="absolute left-4 right-4 h-0.5"
              style={{
                background: "linear-gradient(90deg, transparent, #00D084, transparent)",
                boxShadow: "0 0 10px #00D084",
              }}
              animate={{
                top: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* QR indicator in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 opacity-30">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="4" height="4" rx="0.5" />
                <rect x="19" y="14" width="2" height="2" rx="0.25" />
                <rect x="14" y="19" width="2" height="2" rx="0.25" />
                <rect x="19" y="19" width="2" height="2" rx="0.25" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dark Backdrop - Only shows in success phase */}
      <AnimatePresence>
        {phase === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 z-15"
            style={{ zIndex: 15 }}
          />
        )}
      </AnimatePresence>

      {/* Bottom Sheet - Slides up in Phase 2 */}
      <AnimatePresence>
        {phase === "success" && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 28, 
              stiffness: 300,
              mass: 0.8,
            }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-20"
            style={{ 
              minHeight: "55%",
              boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            <div className="px-6 pb-8">
              {/* Merchant Info */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-4 mb-6"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  <Store className="w-7 h-7" style={{ color: "#1A1A1A" }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: "#1A1A1A" }}>Shoa Supermarket</h3>
                  <p className="text-sm text-gray-500">Bole Road, Addis Ababa</p>
                </div>
              </motion.div>

              {/* Amount Display */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="text-center mb-8"
              >
                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                <p className="text-5xl font-bold" style={{ color: "#1A1A1A" }}>400 ETB</p>
              </motion.div>

              {/* Payment Options Toggle */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-8"
              >
                <p className="text-sm font-medium text-gray-500 mb-3">Payment Method</p>
                
                <div 
                  className="p-1.5 rounded-2xl"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  {/* Pay in Full Option */}
                  <button
                    onClick={() => setPaymentMethod("full")}
                    className={`w-full p-4 rounded-xl mb-1.5 transition-all duration-300 ${
                      paymentMethod === "full" ? "bg-white shadow-md" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            paymentMethod === "full" ? "border-[#00D084]" : "border-gray-300"
                          }`}
                        >
                          {paymentMethod === "full" && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ backgroundColor: "#00D084" }} 
                            />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold" style={{ color: "#1A1A1A" }}>Pay in Full</p>
                          <p className="text-xs text-gray-500">via Telebirr</p>
                        </div>
                      </div>
                      <span className="font-bold" style={{ color: "#1A1A1A" }}>400 ETB</span>
                    </div>
                  </button>

                  {/* Split Option (Locked) */}
                  <button
                    disabled
                    className="w-full p-4 rounded-xl opacity-50 cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        <div className="text-left">
                          <p className="font-semibold text-gray-400 flex items-center gap-2">
                            Split in 3 Installments
                            <Lock className="w-3.5 h-3.5" />
                          </p>
                          <p className="text-xs text-gray-400">Unlock with credit history</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-400">133 ETB/mo</span>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* Swipe to Pay Button */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="relative h-16 rounded-full overflow-hidden cursor-grab active:cursor-grabbing"
                style={{ 
                  backgroundColor: paymentComplete ? "#00B873" : "#00D084",
                }}
                onTouchStart={handleSlideStart}
                onTouchMove={handleSlideMove}
                onTouchEnd={handleSlideEnd}
                onMouseDown={handleSlideStart}
                onMouseMove={handleSlideMove}
                onMouseUp={handleSlideEnd}
                onMouseLeave={() => isSliding && handleSlideEnd()}
              >
                {/* Shimmer effect */}
                {!paymentComplete && (
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{
                      backgroundPosition: ["-200% 0", "200% 0"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}

                {/* Slide track fill */}
                <div 
                  className="absolute inset-y-0 left-0 transition-all duration-100"
                  style={{ 
                    width: `${slideProgress * 100}%`,
                    backgroundColor: "#00B873",
                  }}
                />

                {/* Text with animated arrows */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {paymentComplete ? (
                    <motion.span 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-white font-semibold text-lg flex items-center gap-2"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Payment Successful
                    </motion.span>
                  ) : (
                    <span className="text-white font-semibold text-lg flex items-center gap-1">
                      Swipe to Pay
                      <span className="flex items-center ml-1">
                        <motion.span
                          animate={{ x: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.span>
                        <motion.span
                          animate={{ x: [0, 4, 0], opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                          className="-ml-2"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.span>
                        <motion.span
                          animate={{ x: [0, 4, 0], opacity: [0.2, 0.6, 0.2] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                          className="-ml-2"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.span>
                      </span>
                    </span>
                  )}
                </div>

                {/* Slider thumb */}
                {!paymentComplete && (
                  <motion.div 
                    className="absolute top-1.5 bottom-1.5 w-12 rounded-full bg-white shadow-lg flex items-center justify-center"
                    style={{ 
                      left: `calc(${Math.max(0, slideProgress * 100)}% + 6px)`,
                      transform: `translateX(-${slideProgress * 100}%)`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-5 h-5" style={{ color: "#00D084" }} />
                  </motion.div>
                )}
              </motion.div>

              {/* Security note */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-center text-xs text-gray-400 mt-4"
              >
                Secured by 256-bit encryption
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
