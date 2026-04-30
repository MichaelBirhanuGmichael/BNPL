"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MerchBrowser } from "@/components/merch-browser";

function StoreWebviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const merchantId = searchParams.get("id") ?? "m1";
  const merchantName = searchParams.get("name") ?? "Level Shoes";
  const merchantUrl = searchParams.get("url") ?? "levelshoes.com";
  const merchantLogo =
    searchParams.get("logo") ??
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=120&h=120&fit=crop";
  const hasNativeApp = searchParams.get("app") === "1";
  const productName = searchParams.get("product") ?? "Selected item";
  const productPrice = Number(searchParams.get("price") ?? "1000");
  const productUrl = searchParams.get("productUrl") ?? merchantUrl;

  return (
    <MerchBrowser
      merchantId={merchantId}
      merchantName={merchantName}
      merchantUrl={merchantUrl}
      merchantLogo={merchantLogo}
      productName={productName}
      productPrice={Number.isFinite(productPrice) ? productPrice : 1000}
      productUrl={productUrl}
      hasNativeApp={hasNativeApp}
      onClose={() => router.push("/shop")}
    />
  );
}

export default function StoreWebviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen max-w-[400px] mx-auto bg-white" />}>
      <StoreWebviewContent />
    </Suspense>
  );
}
