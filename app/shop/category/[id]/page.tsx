"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Info, Search } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";

const categoryData: Record<
  string,
  {
    title: string;
    stores: { id: string; name: string; discount: string; logo: string }[];
    deals: { id: string; merchant: string; code: string; value: string }[];
  }
> = {
  mobiles: {
    title: "Mobiles",
    stores: [
      { id: "amazon", name: "Amazon", discount: "Up to 60%", logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=220" },
      { id: "samsung", name: "Samsung", discount: "Up to 40%", logo: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=220" },
    ],
    deals: [
      { id: "d1", merchant: "Amazon", code: "AMZETH", value: "Up to 50%" },
      { id: "d2", merchant: "Carrefour", code: "CAR5", value: "5%" },
      { id: "d3", merchant: "Habesha Style", code: "HS10", value: "10%" },
    ],
  },
  electronics: {
    title: "Electronics",
    stores: [
      { id: "carrefour", name: "Carrefour", discount: "Up to 35%", logo: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=220" },
      { id: "sheger", name: "Sheger Mart", discount: "Up to 20%", logo: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=220" },
    ],
    deals: [
      { id: "d4", merchant: "Sheger Mart", code: "SHEGER20", value: "20%" },
      { id: "d5", merchant: "Amazon", code: "TECH10", value: "10%" },
    ],
  },
  clothing: {
    title: "Clothing",
    stores: [
      { id: "habesha", name: "Habesha Style", discount: "Up to 25%", logo: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=220" },
      { id: "zemen", name: "Zemen Fashion", discount: "Up to 15%", logo: "https://images.unsplash.com/photo-1495121605193-b116b5b09a84?w=220" },
    ],
    deals: [
      { id: "d6", merchant: "Habesha Style", code: "ETHSTYLE", value: "15%" },
      { id: "d7", merchant: "Zemen Fashion", code: "ZEMEN10", value: "10%" },
    ],
  },
};

export default function ShopCategoryPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const category = useMemo(() => {
    if (!params?.id) return null;
    return categoryData[params.id] ?? null;
  }, [params]);

  return (
    <div className="min-h-screen w-full max-w-[400px] mx-auto flex flex-col bg-white">
      <header className="px-6 pt-4 pb-3 sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <button type="button" onClick={() => router.push("/shop")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-base font-bold text-slate-900">{category?.title ?? "Category"}</h1>
          <button type="button" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <Search className="w-4 h-4 text-slate-700" />
          </button>
        </div>
        <div className="flex items-center gap-3 bg-[#F3F4F6] rounded-full py-3 px-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input placeholder="Stores or products" className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-32">
        {!category ? (
          <p className="text-sm text-slate-500 mt-8">No category found.</p>
        ) : (
          <>
            <section className="mt-6">
              <h2 className="text-xl font-black text-slate-900 mb-3">Stores</h2>
              <div className="space-y-3">
                {category.stores.map((store) => (
                  <article key={store.id} className="rounded-[24px] bg-[#F3F4F6] p-3 flex items-center gap-3">
                    <img src={store.logo} alt={store.name} className="w-16 h-16 rounded-2xl object-cover" />
                    <div>
                      <p className="font-bold text-slate-900">{store.name}</p>
                      <p className="text-sm text-slate-600">{store.discount}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-black text-slate-900 mb-3">Deals</h2>
              <div className="grid grid-cols-2 gap-3">
                {category.deals.map((deal) => (
                  <article key={deal.id} className="rounded-[24px] bg-[#F3F4F6] p-4">
                    <p className="text-sm font-semibold text-slate-700">{deal.merchant}</p>
                    <p className="text-xs text-emerald-700 font-bold">{deal.code}</p>
                    <div className="mt-8 flex items-end justify-between">
                      <p className="text-[34px] font-black text-slate-900 leading-none">{deal.value}</p>
                      <Info className="w-4 h-4 text-slate-400" />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      <AppBottomNav active="shop" />
    </div>
  );
}
