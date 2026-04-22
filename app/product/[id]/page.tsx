"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: "1",
    name: 'Samsung 55" Smart TV',
    fullPrice: 45000,
    monthlyPrice: 1500,
    months: 30,
    category: "Electronics",
    color: "#DBEAFE",
    icon: "tv",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80",
    description: "Crystal UHD 4K Smart TV with HDR support and built-in streaming apps.",
    features: ["4K Ultra HD", "Smart TV", "HDR Support", "Voice Control"],
  },
  {
    id: "2",
    name: "Nike Air Max 270",
    fullPrice: 8500,
    monthlyPrice: 425,
    months: 20,
    category: "Fashion",
    color: "#FCE7F3",
    icon: "sneaker",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    description: "Iconic Air Max cushioning with a sleek, modern design for all-day comfort.",
    features: ["Air Max Cushion", "Breathable Mesh", "Rubber Outsole", "Lightweight"],
  },
  {
    id: "3",
    name: "IKEA Sectional Sofa",
    fullPrice: 32000,
    monthlyPrice: 1067,
    months: 30,
    category: "Home",
    color: "#F3E8FF",
    icon: "sofa",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    description: "Modular sectional sofa with removable covers and storage compartments.",
    features: ["Modular Design", "Storage Space", "Washable Covers", "10yr Warranty"],
  },
  {
    id: "4",
    name: 'MacBook Pro 14"',
    fullPrice: 89000,
    monthlyPrice: 2967,
    months: 30,
    category: "Electronics",
    color: "#E5E7EB",
    icon: "laptop",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80",
    description: "Apple M3 Pro chip, 18GB RAM, 512GB SSD with Liquid Retina XDR display.",
    features: ["M3 Pro Chip", "18GB RAM", "512GB SSD", "18hr Battery"],
  },
  {
    id: "5",
    name: "Zara Wool Blazer",
    fullPrice: 6200,
    monthlyPrice: 310,
    months: 20,
    category: "Fashion",
    color: "#FEF3C7",
    icon: "jacket",
    image:
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80",
    description: "Premium wool-blend blazer with a tailored fit and satin lining.",
    features: ["Wool Blend", "Tailored Fit", "Satin Lining", "Two Buttons"],
  },
  {
    id: "6",
    name: "iPhone 15 Pro Max",
    fullPrice: 78000,
    monthlyPrice: 2600,
    months: 30,
    category: "Electronics",
    color: "#D1FAE5",
    icon: "phone",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80",
    description: "A17 Pro chip, 256GB storage, titanium design with Action Button.",
    features: ["A17 Pro Chip", "256GB Storage", "Titanium Body", "48MP Camera"],
  },
];

const ProductIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case "tv":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <rect x="8" y="12" width="48" height="32" rx="3" stroke="currentColor" strokeWidth="2.5" />
          <rect x="12" y="16" width="40" height="24" rx="1" fill="currentColor" opacity="0.1" />
          <rect x="24" y="46" width="16" height="4" fill="currentColor" />
          <rect x="20" y="50" width="24" height="3" rx="1" fill="currentColor" />
        </svg>
      );
    case "sneaker":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M8 40C8 36 12 32 20 32L44 28C52 26 56 30 56 36V40C56 44 52 48 48 48H16C12 48 8 44 8 40Z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
          <path d="M12 40H52" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="36" r="2" fill="currentColor" />
          <circle cx="28" cy="34" r="2" fill="currentColor" />
          <circle cx="36" cy="32" r="2" fill="currentColor" />
        </svg>
      );
    case "sofa":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <rect x="8" y="24" width="48" height="20" rx="4" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
          <rect x="12" y="20" width="40" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="8" y="44" width="6" height="6" rx="1" fill="currentColor" />
          <rect x="50" y="44" width="6" height="6" rx="1" fill="currentColor" />
          <rect x="4" y="28" width="6" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="54" y="28" width="6" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "laptop":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <rect x="10" y="12" width="44" height="30" rx="3" stroke="currentColor" strokeWidth="2.5" />
          <rect x="14" y="16" width="36" height="22" rx="1" fill="currentColor" opacity="0.1" />
          <path d="M4 46C4 44 6 42 8 42H56C58 42 60 44 60 46V48C60 50 58 52 56 52H8C6 52 4 50 4 48V46Z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
          <rect x="26" y="46" width="12" height="2" rx="1" fill="currentColor" />
        </svg>
      );
    case "jacket":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M20 16L32 12L44 16V52H20V16Z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
          <path d="M20 16L8 24V44L20 48" stroke="currentColor" strokeWidth="2.5" />
          <path d="M44 16L56 24V44L44 48" stroke="currentColor" strokeWidth="2.5" />
          <path d="M32 12V24" stroke="currentColor" strokeWidth="2" />
          <circle cx="28" cy="32" r="2" fill="currentColor" />
          <circle cx="28" cy="40" r="2" fill="currentColor" />
        </svg>
      );
    case "phone":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <rect x="18" y="6" width="28" height="52" rx="4" stroke="currentColor" strokeWidth="2.5" />
          <rect x="22" y="12" width="20" height="36" rx="1" fill="currentColor" opacity="0.1" />
          <circle cx="32" cy="54" r="2" fill="currentColor" />
          <rect x="28" y="8" width="8" height="2" rx="1" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<typeof products[0] | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<"full" | "installments">("installments");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    const found = products.find((p) => p.id === params.id);
    if (found) setProduct(found);
  }, [params.id]);

  const handlePayment = () => {
    setShowConfirmation(true);
  };

  const confirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#00D084] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm px-4 py-4 flex items-center gap-4 border-b border-gray-100"
      >
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center active:scale-95 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-lg font-semibold text-[#1A1A1A]">Product Details</span>
      </motion.div>

      {/* Product Image Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative h-64 overflow-hidden"
        style={{ backgroundColor: product.color }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
          <span className="text-xs font-medium text-[#1A1A1A]">{product.category}</span>
        </div>
      </motion.div>

      {/* Product Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 pt-6 pb-44"
      >
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">{product.name}</h1>
        <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{product.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1.5 bg-[#F5F5F5] rounded-full text-xs font-medium text-[#1A1A1A]"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price Display */}
        <div className="bg-[#F5F5F5] rounded-2xl p-5 mb-6">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-[#9CA3AF] line-through">
              {product.fullPrice.toLocaleString()} ETB
            </span>
            <span className="text-xs text-[#9CA3AF]">full price</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#00D084]">
              {product.monthlyPrice.toLocaleString()}
            </span>
            <span className="text-lg text-[#00D084] font-medium">ETB/month</span>
          </div>
          <span className="text-xs text-[#9CA3AF]">for {product.months} months at 0% interest</span>
        </div>

        {/* Payment Options */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">Choose Payment Method</h3>
          
          {/* Pay in Full Option */}
          <button
            onClick={() => setSelectedPlan("full")}
            className={`w-full p-4 rounded-2xl border-2 mb-3 transition-all ${
              selectedPlan === "full"
                ? "border-[#00D084] bg-[#ECFDF5]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPlan === "full" ? "border-[#00D084] bg-[#00D084]" : "border-gray-300"
                  }`}
                >
                  {selectedPlan === "full" && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#1A1A1A]">Pay in Full</p>
                  <p className="text-xs text-[#9CA3AF]">via Telebirr</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#1A1A1A]">{product.fullPrice.toLocaleString()} ETB</p>
                <p className="text-xs text-[#00D084] font-medium">One-time payment</p>
              </div>
            </div>
          </button>

          {/* Installments Option */}
          <button
            onClick={() => setSelectedPlan("installments")}
            className={`w-full p-4 rounded-2xl border-2 transition-all ${
              selectedPlan === "installments"
                ? "border-[#00D084] bg-[#ECFDF5]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPlan === "installments" ? "border-[#00D084] bg-[#00D084]" : "border-gray-300"
                  }`}
                >
                  {selectedPlan === "installments" && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#1A1A1A]">Split in {product.months} Payments</p>
                  <p className="text-xs text-[#9CA3AF]">0% Interest</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#00D084]">{product.monthlyPrice.toLocaleString()} ETB</p>
                <p className="text-xs text-[#9CA3AF]">per month</p>
              </div>
            </div>

            {/* Installment Breakdown */}
            {selectedPlan === "installments" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 pt-4 border-t border-[#00D084]/20"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#9CA3AF]">Today</span>
                  <span className="text-sm font-semibold text-[#1A1A1A]">{product.monthlyPrice.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#9CA3AF]">In 30 days</span>
                  <span className="text-sm font-semibold text-[#1A1A1A]">{product.monthlyPrice.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#9CA3AF]">+ {product.months - 2} more payments</span>
                  <span className="text-sm font-semibold text-[#1A1A1A]">{product.monthlyPrice.toLocaleString()} ETB each</span>
                </div>
              </motion.div>
            )}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D084" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span className="text-xs text-[#9CA3AF]">Secure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D084" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="text-xs text-[#9CA3AF]">Instant Approval</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D084" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            <span className="text-xs text-[#9CA3AF]">0% Interest</span>
          </div>
        </div>
      </motion.div>

      {/* Sticky Bottom Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto p-5 bg-white border-t border-gray-100"
        style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
      >
        <button
          onClick={handlePayment}
          className="w-full py-4 rounded-full font-semibold text-white text-lg relative overflow-hidden active:scale-[0.98] transition-transform"
          style={{ backgroundColor: "#00D084" }}
        >
          <span className="relative z-10">
            {selectedPlan === "full"
              ? `Pay ${product.fullPrice.toLocaleString()} ETB`
              : `Pay ${product.monthlyPrice.toLocaleString()} ETB Now`}
          </span>
          <div className="absolute inset-0 animate-shimmer" />
        </button>
        <p className="text-center text-xs text-[#9CA3AF] mt-3">
          By continuing, you agree to the Terms of Service
        </p>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => !isProcessing && !paymentComplete && setShowConfirmation(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto bg-white rounded-t-[32px] z-50 p-6"
              style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
            >
              {paymentComplete ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, delay: 0.2 }}
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ backgroundColor: "#00D084" }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Payment Successful!</h3>
                  <p className="text-[#9CA3AF] mb-6">Your order has been confirmed</p>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full py-4 rounded-full font-semibold text-white"
                    style={{ backgroundColor: "#00D084" }}
                  >
                    Go to Dashboard
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Modal Handle */}
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 text-center">Confirm Payment</h3>

                  {/* Order Summary */}
                  <div className="bg-[#F5F5F5] rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: product.color }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#1A1A1A]">{product.name}</p>
                        <p className="text-sm text-[#9CA3AF]">
                          {selectedPlan === "full" ? "Pay in Full" : `${product.months} Monthly Payments`}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[#9CA3AF]">Amount Due Today</span>
                        <span className="text-xl font-bold text-[#1A1A1A]">
                          {selectedPlan === "full"
                            ? product.fullPrice.toLocaleString()
                            : product.monthlyPrice.toLocaleString()}{" "}
                          ETB
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#00D084]/10 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D084" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#1A1A1A]">Telebirr Wallet</p>
                      <p className="text-xs text-[#9CA3AF]">+251 9** *** **89</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D084" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={confirmPayment}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-full font-semibold text-white text-lg relative overflow-hidden disabled:opacity-70"
                    style={{ backgroundColor: "#00D084" }}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Confirm Payment"
                    )}
                  </button>

                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="w-full py-3 text-[#9CA3AF] font-medium mt-3"
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
