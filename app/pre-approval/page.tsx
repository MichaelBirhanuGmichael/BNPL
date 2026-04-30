"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function PreApprovalPage() {
  const [amount, setAmount] = useState("5,000");
  const [isConsented, setIsConsented] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(299); // 4:59 in seconds

  // Countdown timer
  useEffect(() => {
    if (!isApproved) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isApproved]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setAmount(Number(value).toLocaleString());
    } else {
      setAmount("");
    }
  };

  const handleApprove = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsApproved(true);
    }, 1500);
  };

  const isButtonEnabled = isConsented && amount.length > 0;

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto relative overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 bg-white px-5 pt-14 pb-4 border-b border-gray-100"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/discover"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#1A1A1A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <h1
            className="text-xl font-bold"
            style={{ color: "#1A1A1A" }}
          >
            In-Store Pre-Approval
          </h1>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {!isApproved ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col min-h-[calc(100vh-88px)]"
          >
            <div className="flex-1 px-5 py-6 pb-40">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <div
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="#9CA3AF" strokeWidth="2" />
                    <path
                      d="M21 21L16.5 16.5"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for a merchant..."
                    className="flex-1 bg-transparent outline-none text-base"
                    style={{ color: "#1A1A1A" }}
                  />
                </div>
              </motion.div>

              {/* Selected Merchant Chip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-6"
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2"
                  style={{ borderColor: "#00D084", backgroundColor: "rgba(0, 208, 132, 0.05)" }}
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#00D084" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>
                    Shoa Supermarket
                  </span>
                  <button className="ml-1 text-gray-400 hover:text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>

              {/* Amount Input Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <div
                  className="rounded-3xl p-6"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  <p className="text-sm text-gray-500 mb-2">Enter amount</p>
                  <div className="flex items-baseline gap-2">
                    <input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      className="text-5xl font-bold bg-transparent outline-none w-full"
                      style={{ color: "#1A1A1A" }}
                      placeholder="0"
                    />
                    <span className="text-2xl text-gray-400 font-medium">ETB</span>
                  </div>
                </div>
              </motion.div>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-6"
              >
                <div
                  className="rounded-2xl p-4 flex gap-3"
                  style={{ backgroundColor: "#FEF9E7" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "#F59E0B" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 9V13M12 17H12.01M12 3L2 21H22L12 3Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#92400E" }}>
                    This merchant offers <span className="font-semibold">0% interest</span> for the first 30 days on purchases under 10,000 ETB.
                  </p>
                </div>
              </motion.div>

              {/* Consent Checkbox */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="pt-0.5">
                    <div
                      onClick={() => setIsConsented(!isConsented)}
                      className="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200"
                      style={{
                        borderColor: isConsented ? "#00D084" : "#D1D5DB",
                        backgroundColor: isConsented ? "#00D084" : "transparent",
                      }}
                    >
                      {isConsented && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 leading-relaxed">
                    I consent to sharing my data with the <span className="font-semibold text-gray-800">National Credit Bureau</span> for this check.
                  </span>
                </label>
              </motion.div>
            </div>

            {/* Sticky Bottom */}
            <div className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto bg-white px-5 py-6 pb-10 border-t border-gray-100">
              {/* Test Button */}
              <button
                onClick={handleApprove}
                disabled={!isButtonEnabled || isLoading}
                className="w-full mb-3 py-2 text-sm font-medium rounded-full transition-all"
                style={{
                  backgroundColor: "rgba(0, 208, 132, 0.1)",
                  color: "#00D084",
                  opacity: isButtonEnabled ? 1 : 0.5,
                }}
              >
                Tap to Approve (Test)
              </button>

              {/* Main Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={!isButtonEnabled || isLoading}
                className="w-full py-5 rounded-full font-bold text-lg text-white transition-all duration-300 relative overflow-hidden"
                style={{
                  backgroundColor: isButtonEnabled ? "#00D084" : "#A7F3D0",
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Request In-Store Limit</span>
                    {isButtonEnabled && (
                      <motion.div
                        className="absolute inset-0 animate-shimmer"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                          backgroundSize: "200% 100%",
                        }}
                      />
                    )}
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="approved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-5 py-8"
          >
            {/* Success Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="mb-6"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#00D084" }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold mb-2"
              style={{ color: "#1A1A1A" }}
            >
              Approved for {amount} ETB
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-sm text-gray-500 mb-8"
            >
              at Shoa Supermarket
            </motion.p>

            {/* QR Code Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 20 }}
              className="w-full max-w-[280px] rounded-3xl p-6 mb-6"
              style={{
                backgroundColor: "white",
                boxShadow: "0 0 0 3px rgba(0, 208, 132, 0.3), 0 8px 32px rgba(0, 208, 132, 0.15)",
              }}
            >
              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                  {/* QR Code Pattern */}
                  <rect width="180" height="180" fill="white" />
                  {/* Corner squares */}
                  <rect x="10" y="10" width="50" height="50" stroke="#1A1A1A" strokeWidth="6" fill="none" />
                  <rect x="20" y="20" width="30" height="30" fill="#1A1A1A" />
                  <rect x="120" y="10" width="50" height="50" stroke="#1A1A1A" strokeWidth="6" fill="none" />
                  <rect x="130" y="20" width="30" height="30" fill="#1A1A1A" />
                  <rect x="10" y="120" width="50" height="50" stroke="#1A1A1A" strokeWidth="6" fill="none" />
                  <rect x="20" y="130" width="30" height="30" fill="#1A1A1A" />
                  {/* Data pattern */}
                  <rect x="70" y="10" width="10" height="10" fill="#1A1A1A" />
                  <rect x="90" y="10" width="10" height="10" fill="#1A1A1A" />
                  <rect x="70" y="30" width="10" height="10" fill="#1A1A1A" />
                  <rect x="80" y="20" width="10" height="10" fill="#1A1A1A" />
                  <rect x="100" y="20" width="10" height="10" fill="#1A1A1A" />
                  <rect x="10" y="70" width="10" height="10" fill="#1A1A1A" />
                  <rect x="30" y="70" width="10" height="10" fill="#1A1A1A" />
                  <rect x="50" y="80" width="10" height="10" fill="#1A1A1A" />
                  <rect x="70" y="70" width="10" height="10" fill="#1A1A1A" />
                  <rect x="90" y="70" width="10" height="10" fill="#1A1A1A" />
                  <rect x="80" y="80" width="10" height="10" fill="#1A1A1A" />
                  <rect x="100" y="80" width="10" height="10" fill="#1A1A1A" />
                  <rect x="120" y="70" width="10" height="10" fill="#1A1A1A" />
                  <rect x="140" y="70" width="10" height="10" fill="#1A1A1A" />
                  <rect x="160" y="80" width="10" height="10" fill="#1A1A1A" />
                  <rect x="10" y="90" width="10" height="10" fill="#1A1A1A" />
                  <rect x="40" y="90" width="10" height="10" fill="#1A1A1A" />
                  <rect x="70" y="90" width="10" height="10" fill="#1A1A1A" />
                  <rect x="100" y="90" width="10" height="10" fill="#1A1A1A" />
                  <rect x="130" y="90" width="10" height="10" fill="#1A1A1A" />
                  <rect x="160" y="90" width="10" height="10" fill="#1A1A1A" />
                  <rect x="20" y="100" width="10" height="10" fill="#1A1A1A" />
                  <rect x="50" y="100" width="10" height="10" fill="#1A1A1A" />
                  <rect x="80" y="100" width="10" height="10" fill="#1A1A1A" />
                  <rect x="110" y="100" width="10" height="10" fill="#1A1A1A" />
                  <rect x="140" y="100" width="10" height="10" fill="#1A1A1A" />
                  <rect x="70" y="120" width="10" height="10" fill="#1A1A1A" />
                  <rect x="90" y="120" width="10" height="10" fill="#1A1A1A" />
                  <rect x="120" y="120" width="10" height="10" fill="#1A1A1A" />
                  <rect x="150" y="120" width="10" height="10" fill="#1A1A1A" />
                  <rect x="80" y="130" width="10" height="10" fill="#1A1A1A" />
                  <rect x="100" y="130" width="10" height="10" fill="#1A1A1A" />
                  <rect x="130" y="130" width="10" height="10" fill="#1A1A1A" />
                  <rect x="160" y="130" width="10" height="10" fill="#1A1A1A" />
                  <rect x="70" y="140" width="10" height="10" fill="#1A1A1A" />
                  <rect x="110" y="140" width="10" height="10" fill="#1A1A1A" />
                  <rect x="140" y="140" width="10" height="10" fill="#1A1A1A" />
                  <rect x="70" y="160" width="10" height="10" fill="#1A1A1A" />
                  <rect x="90" y="160" width="10" height="10" fill="#1A1A1A" />
                  <rect x="120" y="160" width="10" height="10" fill="#1A1A1A" />
                  <rect x="150" y="160" width="10" height="10" fill="#1A1A1A" />
                </svg>
              </div>

              {/* Barcode */}
              <div className="flex justify-center gap-[2px] mb-4">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12"
                    style={{
                      width: i % 3 === 0 ? "3px" : i % 2 === 0 ? "2px" : "1px",
                      backgroundColor: "#1A1A1A",
                    }}
                  />
                ))}
              </div>

              <p className="text-center text-xs text-gray-400 font-mono">
                MEREQ-2024-{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
            </motion.div>

            {/* Instructions */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-sm text-gray-500 mb-4"
            >
              Show this to the cashier to pay.
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: "#FEE2E2" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#DC2626" strokeWidth="2" />
                <path d="M12 7V12L15 15" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-sm font-bold" style={{ color: "#DC2626" }}>
                Expires in {formatTime(timeLeft)}
              </span>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => {
                setIsApproved(false);
                setTimeLeft(299);
              }}
              className="mt-8 px-8 py-3 rounded-full font-semibold transition-all"
              style={{
                backgroundColor: "#F5F5F5",
                color: "#1A1A1A",
              }}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
