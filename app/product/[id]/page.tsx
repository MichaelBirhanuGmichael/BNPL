"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Info, Share2 } from "lucide-react";

const mockProducts = [
  {
    id: "1",
    name: "Galaxy S26 Ultra Dual SIM 12GB",
    price: 3999,
    originalPrice: 4203,
    category: "Electronics",
    tags: ["mobiles", "android", "samsung"],
    merchantName: "Samsung",
    merchantLogo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=240",
    merchantType: "Global",
    color: "#F4F4F5",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80",
    description: "Premium Android flagship with high refresh display and pro-grade camera setup.",
  },
  {
    id: "2",
    name: "Nike Air Force 1",
    price: 149,
    originalPrice: 435,
    category: "Fashion",
    tags: ["shoes", "fashion", "lifestyle"],
    merchantName: "Shoa Supermarket",
    merchantLogo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=240",
    merchantType: "Ethiopian Partner",
    color: "#F4F4F5",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    description: "Classic sneaker silhouette with durable leather upper and everyday comfort.",
  },
  {
    id: "3",
    name: "Zemen Home Sofa Set",
    price: 32000,
    originalPrice: 35600,
    category: "Home",
    tags: ["home", "furniture", "sofa"],
    merchantName: "Zemen Home",
    merchantLogo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=240",
    merchantType: "Ethiopian Brand",
    color: "#F4F4F5",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    description: "Modern sectional sofa with premium fabric, built for spacious living rooms.",
  },
  {
    id: "4",
    name: 'MacBook Pro 14"',
    price: 89000,
    originalPrice: 94000,
    category: "Electronics",
    tags: ["electronics", "laptop", "apple"],
    merchantName: "Amazon",
    merchantLogo: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=240",
    merchantType: "Global",
    color: "#F4F4F5",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80",
    description: "Apple silicon performance laptop with pro display and all-day battery.",
  },
  {
    id: "5",
    name: "Zara Wool Blazer",
    price: 6200,
    originalPrice: 7100,
    category: "Fashion",
    tags: ["fashion", "clothing", "women"],
    merchantName: "Carrefour",
    merchantLogo: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=240",
    merchantType: "Global",
    color: "#F4F4F5",
    image:
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80",
    description: "Tailored wool-blend blazer designed for modern formal styling.",
  },
  {
    id: "6",
    name: "iPhone 15 Pro Max",
    price: 78000,
    originalPrice: 82000,
    category: "Electronics",
    tags: ["mobiles", "electronics", "apple"],
    merchantName: "Shoa Supermarket",
    merchantLogo: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=240",
    merchantType: "Ethiopian Partner",
    color: "#F4F4F5",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80",
    description: "Titanium iPhone with pro camera system, strong performance and long battery life.",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<(typeof mockProducts)[0] | null>(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    const found = mockProducts.find((p) => p.id === params.id);
    if (found) setProduct(found);
  }, [params.id]);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return mockProducts.filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category || item.tags.some((tag) => product.tags.includes(tag)))
    );
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#00D084] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const installmentAmount = Math.round(product.price / 4);
  const paymentSchedule = [
    { label: "Today", amount: installmentAmount },
    { label: "In 1 month", amount: installmentAmount },
    { label: "In 2 months", amount: installmentAmount },
    { label: "In 3 months", amount: product.price - installmentAmount * 3 },
  ];

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto relative font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-gray-100"
      >
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center active:scale-95 transition-transform">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-base font-semibold text-[#000000]">Product details</span>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center">
            <Heart className="w-5 h-5 text-[#000000]" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center">
            <Share2 className="w-5 h-5 text-[#000000]" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative h-72 overflow-hidden"
        style={{ backgroundColor: product.color }}
      >
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
          <span className="text-xs font-medium text-[#71717A]">{product.category}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 pt-5 pb-44"
      >
        <div className="mb-4 rounded-2xl bg-[#F4F4F5] p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={product.merchantLogo} alt={product.merchantName} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
            <div>
              <p className="text-sm font-semibold text-[#000000]">{product.merchantName}</p>
              <p className="text-xs text-[#71717A]">{product.merchantType}</p>
            </div>
          </div>
          <button className="px-3.5 py-1.5 rounded-full bg-white text-xs font-semibold text-[#000000] border border-slate-200">Follow</button>
        </div>

        <h1 className="text-2xl font-semibold text-[#000000] mb-1">{product.name}</h1>
        <p className="text-[#71717A] text-sm leading-relaxed mb-4">{product.description}</p>

        <div className="mb-5">
          <p className="text-3xl font-semibold text-[#000000]">Br {product.price.toLocaleString("en-ET")}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm text-[#71717A] line-through">Br {product.originalPrice.toLocaleString("en-ET")}</span>
            <span className="text-sm text-[#71717A]">Total price</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowHowItWorks(true)}
          className="w-full rounded-3xl bg-[#F4F4F5] p-4 mb-7 text-left"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-[#000000]">Split in 4 with MEREQ</p>
              <p className="text-xs text-[#71717A]">No interest, no hidden fees</p>
            </div>
            <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center">
              <Info className="w-4 h-4 text-[#71717A]" />
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {paymentSchedule.map((payment, index) => (
              <div key={payment.label} className="rounded-2xl bg-white p-2 text-center border border-slate-200">
                <div className={`w-6 h-6 rounded-full mx-auto mb-2 ${index === 0 ? "bg-black" : "bg-[#E4E4E7]"}`} />
                <p className="text-[10px] text-[#71717A]">{payment.label}</p>
                <p className="text-xs font-semibold text-[#000000]">Br {payment.amount.toLocaleString("en-ET")}</p>
              </div>
            ))}
          </div>
        </button>

        <h3 className="text-lg font-semibold text-[#000000] mb-3">Similar products</h3>
        <div className="grid grid-cols-2 gap-3">
          {similarProducts.slice(0, 4).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(`/product/${item.id}`)}
              className="rounded-[24px] overflow-hidden bg-white text-left shadow-[0_2px_18px_rgba(0,0,0,0.06)]"
            >
              <div className="aspect-square bg-[#F4F4F5]">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-2.5">
                <p className="text-xs text-[#71717A]">{item.merchantName}</p>
                <p className="text-sm font-semibold text-[#000000] line-clamp-2">{item.name}</p>
                <p className="mt-1 text-sm font-semibold text-[#000000]">Br {item.price.toLocaleString("en-ET")}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto p-5 bg-white border-t border-gray-100"
        style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={() => router.push(`/checkout?productId=${product.id}&merchant=${encodeURIComponent(product.merchantName)}`)}
          className="w-full py-4 rounded-full font-semibold text-white text-base bg-black active:scale-[0.98] transition-transform"
        >
          Check out with MEREQ
        </button>
        <p className="text-center text-xs text-[#71717A] mt-3">By continuing, you agree to MEREQ payment terms.</p>
      </motion.div>

      <AnimatePresence>
        {showHowItWorks && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setShowHowItWorks(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto bg-white rounded-t-[32px] z-50 p-6"
              style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-[#000000] mb-3 text-center">How Split in 4 works</h3>
              <p className="text-sm text-[#71717A] text-center leading-relaxed">
                Pay one quarter today, then the remaining three payments monthly.
                You pay Br {installmentAmount.toLocaleString("en-ET")} now and the rest automatically every 30 days.
              </p>
              <div className="mt-5 rounded-2xl bg-[#F4F4F5] p-4">
                {paymentSchedule.map((payment) => (
                  <div key={payment.label} className="flex items-center justify-between py-2 border-b border-slate-200 last:border-b-0">
                    <span className="text-sm text-[#71717A]">{payment.label}</span>
                    <span className="text-sm font-semibold text-[#000000]">Br {payment.amount.toLocaleString("en-ET")}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowHowItWorks(false)}
                className="w-full mt-5 py-3.5 rounded-full bg-black text-white font-semibold"
              >
                Got it
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
