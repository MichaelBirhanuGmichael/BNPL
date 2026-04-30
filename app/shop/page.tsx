"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { LazyImage } from "@/components/lazy-image";
import { mockDashboardData } from "@/data/mockDashboardData";

type CategoryItem = {
  id: string;
  title: string;
  image: string;
};

const topCategories: CategoryItem[] = [
  { id: "mobiles", title: "Mobiles", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500" },
  { id: "electronics", title: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" },
  { id: "jewellery", title: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500" },
];

const categoryTabs = ["Women", "Men", "Kids"] as const;

const tabCategories: Record<(typeof categoryTabs)[number], CategoryItem[]> = {
  Women: [
    { id: "clothing", title: "Clothing", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" },
    { id: "shoes", title: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: "bags", title: "Bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" },
    { id: "jewellery", title: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500" },
    { id: "electronics", title: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" },
    { id: "mobiles", title: "Mobiles", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500" },
  ],
  Men: [
    { id: "electronics", title: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" },
    { id: "mobiles", title: "Mobiles", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500" },
    { id: "shoes", title: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: "clothing", title: "Clothing", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" },
    { id: "bags", title: "Bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" },
    { id: "jewellery", title: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500" },
  ],
  Kids: [
    { id: "clothing", title: "Clothing", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" },
    { id: "shoes", title: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: "electronics", title: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" },
    { id: "bags", title: "Bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" },
    { id: "mobiles", title: "Mobiles", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500" },
    { id: "jewellery", title: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500" },
  ],
};

const featuredStores = [
  { id: "amazon", name: "Amazon", logo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200" },
  { id: "carrefour", name: "Carrefour", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200" },
  { id: "samsung", name: "Samsung", logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200" },
  { id: "sheger-mart", name: "Sheger Mart", logo: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200" },
  { id: "habesha-style", name: "Habesha Style", logo: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200" },
];

export default function ShopPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof categoryTabs)[number]>("Women");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen w-full max-w-[400px] mx-auto flex flex-col bg-white">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-6 pt-4 pb-3 sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100"
      >
        <div className="flex items-center gap-3 bg-[#F3F4F6] rounded-full py-3 px-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Stores or products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </motion.div>
      <div className="flex-1 px-6 pb-32 overflow-y-auto">
        <section className="mt-4">
          <h2 className="text-[1.55rem] font-black tracking-tight text-slate-900 mb-4">Top categories</h2>
          <div className="grid grid-cols-3 gap-3">
            {topCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => router.push(`/shop/category/${item.id}`)}
                className="rounded-[20px] bg-[#F3F4F6] p-3 min-h-[132px] text-left"
              >
                <div className="flex justify-center">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    wrapperClassName="w-16 h-16 rounded-2xl shadow-sm"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 text-[15px] font-bold text-slate-900 leading-tight">{item.title}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex gap-6 mb-4 border-b border-slate-200">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-base font-semibold transition-colors ${
                  activeTab === tab ? "text-black border-b-[3px] border-black" : "text-slate-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {tabCategories[activeTab].map((item) => (
              <button
                key={`${activeTab}-${item.id}`}
                type="button"
                onClick={() => router.push(`/shop/category/${item.id}`)}
                className="rounded-[20px] bg-[#F3F4F6] p-3 min-h-[132px] text-left"
              >
                <div className="flex justify-center">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    wrapperClassName="w-16 h-16 rounded-2xl shadow-sm"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 text-[15px] font-bold text-slate-900 leading-tight">{item.title}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[1.55rem] font-black tracking-tight text-slate-900">Featured stores</h2>
            <button type="button" className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              View all
            </button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {featuredStores.map((store) => (
              <article key={store.id} className="shrink-0 text-center w-16">
                <div className="relative mx-auto w-14 h-14">
                  <LazyImage
                    src={store.logo}
                    alt={store.name}
                    wrapperClassName="w-14 h-14 rounded-full bg-slate-100 border border-slate-200"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" />
                </div>
                <p className="mt-2 text-xs font-medium text-slate-700 leading-tight">{store.name}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[1.55rem] font-black tracking-tight text-slate-900">Stores Near You</h2>
            <button type="button" className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              View all
            </button>
          </div>
          <div className="space-y-2.5">
            {mockDashboardData.nearbyStores.map((store) => (
              <div key={store.branchId} className="p-3.5 bg-white rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#ECFDF5] text-[#00D084] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1A1A1A] truncate">{store.name}</p>
                      <p className="text-xs text-[#9CA3AF]">{store.type}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#4B5563] px-2.5 py-1 rounded-full bg-[#F3F4F6]">
                    {store.distanceKm}km
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pb-24" />
      </div>

      <AppBottomNav active="shop" />
    </div>
  );
}
