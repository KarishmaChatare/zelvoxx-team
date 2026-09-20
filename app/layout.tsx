import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zelvoxx.com"),
  title: {
    default: "Zelvoxx - Premium Digital Growth Agency",
    template: "%s | Zelvoxx",
  },
  description:
    "We architect premium digital growth systems that generate predictable revenue and dominate industries.",
  keywords: [
    "Digital Growth Agency",
    "High-Converting Web Design",
    "Full-Stack Web Development",
    "Funnel Architecture",
    "Next.js Development",
    "Sales Automation",
  ],
  authors: [{ name: "Zelvoxx" }],
  creator: "Zelvoxx",
  publisher: "Zelvoxx",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zelvoxx.com",
    siteName: "Zelvoxx",
    title: "Zelvoxx - Premium Digital Growth Agency",
    description:
      "We architect premium digital growth systems that generate predictable revenue and dominate industries.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zelvoxx - Premium Digital Growth Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zelvoxx - Premium Digital Growth Agency",
    description:
      "We architect premium digital growth systems that generate predictable revenue and dominate industries.",
    images: ["/images/og-image.jpg"],
    creator: "@Zelvoxx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WhatsAppButton from "@/src/components/ui/WhatsAppButton";
import CookieConsent from "@/src/components/ui/CookieConsent";
import SitewideAmbientBackground from "@/src/components/ui/SitewideAmbientBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark overflow-x-hidden text-[15px] sm:text-[16px]"
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-bg.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-background text-white overflow-x-hidden min-h-screen`}
      >
        <SitewideAmbientBackground />
        {children}
        <WhatsAppButton />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}