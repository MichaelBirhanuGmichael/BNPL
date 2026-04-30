"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";

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

const allProducts = [
  {
    id: 1,
    name: "Galaxy S26 Ultra Dual SIM 12GB",
    price: 3999,
    originalPrice: 4203,
    discountPercent: 4,
    brand: "Samsung",
    bgColor: "#E5E7EB",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Nike Air Force 1",
    price: 149,
    originalPrice: 435,
    discountPercent: 65,
    brand: "Nike",
    bgColor: "#CBD5E1",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Real Gold Flat Spiga Chain",
    price: 3599,
    originalPrice: 5000,
    discountPercent: 28,
    brand: "Goldline",
    bgColor: "#E5E7EB",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Winner Sky Electric Scooter",
    price: 1099,
    originalPrice: 1350,
    discountPercent: 18,
    brand: "Winner",
    bgColor: "#E2E8F0",
    image: "https://images.unsplash.com/photo-1623071298598-8beaf9e67ef4?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    name: "iPhone 17 Pro 256GB",
    price: 4699,
    originalPrice: 4699,
    discountPercent: 0,
    brand: "Apple",
    bgColor: "#E2E8F0",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    name: "Yamaha PSR-SX900",
    price: 7089,
    originalPrice: 7440,
    discountPercent: 5,
    brand: "Yamaha",
    bgColor: "#E5E7EB",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=700&q=80",
  },
];

export default function ShopPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof categoryTabs)[number]>("Women");
  const [searchQuery, setSearchQuery] = useState("");

  const filterProducts = (product: (typeof allProducts)[number]) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  };

  const filteredProducts = allProducts.filter(filterProducts);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-ET");
  };

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
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-2xl shadow-sm" />
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
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-2xl shadow-sm" />
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
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="w-14 h-14 rounded-full bg-slate-100 object-cover border border-slate-200"
                  />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" />
                </div>
                <p className="mt-2 text-xs font-medium text-slate-700 leading-tight">{store.name}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 mb-4 flex items-center justify-between">
          <h2 className="text-[1.35rem] font-semibold tracking-tight text-black">Discover</h2>
          <button type="button" onClick={() => router.push("/search")} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
            View all
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 pb-24">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 + index * 0.04 }}
              onClick={() => router.push(`/product/${product.id}`)}
              className="rounded-[24px] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="aspect-square relative rounded-b-none bg-[#F4F4F5]">
                <button
                  type="button"
                  aria-label="Save to wishlist"
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full text-gray-500 hover:text-red-500 shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition-colors"
                >
                  <Heart className="w-3.5 h-3.5" />
                </button>
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-2.5">
                <h3 className="text-sm font-semibold text-black line-clamp-2 leading-tight">{product.name}</h3>
                <p className="mt-1 text-lg font-semibold text-black">
                  Br {formatPrice(Math.round(product.price / 4))} <span className="text-xs text-[#71717A] font-medium">/ mo</span>
                </p>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#71717A]">Br {formatPrice(product.price)}</span>
                  <span className="text-[#71717A] line-through">Br {formatPrice(product.originalPrice)}</span>
                  {product.discountPercent > 0 && <span className="font-bold text-red-500">-{product.discountPercent}%</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Search className="w-10 h-10 text-slate-300" />
            <p className="mt-4 text-sm text-slate-400">No products found</p>
          </div>
        )}
      </div>

      <AppBottomNav active="shop" />
    </div>
  );
}
