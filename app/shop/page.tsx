"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Headphones, Heart, Sparkles } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";

const allProducts = [
  {
    id: 1,
    name: 'Samsung 55" TV',
    fullPrice: 45000,
    monthlyPrice: 1500,
    brand: "Samsung",
    bgColor: "#E0F2FE",
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
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
  },
];

const mockShopData = {
  heroBanners: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800",
      title: "Samsung Week",
      subtitle: "0% Interest at Shoa Supermarket",
    },
  ],
  brands: [
    { id: "b1", name: "Nike", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop" },
    { id: "b2", name: "IKEA", logo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200&auto=format&fit=crop" },
    { id: "b3", name: "Samsung", logo: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=200&auto=format&fit=crop" },
    { id: "b4", name: "Apple", logo: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=200&auto=format&fit=crop" },
    { id: "b5", name: "Zara", logo: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=200&auto=format&fit=crop" },
  ],
  topDeals: allProducts.slice(0, 3),
  forYouFeed: allProducts.slice(3),
};

export default function ShopPage() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filterProducts = (product: (typeof allProducts)[number]) => {
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  };

  const filteredDeals = mockShopData.topDeals.filter(filterProducts);
  const filteredForYou = mockShopData.forYouFeed.filter(filterProducts);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-ET");
  };

  return (
    <div className="min-h-screen w-full max-w-[400px] mx-auto flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-5 pt-6 pb-3 sticky top-0 z-20 bg-white/95 backdrop-blur-md"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-[85%] flex items-center gap-3 bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 rounded-full py-3 px-5 transition-all focus-within:ring-2 focus-within:ring-emerald-500/20">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Filter products in shop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
          />
          </div>
          <button
            type="button"
            aria-label="Wishlist"
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full transition-colors"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => router.push("/care")}
            aria-label="Customer support chat"
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full transition-colors"
          >
            <Headphones className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="px-5"
      >
        <div className="flex overflow-x-auto gap-4 hide-scrollbar py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["All", ...mockShopData.brands.map((brand) => brand.name)].map((brandName) => {
            const brandData = mockShopData.brands.find((item) => item.name === brandName);
            return (
            <button
              key={brandName}
              onClick={() => setSelectedBrand(brandName)}
              className="shrink-0 flex flex-col items-center"
            >
              <div
                className={`w-16 h-16 rounded-full border-2 overflow-hidden transition-colors ${
                  selectedBrand === brandName ? "border-emerald-500" : "border-transparent"
                }`}
              >
                {brandData ? (
                  <img src={brandData.logo} alt={brandData.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-semibold text-sm">
                    All
                  </div>
                )}
              </div>
              <span className="text-xs font-medium text-center mt-1 text-slate-700">{brandName}</span>
            </button>
            );
          })}
        </div>
      </motion.div>

      <div className="flex-1 px-5 pb-32 overflow-y-auto">
        <div className="w-full h-[220px] rounded-3xl overflow-hidden relative mt-4 shadow-sm">
          <img
            src={mockShopData.heroBanners[0].image}
            alt={mockShopData.heroBanners[0].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
          <div className="absolute left-4 bottom-4">
            <p className="text-white text-xl font-bold">{mockShopData.heroBanners[0].title}</p>
            <p className="text-white/90 text-sm font-medium">{mockShopData.heroBanners[0].subtitle}</p>
            <button className="mt-3 px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold rounded-full w-fit">
              Shop Collection →
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 mt-10">
          <Sparkles className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
          <h2 className="text-[1.35rem] font-black tracking-tighter text-slate-900">Top Deals</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 snap-x hide-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filteredDeals.map((product) => (
            <article
              key={product.id}
              onClick={() => router.push(`/product/${product.id}`)}
              className="relative w-[160px] shrink-0 snap-start rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
            >
              <span className="absolute top-2 left-2 z-10 bg-slate-900 text-white uppercase tracking-widest text-[9px] font-bold px-2.5 py-1 rounded-md">
                Sale
              </span>
              <div
                className="aspect-square relative"
                style={{ backgroundColor: product.bgColor }}
              >
                <button
                  type="button"
                  aria-label="Save to wishlist"
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5" />
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">{product.name}</h3>
                <p className="text-xs text-slate-400 line-through mt-1 font-medium">
                  {formatPrice(product.fullPrice)} ETB
                </p>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">From</span>
                  <span className="text-base font-black text-emerald-500 tracking-tight">{formatPrice(product.monthlyPrice)} ETB</span>
                  <span className="text-[10px] font-medium text-slate-500">/mo</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <h2 className="text-[1.35rem] font-black tracking-tighter text-slate-900 mt-10 mb-4">Just For You</h2>
        <div className="grid grid-cols-2 gap-4 pb-24">
          {filteredForYou.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              onClick={() => router.push(`/product/${product.id}`)}
              className="rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
            >
              <div
                className="aspect-square relative"
                style={{ backgroundColor: product.bgColor }}
              >
                <button
                  type="button"
                  aria-label="Save to wishlist"
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5" />
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">{product.name}</h3>
                <p className="text-xs text-slate-400 line-through mt-1 font-medium">
                  {formatPrice(product.fullPrice)} ETB
                </p>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">From</span>
                  <span className="text-base font-black text-emerald-500 tracking-tight">{formatPrice(product.monthlyPrice)} ETB</span>
                  <span className="text-[10px] font-medium text-slate-500">/mo</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDeals.length === 0 && filteredForYou.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <p className="mt-4 text-sm text-slate-400">
              No products found
            </p>
          </div>
        )}
      </div>

      <AppBottomNav active="shop" />
    </div>
  );
}
