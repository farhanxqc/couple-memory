import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Agatha & Farhan — Our Story",
  description: "Arsip digital perjalanan dan kenangan Agatha & Farhan.",
  openGraph: {
    title: "Agatha & Farhan — Our Story",
    description: "Arsip digital perjalanan dan kenangan Agatha & Farhan.",
    type: "website",
    images: [
      {
        url: "/photos/hero.jpg",
        width: 2400,
        height: 1350,
        alt: "Agatha & Farhan — Our Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agatha & Farhan — Our Story",
    description: "Arsip digital perjalanan dan kenangan Agatha & Farhan.",
    images: ["/photos/hero.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <noscript>
          <style>{`[data-reveal],[data-hero]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
