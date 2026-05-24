import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/** Pause before scroll starts */
export const SCROLL_DELAY = 0.22;
/** Scroll animation length */
export const SCROLL_DURATION = 1.15;

function getNavOffset(): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-height")
    .trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 92;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string, options?: { immediate?: boolean }) {
  const immediate = options?.immediate ?? false;
  const offset = getNavOffset();

  if (id === "top") {
    if (prefersReducedMotion()) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    gsap.to(window, {
      duration: immediate ? 0 : SCROLL_DURATION,
      delay: immediate ? 0 : SCROLL_DELAY,
      scrollTo: { y: 0 },
      ease: "power3.inOut",
    });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  if (prefersReducedMotion()) {
    const top =
      target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    return;
  }

  gsap.to(window, {
    duration: immediate ? 0 : SCROLL_DURATION,
    delay: immediate ? 0 : SCROLL_DELAY,
    scrollTo: { y: target, offsetY: offset },
    ease: "power3.inOut",
  });
}

export function parseAnchorId(href: string): string | null {
  if (href === "#" || href === "#top") return "top";
  if (href.startsWith("#")) return href.slice(1) || null;

  try {
    const url = new URL(href, window.location.origin);
    if (url.pathname !== "/" && url.pathname !== "") return null;
    const id = url.hash.replace("#", "");
    return id || "top";
  } catch {
    return null;
  }
}
