"use client";

import { parseAnchorId, scrollToId } from "@/lib/smoothScroll";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = parseAnchorId(hash) ?? hash.replace("#", "");
    const run = () => scrollToId(id, { immediate: false });
    const timer = window.setTimeout(run, 120);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest(
        'a[href^="#"], a[href^="/#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const id = parseAnchorId(href);
      if (!id) return;

      const onHome = pathname === "/";
      const isSamePageHash = href.startsWith("#");

      if (!isSamePageHash && !onHome) return;
      if (isSamePageHash && !document.getElementById(id) && id !== "top") {
        return;
      }

      e.preventDefault();
      scrollToId(id);

      const nextHash = id === "top" ? "#top" : `#${id}`;
      history.pushState(null, "", onHome ? nextHash : `/${nextHash}`);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
