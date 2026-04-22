"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Building2, Search, Store, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockDashboardData } from "@/data/mockDashboardData";

type SearchItem = {
  id: string;
  type: "merchant" | "deal" | "store";
  title: string;
  subtitle: string;
};

const searchableItems: SearchItem[] = [
  ...mockDashboardData.featuredDeals.map((deal) => ({
    id: `merchant-${deal.merchantId}`,
    type: "merchant" as const,
    title: deal.name,
    subtitle: deal.tagline,
  })),
  ...mockDashboardData.featuredDeals.map((deal) => ({
    id: `deal-${deal.merchantId}`,
    type: "deal" as const,
    title: deal.promoBadge,
    subtitle: `${deal.name} - ${deal.tagline}`,
  })),
  ...mockDashboardData.nearbyStores.map((store) => ({
    id: `store-${store.branchId}`,
    type: "store" as const,
    title: store.name,
    subtitle: `${store.type} - ${store.distanceKm}km away`,
  })),
];

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchableItems;
    return searchableItems.filter(
      (item) => item.title.toLowerCase().includes(normalized) || item.subtitle.toLowerCase().includes(normalized)
    );
  }, [query]);

  const iconByType = {
    merchant: <Building2 className="w-4 h-4 text-emerald-600" />,
    deal: <Tag className="w-4 h-4 text-emerald-600" />,
    store: <Store className="w-4 h-4 text-emerald-600" />,
  };

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto">
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Search</h1>
        </div>

        <div className="flex items-center gap-2 px-4 h-12 rounded-full bg-gray-50 border border-gray-100">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search merchants, deals, stores..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="px-5 pb-8 space-y-2">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full text-left p-3 rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">{iconByType[item.type]}</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          </button>
        ))}

        {filteredItems.length === 0 && <p className="text-sm text-gray-500 py-8 text-center">No matches found.</p>}
      </div>
    </div>
  );
}
