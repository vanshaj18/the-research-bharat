import { getSiteUrl, SITE_NAME, siteTitle } from "@/lib/site";
import type { Metadata } from "next";
import { Cinzel, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle(),
  description:
    "Publishing real insights from data that have been hidden. Building a new India, one data point at a time.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: siteTitle(),
    description:
      "Publishing real insights from data that have been hidden. Building a new India, one data point at a time.",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle(),
    description:
      "Publishing real insights from data that have been hidden. Building a new India, one data point at a time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full w-full antialiased">
          {children}
          <Analytics/>
      </body>
    </html>
  );
}
