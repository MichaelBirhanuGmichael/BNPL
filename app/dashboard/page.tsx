"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Search } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { LazyImage } from "@/components/lazy-image";

const heroSlides = [
  {
    id: "h1",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000",
    title: "Luxury Edit. Pay in 4.",
    subtitle: "Lower financing rates with MEREQ.",
  },
  {
    id: "h2",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000",
    title: "Curated Brands. Zero Stress.",
    subtitle: "Shop premium picks and split with MEREQ.",
  },
];

const curatedRows = [
  {
    title: "Everyday Care",
    merchants: [
      { id: "faces", name: "Faces", logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200" },
      { id: "nars", name: "Nars", logo: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200" },
      { id: "loccitane", name: "L'Occitane", logo: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200" },
      { id: "lancome", name: "Lancome", logo: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200" },
    ],
  },
  {
    title: "Own the Look",
    merchants: [
      { id: "level", name: "Level Shoes", logo: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200" },
      { id: "tumi", name: "Tumi", logo: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200" },
      { id: "mk", name: "Michael Kors", logo: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200" },
      { id: "swarovski", name: "Swarovski", logo: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=200" },
    ],
  },
];

const discoverProducts = [
  { id: 1, name: "Real Gold Flat Spiga Chain", price: 3599, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=700", badge: "New Arrival" },
  { id: 2, name: "iPhone 15 0.3mm Slim Jelly", price: 2190, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=700", badge: "Pre-owned" },
  { id: 3, name: "Winner Sky Electric Scooter", price: 1099, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=700" },
  { id: 4, name: "Yamaha PSR-SX900", price: 7089, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=700", badge: "New Arrival" },
  { id: 5, name: "Nike Air Jordan 1 Low", price: 2180, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700" },
  { id: 6, name: "Google Pixel 8 Pro", price: 2950, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=700", badge: "Pre-owned" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="h-[100dvh] max-w-[400px] mx-auto relative overflow-hidden bg-[#FAF9F6]">
      <div className="flex flex-col h-full">
        <div className="px-6 pt-4 pb-3 sticky top-0 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-zinc-200/70">
          <div className="flex items-center gap-3 bg-[#EEF0F3] rounded-full py-3 px-4">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Stores or products"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-[calc(5.25rem+env(safe-area-inset-bottom))]">
          <section className="py-10">
            <div className="relative rounded-[2rem] overflow-hidden h-[230px]">
              <LazyImage
                src={heroSlides[heroIndex].image}
                alt={heroSlides[heroIndex].title}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-6 flex flex-col justify-end">
                <p className="text-white text-2xl font-bold leading-tight">{heroSlides[heroIndex].title}</p>
                <p className="text-white/85 text-sm mt-1">{heroSlides[heroIndex].subtitle}</p>
              </div>
            </div>
          </section>

          {curatedRows.map((row) => (
            <section key={row.title} className="py-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-zinc-900">{row.title}</h2>
                <button className="rounded-full bg-zinc-200/70 px-3 py-1 text-xs font-medium text-zinc-600">View all</button>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {row.merchants.map((merchant) => (
                  <article key={merchant.id} className="shrink-0 text-center w-[78px]">
                    <div className="relative mx-auto w-16 h-16">
                      <LazyImage
                        src={merchant.logo}
                        alt={merchant.name}
                        wrapperClassName="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-300/70"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white" />
                    </div>
                    <p className="mt-2 text-xs font-medium text-zinc-700 leading-tight">{merchant.name}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section className="py-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-zinc-900">Discover</h2>
              <button type="button" onClick={() => router.push("/shop")} className="rounded-full bg-zinc-200/70 px-3 py-1 text-xs font-medium text-zinc-600">
                View all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {discoverProducts.map((product) => (
                <article
                  key={product.id}
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="rounded-[2rem] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer"
                >
                  <div className="aspect-square relative bg-zinc-100">
                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full text-gray-500 shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    {product.badge && (
                      <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-zinc-700">
                        {product.badge}
                      </span>
                    )}
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-black line-clamp-2 leading-tight">{product.name}</h3>
                    <p className="mt-1 text-lg font-bold text-black">Br {Math.round(product.price / 4).toLocaleString("en-ET")} / mo</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Br {product.price.toLocaleString("en-ET")}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <AppBottomNav active="discover" />
      </div>
    </div>
  );
}
