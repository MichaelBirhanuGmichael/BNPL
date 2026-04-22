"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MapPin, ShieldCheck } from "lucide-react"
import { AppBottomNav } from "@/components/app-bottom-nav"
import { mockDashboardData } from "@/data/mockDashboardData"

export default function DashboardPage() {
  const router = useRouter()
  const transactionProgress =
    (mockDashboardData.creditBuilder.transactions.current / mockDashboardData.creditBuilder.transactions.required) * 100

  return (
    <div className="min-h-screen bg-white max-w-[400px] mx-auto relative overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-col h-screen animate-slide-up">
        {/* Header */}
        <div className="px-6 pt-14 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#9CA3AF] text-sm font-medium">Good morning</p>
              <h1 className="text-[#1A1A1A] text-2xl font-bold mt-0.5">Welcome to MEREQ</h1>
            </div>
            <button className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {/* BNPL Limit Card - Deep Charcoal */}
          <div 
            className="rounded-3xl p-6 mb-4 animate-fade-in"
            style={{ 
              backgroundColor: "#1A1A1A",
              animationDelay: "0.1s",
              boxShadow: "0 10px 40px rgba(26, 26, 26, 0.3), 0 0 60px rgba(0, 208, 132, 0.15)"
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#00D084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white/70 text-sm font-medium">Available BNPL Limit</p>
            </div>
              <p className="text-white text-5xl font-bold tracking-tight">{mockDashboardData.wallet.availableLimitEtb} ETB</p>
            <p className="text-white/50 text-xs mt-3">Complete credit building to unlock</p>
          </div>

          {/* Credit Builder Card - Soft Light Green */}
          <div 
            className="rounded-3xl p-6 animate-fade-in"
            style={{ 
              backgroundColor: "#ECFDF5",
              animationDelay: "0.2s" 
            }}
          >
            <div className="flex items-start justify-between mb-4">
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
                <h2 className="text-[#1A1A1A] text-xl font-bold">Unlock your 1,500 ETB Limit!</h2>
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
            <div className="mb-4">
              <div className="flex justify-between text-xs text-[#9CA3AF] mb-2">
                <span>Progress</span>
                <span className="font-semibold text-[#1A1A1A]">
                  {mockDashboardData.creditBuilder.transactions.current} of {mockDashboardData.creditBuilder.transactions.required} transactions
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

            <p className="text-xs text-[#9CA3AF] mb-3">
              {mockDashboardData.creditBuilder.volumeEtb.current} of {mockDashboardData.creditBuilder.volumeEtb.required} ETB spent.
            </p>

            <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
              Make 3 Pay-in-Full transactions to prove your credit.
            </p>

            <button
              type="button"
              onClick={() => router.push("/shop")}
              className="w-full h-12 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              style={{ backgroundColor: "#00D084" }}
            >
              Start Shopping
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <Link
              href="/orders"
              className="w-full mt-3 h-12 rounded-full border border-[#D5DBE1] text-[#1A1A1A] font-semibold text-sm flex items-center justify-center active:scale-[0.98] transition-transform"
            >
              My Orders
            </Link>
          </div>

          {mockDashboardData.prosumerUpsell.show && (
            <div className="rounded-3xl p-5 mt-4 border border-[#DBEAFE] bg-gradient-to-r from-blue-50 to-indigo-50 animate-fade-in">
              <h3 className="text-[#1A1A1A] text-base font-bold">{mockDashboardData.prosumerUpsell.title}</h3>
              <p className="text-[#6B7280] text-sm mt-1.5 leading-relaxed">{mockDashboardData.prosumerUpsell.subtitle}</p>
              <button
                type="button"
                className="mt-4 h-10 px-4 rounded-full border border-[#93C5FD] text-[#1E40AF] text-sm font-semibold hover:bg-white/70 transition-colors"
              >
                {mockDashboardData.prosumerUpsell.ctaText}
              </button>
            </div>
          )}

          <section className="mt-6">
            <h3 className="text-[#1A1A1A] text-lg font-bold mb-3">Featured Deals</h3>
            <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mockDashboardData.featuredDeals.map((deal) => (
                <article
                  key={deal.merchantId}
                  className="relative shrink-0 w-[220px] h-[220px] rounded-3xl overflow-hidden snap-start"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(17, 24, 39, 0.88) 22%, rgba(17, 24, 39, 0.18)), url(${deal.logoUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {deal.promoBadge}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-base font-semibold leading-tight">{deal.name}</p>
                    <p className="text-white/80 text-xs mt-1">{deal.tagline}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-[#1A1A1A] text-lg font-bold mb-3">Stores Near You</h3>
            <div className="space-y-3">
              {mockDashboardData.nearbyStores.map((store) => (
                <div key={store.branchId} className="rounded-2xl border border-[#E5E7EB] p-4 bg-white">
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

          <div className="rounded-3xl p-4 mt-6 bg-emerald-50 border border-emerald-100">
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
        </div>

        <AppBottomNav active="home" />
      </div>
    </div>
  )
}
