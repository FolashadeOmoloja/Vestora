import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vestora",
  description:
    "Vestora is a CBN-licensed multi-asset investment platform. Grow your wealth with treasury bills, mutual funds, stocks, ETFs, bonds, and fixed deposits — all in one place.",
  keywords: [
    "treasury bills Nigeria",
    "mutual funds Nigeria",
    "invest in stocks Nigeria",
    "NSE stocks",
    "fixed income investment",
    "CBN licensed investment platform",
    "Vestora",
  ],
  authors: [{ name: "Vestora" }],
  creator: "Vestora",
  publisher: "Vestora",
  metadataBase: new URL("https://vestora.ng"),
  openGraph: {
    title: "Vestora — Invest Smarter. Grow Faster.",
    description:
      "Access treasury bills, mutual funds, stocks, ETFs, and bonds from one platform. Backed by FirstBank. CBN licensed.",
    url: "https://vestora.ng",
    siteName: "Vestora",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Vestora — Invest Smarter. Grow Faster.",
    description:
      "Treasury bills, mutual funds, stocks, ETFs & bonds. One platform. CBN licensed.",
    creator: "@vestora_ng",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#0a2e16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
