import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MEREQ - Smart Payments",
  description: "Pay smarter. Split purchases. Build credit.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white m-0 p-0 w-full h-full">
      <body className={`${inter.variable} font-sans antialiased m-0 p-0 w-full min-h-screen overflow-x-hidden`}>
        <main className="min-h-screen">{children}</main>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
