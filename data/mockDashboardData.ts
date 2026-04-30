export const mockDashboardData = {
  user: { firstName: "Abebe", status: "BUILDING_CREDIT" },
  wallet: { availableLimitEtb: 0, lockedTierEtb: 1500 },
  creditBuilder: {
    transactions: { current: 1, required: 3 },
    volumeEtb: { current: 400, required: 1000 }
  },
  prosumerUpsell: {
    show: true,
    title: "Own a business? 🚀",
    subtitle: "Upload your TIN to skip the wait and unlock up to 3,000 Br instantly.",
    ctaText: "Verify Business"
  },
  featuredDeals: [
    {
      merchantId: "m-101",
      name: "Shoa Supermarket",
      logoUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80",
      promoBadge: "0% Interest",
      tagline: "Electronics & Groceries"
    },
    {
      merchantId: "m-102",
      name: "Zemen Home",
      logoUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
      promoBadge: "No Downpayment",
      tagline: "Modern Furniture"
    }
  ],
  nearbyStores: [
    { branchId: "b-201", name: "Bole Coffee Roasters", distanceKm: 0.4, type: "In-Store QR" },
    { branchId: "b-202", name: "Edna Mall Electronics", distanceKm: 1.2, type: "In-Store QR" }
  ],
  trustBanner: {
    title: "MEREQ Buyer Protection",
    subtitle: "Get exactly what you ordered, or your money back. Guaranteed."
  }
};
