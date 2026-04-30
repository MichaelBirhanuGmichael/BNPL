"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { LazyImage } from "@/components/lazy-image";

const merchants: Record<string, { name: string; logo: string; url: string; hasApp?: boolean }> = {
  samsung: {
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&h=120&fit=crop",
    url: "samsung.com",
    hasApp: true,
  },
  amazon: {
    name: "Amazon",
    logo: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop",
    url: "amazon.com",
    hasApp: true,
  },
  carrefour: {
    name: "Carrefour",
    logo: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=120&h=120&fit=crop",
    url: "carrefour.com",
    hasApp: true,
  },
  "zemen-home": {
    name: "Zemen Home",
    logo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop",
    url: "zemenhome.com",
  },
  "shoa-supermarket": {
    name: "Shoa Supermarket",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop",
    url: "shoasupermarket.com",
  },
  m1: {
    name: "Level Shoes",
    logo: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=120&h=120&fit=crop",
    url: "levelshoes.com",
    hasApp: true,
  },
  m5: {
    name: "Shoa Supermarket",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop",
    url: "shoasupermarket.com",
  },
  m6: {
    name: "IKEA",
    logo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop",
    url: "ikea.com",
  },
};

export default function StoreHandoffPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const merchant = merchants[params.id] ?? {
    name: "Partner Store",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=120&h=120&fit=crop",
    url: "store.com",
    hasApp: false,
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace(
        `/store-webview?id=${params.id}&name=${encodeURIComponent(merchant.name)}&url=${encodeURIComponent(
          merchant.url
        )}&logo=${encodeURIComponent(merchant.logo)}&app=${merchant.hasApp ? "1" : "0"}`
      );
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [router, params.id, merchant.name, merchant.url, merchant.logo, merchant.hasApp]);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="w-full text-center"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-black text-white text-xl font-semibold flex items-center justify-center">M</div>
          <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center">
            <Link2 className="w-4 h-4 text-zinc-500" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
          >
            <LazyImage
              src={merchant.logo}
              alt={merchant.name}
              wrapperClassName="w-14 h-14 rounded-2xl border border-zinc-200"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <p className="mt-6 text-sm text-zinc-600 leading-relaxed">
          Redirecting you to {merchant.name}. Your Br 1,000 credit limit is ready to use.
        </p>
      </motion.div>
    </div>
  );
}
