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
    <div className="fixed inset-x-0 bottom-0 z-[80] mx-auto w-full max-w-[400px] px-5 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none">
      <div className="relative rounded-full border border-gray-100 bg-white px-6 py-3 shadow-xl pointer-events-auto">
        <div className="flex items-center justify-around">
          <BottomItem
            icon={<Compass className="h-5 w-5 stroke-[1.8]" />}
            label="Discover"
            active={active === "discover"}
            onClick={() => router.push("/dashboard")}
          />
          <BottomItem
            icon={<Search className="h-5 w-5 stroke-[1.8]" />}
            label="Shop"
            active={active === "shop"}
            onClick={() => router.push("/shop")}
          />

          <div className="w-14" />

          <BottomItem
            icon={<CreditCard className="h-5 w-5 stroke-[1.8]" />}
            label="Money"
            active={active === "money"}
            onClick={() => router.push("/money")}
          />
          <BottomItem
            icon={<UserRound className="h-5 w-5 stroke-[1.8]" />}
            label="Profile"
            active={active === "profile"}
            onClick={() => router.push("/profile")}
          />
        </div>

        <button
          type="button"
          onClick={() => router.push("/checkout")}
          className="absolute -top-7 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-[#1BDE89] to-[#00B86B] text-white shadow-[0_8px_22px_rgba(0,184,107,0.45)]"
          aria-label="Open QR scanner"
        >
          <QrCode className="h-7 w-7" />
        </button>
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
