"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AppBottomNav } from "@/components/app-bottom-nav";

const brands = ["All", "Nike", "Samsung", "IKEA", "Zara", "Apple"];

const products = [
  {
    id: 1,
    name: 'Samsung 55" TV',
    fullPrice: 45000,
    monthlyPrice: 1500,
    brand: "Samsung",
    bgColor: "#E0F2FE",
    icon: "tv",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Nike Air Max",
    fullPrice: 8500,
    monthlyPrice: 285,
    brand: "Nike",
    bgColor: "#FCE7F3",
    icon: "sneaker",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "IKEA Sofa Set",
    fullPrice: 32000,
    monthlyPrice: 1067,
    brand: "IKEA",
    bgColor: "#F3F4F6",
    icon: "sofa",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "MacBook Pro",
    fullPrice: 120000,
    monthlyPrice: 4000,
    brand: "Apple",
    bgColor: "#E5E7EB",
    icon: "laptop",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Zara Jacket",
    fullPrice: 4200,
    monthlyPrice: 140,
    brand: "Zara",
    bgColor: "#FEF3C7",
    icon: "jacket",
    image:
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Samsung Phone",
    fullPrice: 28000,
    monthlyPrice: 934,
    brand: "Samsung",
    bgColor: "#DBEAFE",
    icon: "phone",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
  },
];

function ProductIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case "tv":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="48" height="32" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <rect x="12" y="16" width="40" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <line x1="24" y1="52" x2="24" y2="44" stroke="currentColor" strokeWidth="2.5" />
          <line x1="40" y1="52" x2="40" y2="44" stroke="currentColor" strokeWidth="2.5" />
          <line x1="20" y1="52" x2="44" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "sneaker":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 40C8 40 12 28 24 28C32 28 36 32 44 32C52 32 56 36 56 40V44H8V40Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M8 44H56V48C56 50 54 52 52 52H12C10 52 8 50 8 48V44Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <circle cx="20" cy="36" r="2" fill="currentColor" />
          <circle cx="28" cy="34" r="2" fill="currentColor" />
          <circle cx="36" cy="35" r="2" fill="currentColor" />
        </svg>
      );
    case "sofa":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="28" width="48" height="16" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M12 28V24C12 20 16 16 20 16H44C48 16 52 20 52 24V28" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <rect x="4" y="32" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="52" y="32" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="12" y1="48" x2="12" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="52" y1="48" x2="52" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "laptop":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="14" width="44" height="28" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <rect x="14" y="18" width="36" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M4 46H60L56 52H8L4 46Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <line x1="28" y1="49" x2="36" y2="49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "jacket":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12L20 16L12 20V48H24V32H40V48H52V20L44 16L40 12H24Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M24 12C24 12 28 16 32 16C36 16 40 12 40 12" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="32" y1="20" x2="32" y2="32" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="24" r="1.5" fill="currentColor" />
          <circle cx="32" cy="30" r="1.5" fill="currentColor" />
        </svg>
      );
    case "phone":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="8" width="28" height="48" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <rect x="22" y="14" width="20" height="32" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="32" cy="52" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="28" y1="11" x2="36" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ShopPage() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-ET");
  };

  return (
    <div className="min-h-screen w-full max-w-[400px] mx-auto flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-5 pt-14 pb-4"
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div
            className="flex-1 flex items-center gap-3 px-4 py-3 rounded-full"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search brands or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "#1A1A1A" }}
            />
          </div>
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Brand Pills */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="px-5 pb-4"
      >
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: selectedBrand === brand ? "#ECFDF5" : "#F5F5F5",
                color: selectedBrand === brand ? "#00D084" : "#6B7280",
                border: selectedBrand === brand ? "1px solid #00D084" : "1px solid transparent",
              }}
            >
              {brand}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="flex-1 px-5 pb-32 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
              onClick={() => router.push(`/product/${product.id}`)}
              className="rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
              style={{ backgroundColor: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              {/* Product Image */}
              <div
                className="aspect-square"
                style={{ backgroundColor: product.bgColor }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-2 leading-tight" style={{ color: "#1A1A1A" }}>
                  {product.name}
                </h3>

                {/* Original Price - Crossed Out */}
                <p className="text-xs line-through mb-1" style={{ color: "#9CA3AF" }}>
                  {formatPrice(product.fullPrice)} ETB
                </p>

                {/* Monthly Price - Highlighted */}
                <p className="text-sm font-bold" style={{ color: "#00D084" }}>
                  From {formatPrice(product.monthlyPrice)} ETB
                  <span className="font-normal text-xs"> /month</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <p className="mt-4 text-sm" style={{ color: "#9CA3AF" }}>
              No products found
            </p>
          </div>
        )}
      </div>

      <AppBottomNav active="shop" />
    </div>
  );
}
