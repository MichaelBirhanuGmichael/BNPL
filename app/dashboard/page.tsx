"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Briefcase, ChevronLeft, ChevronRight, Heart, MapPin, Search, ShieldCheck } from "lucide-react"
import { AppBottomNav } from "@/components/app-bottom-nav"
import { mockDashboardData } from "@/data/mockDashboardData"
import { LazyImage } from "@/components/lazy-image"

const featuredStores = [
  { id: "s1", name: "Amazon", logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200" },
  { id: "s2", name: "Carrefour", logo: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200" },
  { id: "s3", name: "Samsung", logo: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=200" },
  { id: "s4", name: "Habesha Style", logo: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200" },
]

const discoverProducts = [
  {
    id: 1,
    name: "Galaxy S25 FE",
    price: 2178,
    originalPrice: 2699,
    discountPercent: 19,
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 5G",
    price: 3250,
    originalPrice: 3449,
    discountPercent: 5,
    image: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=700&q=80",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [activeDealIndex, setActiveDealIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const baseCardClass =
    "rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 active:scale-[0.995]"
  const sectionTitleClass = "text-[#000000] text-lg font-semibold mb-3"
  const transactionProgress =
    (mockDashboardData.creditBuilder.transactions.current / mockDashboardData.creditBuilder.transactions.required) * 100
  const remainingTransactions = Math.max(
    mockDashboardData.creditBuilder.transactions.required - mockDashboardData.creditBuilder.transactions.current,
    0
  )
  const remainingVolumeEtb = Math.max(
    mockDashboardData.creditBuilder.volumeEtb.required - mockDashboardData.creditBuilder.volumeEtb.current,
    0
  )
  const featuredDeals = mockDashboardData.featuredDeals
  const activeDeal = featuredDeals[activeDealIndex]

  const scrollDeals = (direction: "prev" | "next") => {
    setActiveDealIndex((previousIndex) => {
      if (direction === "next") {
        return (previousIndex + 1) % featuredDeals.length
      }
      return (previousIndex - 1 + featuredDeals.length) % featuredDeals.length
    })
  }

  useEffect(() => {
    const autoplay = window.setInterval(() => {
      setActiveDealIndex((previousIndex) => (previousIndex + 1) % featuredDeals.length)
    }, 4000)
    return () => {
      window.clearInterval(autoplay)
    }
  }, [featuredDeals.length])

  return (
    <div className="h-[100dvh] bg-white max-w-[400px] mx-auto relative overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-col h-full animate-slide-up">
        <div className="px-6 pt-4 pb-3 sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-3 bg-[#F3F4F6] rounded-full py-3 px-4">
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-[calc(10rem+env(safe-area-inset-bottom))] space-y-4">
          <section className="pt-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className={sectionTitleClass}>Featured stores</h3>
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

          {/* BNPL Limit Card - Deep Charcoal */}
          <div 
            className="rounded-2xl p-5 animate-fade-in border border-[#1F2937]"
            style={{ 
              backgroundColor: "#1A1A1A",
              animationDelay: "0.1s",
              boxShadow: "0 8px 24px rgba(17, 24, 39, 0.24)"
            }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#00D084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white/70 text-sm font-medium">Available BNPL Limit</p>
            </div>
              <p className="text-white text-[44px] leading-none font-bold tracking-tight">{mockDashboardData.wallet.availableLimitEtb} ETB</p>
            <p className="text-white/60 text-xs mt-2.5">Complete credit building to unlock</p>
          </div>

          {/* Credit Builder Card - Soft Light Green */}
          <div 
            className={`${baseCardClass} p-5 animate-fade-in`}
            style={{ 
              backgroundColor: "#ECFDF5",
              animationDelay: "0.2s" 
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-3"
                  style={{ backgroundColor: "rgba(0, 208, 132, 0.2)", color: "#00D084" }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Credit Builder
                </div>
                <h2 className="text-[#1A1A1A] text-[36px] leading-[1.05] font-bold">{mockDashboardData.wallet.lockedTierEtb.toLocaleString()} ETB</h2>
                <p className="text-[#1A1A1A] text-base font-semibold mt-1">Credit Builder Target</p>
              </div>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(0, 208, 132, 0.2)" }}
              >
                <svg className="w-5 h-5 text-[#00D084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>

            {/* Visual Progress Bar - Gray Track with 33% Emerald Fill */}
            <div className="mb-3">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>
                  {mockDashboardData.creditBuilder.transactions.current} / {mockDashboardData.creditBuilder.transactions.required} Transactions
                </span>
                <span>
                  {mockDashboardData.creditBuilder.volumeEtb.current.toLocaleString()} /{" "}
                  {mockDashboardData.creditBuilder.volumeEtb.required.toLocaleString()} ETB
                </span>
              </div>
              <div className="h-3 rounded-full bg-[#E5E7EB] overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${transactionProgress}%`,
                    backgroundColor: "#00D084"
                  }}
                />
              </div>
            </div>

            <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
              You&apos;re almost there! Complete {remainingTransactions} more Pay-in-Full{" "}
              {remainingTransactions === 1 ? "transaction" : "transactions"} totaling at least {remainingVolumeEtb.toLocaleString()} ETB to
              unlock your {mockDashboardData.wallet.lockedTierEtb.toLocaleString()} ETB BNPL limit.
            </p>

            <button
              type="button"
              onClick={() => router.push("/shop")}
              className="w-full h-11 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 active:scale-[0.985]"
              style={{ backgroundColor: "#00D084" }}
            >
              Start Shopping
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <Link
              href="/orders"
              className="w-full mt-2.5 h-11 rounded-full border border-[#D5DBE1] text-[#1A1A1A] font-semibold text-sm flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0 active:scale-[0.985]"
            >
              My Orders
            </Link>
          </div>

          {mockDashboardData.prosumerUpsell.show && (
            <div className={`${baseCardClass} bg-white p-4 animate-fade-in`}>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-500" />
                <h3 className="text-gray-900 font-semibold">{mockDashboardData.prosumerUpsell.title.replace(" 🚀", "")}</h3>
              </div>
              <p className="text-[#6B7280] text-sm mt-1.5 leading-relaxed">{mockDashboardData.prosumerUpsell.subtitle}</p>
              <button
                type="button"
                className="mt-3 border border-emerald-500 text-emerald-600 font-medium rounded-full px-4 py-2 hover:bg-emerald-50 transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0 active:scale-[0.985]"
              >
                {mockDashboardData.prosumerUpsell.ctaText}
              </button>
            </div>
          )}

          <section className="pt-1">
            <h3 className={sectionTitleClass}>Featured Deals</h3>
            <div className="relative py-1.5">
              <button
                type="button"
                onClick={() => scrollDeals("prev")}
                aria-label="Previous deal"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-all duration-200 ease-out hover:scale-[1.03] active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollDeals("next")}
                aria-label="Next deal"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-all duration-200 ease-out hover:scale-[1.03] active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="mx-12"
              >
                <article
                  key={activeDeal.merchantId}
                  className="relative w-full h-[180px] rounded-2xl overflow-hidden animate-fade-in shadow-sm"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(17, 24, 39, 0.88) 22%, rgba(17, 24, 39, 0.18)), url(${activeDeal.logoUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {activeDeal.promoBadge}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-3.5">
                    <p className="text-white text-xl leading-tight font-bold">{activeDeal.name}</p>
                    <p className="text-white/80 text-sm mt-0.5">{activeDeal.tagline}</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="pt-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className={sectionTitleClass}>Discover</h3>
              <button type="button" onClick={() => router.push("/shop")} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                View all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {discoverProducts.map((product) => (
                <article
                  key={product.id}
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="rounded-[24px] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden cursor-pointer"
                >
                  <div className="aspect-square relative bg-[#F4F4F5]">
                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full text-gray-500 hover:text-red-500 shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-sm font-semibold text-black line-clamp-2 leading-tight">{product.name}</h4>
                    <p className="mt-1 text-lg font-semibold text-black">
                      Br {Math.round(product.price / 4).toLocaleString("en-ET")} <span className="text-xs text-[#71717A] font-medium">/ mo</span>
                    </p>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-[#71717A]">Br {product.price.toLocaleString("en-ET")}</span>
                      <span className="text-[#71717A] line-through">Br {product.originalPrice.toLocaleString("en-ET")}</span>
                      <span className="font-bold text-red-500">-{product.discountPercent}%</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="pt-1">
            <h3 className={sectionTitleClass}>Stores Near You</h3>
            <div className="space-y-2.5">
              {mockDashboardData.nearbyStores.map((store) => (
                <div key={store.branchId} className={`${baseCardClass} p-3.5 bg-white`}>
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

          <div className="rounded-2xl p-4 bg-emerald-50 border border-emerald-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/70 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#1A1A1A] font-semibold">{mockDashboardData.trustBanner.title}</p>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{mockDashboardData.trustBanner.subtitle}</p>
              </div>
            </div>
          </div>
          <div className="h-2" />
        </div>

        <AppBottomNav active="discover" />
      </div>
    </div>
  )
}
