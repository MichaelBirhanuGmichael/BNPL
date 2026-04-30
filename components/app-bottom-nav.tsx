"use client";

import {
  Compass,
  CreditCard,
  QrCode,
  Search,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

type NavView = "discover" | "shop" | "money" | "profile";

export function AppBottomNav({ active }: { active: NavView }) {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full pointer-events-none">
      <div className="mx-auto w-full max-w-[400px] px-4 pb-[env(safe-area-inset-bottom,12px)]">
      <div className="relative h-16 w-full rounded-full border-t border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.03)] pointer-events-auto mx-0 mb-2">
        <div className="h-full flex items-center justify-around px-5">
          <BottomItem
            icon={<Compass className="h-[22px] w-[22px] stroke-[1.8]" />}
            label="Discover"
            active={active === "discover"}
            onClick={() => router.push("/discover")}
          />
          <BottomItem
            icon={<Search className="h-[22px] w-[22px] stroke-[1.8]" />}
            label="Shop"
            active={active === "shop"}
            onClick={() => router.push("/shop")}
          />

          <div className="w-16" />

          <BottomItem
            icon={<CreditCard className="h-[22px] w-[22px] stroke-[1.8]" />}
            label="Money"
            active={active === "money"}
            onClick={() => router.push("/money")}
          />
          <BottomItem
            icon={<UserRound className="h-[22px] w-[22px] stroke-[1.8]" />}
            label="Profile"
            active={active === "profile"}
            onClick={() => router.push("/profile")}
          />
        </div>

        <button
          type="button"
          onClick={() => router.push("/checkout")}
          className="absolute -top-6 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#31f5c2] text-black shadow-[0_8px_22px_rgba(49,245,194,0.45),inset_0_2px_8px_rgba(255,255,255,0.6)]"
          aria-label="Open QR scanner"
        >
          <QrCode className="h-6 w-6" />
        </button>
        </div>
      </div>
    </div>
  );
}

function BottomItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-0.5"
      style={{ color: active ? "#000000" : "#9CA3AF" }}
    >
      {icon}
      <span className="text-[10px] font-medium tracking-tight">{label}</span>
    </button>
  );
}
