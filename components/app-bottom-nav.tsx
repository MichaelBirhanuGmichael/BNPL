"use client";

import {
  ClipboardList,
  Home,
  QrCode,
  ShoppingBag,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

type NavView = "home" | "shop" | "orders" | "profile";

export function AppBottomNav({ active }: { active: NavView }) {
  const router = useRouter();

  return (
    <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-4 bg-gradient-to-t from-white via-white to-transparent">
      <div className="relative rounded-full border border-gray-100 bg-white px-6 py-3 shadow-xl">
        <div className="flex items-center justify-around">
          <BottomItem
            icon={<Home className="h-5 w-5" />}
            label="Home"
            active={active === "home"}
            onClick={() => router.push("/dashboard")}
          />
          <BottomItem
            icon={<ShoppingBag className="h-5 w-5" />}
            label="Shop"
            active={active === "shop"}
            onClick={() => router.push("/shop")}
          />

          <div className="w-14" />

          <BottomItem
            icon={<ClipboardList className="h-5 w-5" />}
            label="Orders"
            active={active === "orders"}
            onClick={() => router.push("/orders")}
          />
          <BottomItem
            icon={<User className="h-5 w-5" />}
            label="Profile"
            active={active === "profile"}
            onClick={() => router.push("/profile")}
          />
        </div>

        <button
          type="button"
          onClick={() => router.push("/checkout")}
          className="absolute -top-7 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[#00D084] text-white shadow-[0_4px_20px_rgba(0,208,132,0.5)]"
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
      style={{ color: active ? "#00D084" : "#9CA3AF" }}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
