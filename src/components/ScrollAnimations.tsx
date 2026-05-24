"use client";

import { initScrollAnimations, refreshScrollAnimations } from "@/lib/scrollAnimations";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      initScrollAnimations();
    });

    const onLoad = () => refreshScrollAnimations();
    window.addEventListener("load", onLoad);
    const refreshTimer = window.setTimeout(refreshScrollAnimations, 100);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
