"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MerchBrowser } from "@/components/merch-browser";

export default function StoreWebviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const merchantId = searchParams.get("id") ?? "m1";
  const merchantName = searchParams.get("name") ?? "Level Shoes";
  const merchantUrl = searchParams.get("url") ?? "levelshoes.com";
  const merchantLogo =
    searchParams.get("logo") ??
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=120&h=120&fit=crop";
  const hasNativeApp = searchParams.get("app") === "1";

  return (
    <MerchBrowser
      merchantId={merchantId}
      merchantName={merchantName}
      merchantUrl={merchantUrl}
      merchantLogo={merchantLogo}
      hasNativeApp={hasNativeApp}
      onClose={() => router.push("/shop")}
    />
  );
}
