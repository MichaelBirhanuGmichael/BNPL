"use client";

import { Bell, Headphones, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockDashboardData } from "@/data/mockDashboardData";

export function MainTopNav() {
  const router = useRouter();

  return (
    <header className="px-6 pt-8 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
            {mockDashboardData.user.firstName.charAt(0)}
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Good morning,</p>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">{mockDashboardData.user.firstName}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search merchants and deals"
            onClick={() => router.push("/search")}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          <button
            type="button"
            aria-label="Open MEREQ Care support chat"
            onClick={() => router.push("/care")}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Headphones className="w-5 h-5 text-gray-700" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => router.push("/orders")}
            className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
