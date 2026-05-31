"use client";

import DisclaimerBanner from "@/components/DisclaimerBanner";
import LandingPageBackground from "@/components/LandingPageBackground";
import Nav from "@/components/Nav";
import ScrollAnimations from "@/components/ScrollAnimations";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import { usePathname } from "next/navigation";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div
      className={`metallic-page min-h-full ${isHome ? "landing-with-bg" : ""}`}
    >
      {isHome && <LandingPageBackground />}
      <div className="lab-grid" aria-hidden />
      <SmoothScroll />
      <ScrollAnimations />
      <div className="site-header fixed inset-x-0 top-0 z-50 w-full">
        <DisclaimerBanner />
        <Nav />
      </div>
      <div
        className={`relative z-[1] w-full ${isHome ? "" : "pt-[var(--header-height)]"}`}
      >
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
