"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home")
  const router = useRouter()

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
        <div className="flex-1 overflow-y-auto px-6 pb-36">
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
            <p className="text-white text-5xl font-bold tracking-tight">0 ETB</p>
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
                <span className="font-semibold text-[#1A1A1A]">1 of 3 transactions</span>
              </div>
              <div className="h-3 rounded-full bg-[#E5E7EB] overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: "33.33%",
                    backgroundColor: "#00D084"
                  }}
                />
              </div>
            </div>

            <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
              Make 3 Pay-in-Full transactions to prove your credit.
            </p>

            <Link 
              href="/shop"
              className="w-full h-12 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              style={{ backgroundColor: "#00D084" }}
            >
              Start Shopping
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/orders"
              className="w-full mt-3 h-12 rounded-full border border-[#D5DBE1] text-[#1A1A1A] font-semibold text-sm flex items-center justify-center active:scale-[0.98] transition-transform"
            >
              My Orders
            </Link>
          </div>
        </div>

        {/* Floating QR Button - Emerald Green with White QR Icon */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20">
          <button 
            className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse-slow"
            style={{
              backgroundColor: "#00D084",
              boxShadow: "0 4px 20px rgba(0, 208, 132, 0.5)"
            }}
          >
            {/* QR Code Icon */}
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="3" height="3" />
              <rect x="18" y="14" width="3" height="3" />
              <rect x="14" y="18" width="3" height="3" />
              <rect x="18" y="18" width="3" height="3" />
              <rect x="5" y="5" width="3" height="3" fill="currentColor" />
              <rect x="16" y="5" width="3" height="3" fill="currentColor" />
              <rect x="5" y="16" width="3" height="3" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Bottom Navigation - Floating White Pill */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="bg-white rounded-full px-6 py-3 shadow-xl border border-gray-100 flex items-center justify-around">
            <NavItem 
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              }
              label="Home"
              active={activeTab === "home"}
              onClick={() => setActiveTab("home")}
            />
            <NavItem 
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              label="Shop"
              active={activeTab === "shop"}
              onClick={() => setActiveTab("shop")}
            />
            {/* Spacer for QR button */}
            <div className="w-14" />
            <NavItem 
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              }
              label="Orders"
              active={activeTab === "orders"}
              onClick={() => router.push("/orders")}
            />
            <NavItem 
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 transition-colors"
      style={{ color: active ? "#00D084" : "#9CA3AF" }}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  )
}
