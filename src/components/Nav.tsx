"use client";

import PageShell from "@/components/PageShell";
import { SITE_NAME } from "@/lib/site";
import {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  CONTRIBUTE_ROUTE,
  LOOKPUBLIC_ROUTE,
  PUBLICATIONS_ROUTE,
  TOOL_LINKS,
} from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const HOME_LINKS = [
  { label: "Topics", hash: "#topics" },
  { label: "Vision", hash: "#vision" },
] as const;

const PAGE_LINKS = [
  { label: "About", href: ABOUT_ROUTE },
  { label: "Publication", href: PUBLICATIONS_ROUTE },
  { label: "LookPublic", href: LOOKPUBLIC_ROUTE },
  { label: "Contribute", href: CONTRIBUTE_ROUTE },
  { label: "Contact", href: CONTACT_ROUTE },
] as const;

const NAV_LINK_CLASS =
  "font-display text-base font-medium transition-colors min-[1301px]:text-[1.0625rem]";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out ${
          open ? "top-[7px] rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out ${
          open ? "top-[7px] -rotate-45" : "top-[14px]"
        }`}
      />
    </span>
  );
}

function homeHref(hash: string, onHome: boolean) {
  return onHome ? hash : `/${hash}`;
}

function NavAnchor({
  href,
  children,
  onClick,
  active,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${NAV_LINK_CLASS} ${className} ${
        active
          ? "text-accent"
          : "text-foreground/92 hover:text-accent"
      }`}
    >
      {children}
    </a>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1301px)");
    function onDesktopNav(e: MediaQueryListEvent | MediaQueryList) {
      if (e.matches) {
        setMobileOpen(false);
        setToolsOpen(false);
      }
    }
    onDesktopNav(mq);
    mq.addEventListener("change", onDesktopNav);
    return () => mq.removeEventListener("change", onDesktopNav);
  }, []);

  const closeMobile = () => setMobileOpen(false);
  const showMobileMenu = mounted && mobileOpen;

  return (
    <header
      className={`nav-transparent relative w-full${mounted && scrolled ? " scrolled" : ""}${showMobileMenu ? " nav-menu-open" : ""}`}
    >
      {showMobileMenu && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 bg-black/90 backdrop-blur-sm min-[1301px]:hidden"
          onClick={closeMobile}
        />
      )}

      <PageShell
        as="nav"
        className="relative z-50 flex min-h-[var(--nav-height)] items-center justify-between gap-x-4 py-3"
      >
        <Link
          href={onHome ? "#top" : "/"}
          onClick={closeMobile}
          className="font-display shrink-0 text-[1.2rem] leading-none tracking-tight text-foreground sm:text-[1.35rem] md:text-[1.5rem]"
        >
          {SITE_NAME}
        </Link>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="nav-hamburger-btn lab-btn lab-btn-secondary -mr-1 hidden h-10 w-10 shrink-0 items-center justify-center p-0 normal-case tracking-normal transition-[background,border-color,box-shadow] min-[300px]:flex min-[1301px]:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <HamburgerIcon open={mobileOpen} />
        </button>

        <ul
          id="mobile-nav"
          className={`max-[1300px]:absolute max-[1300px]:inset-x-0 max-[1300px]:top-full max-[1300px]:z-50 max-[1300px]:flex max-[1300px]:max-h-[calc(100dvh-var(--header-height))] max-[1300px]:flex-col max-[1300px]:gap-1 max-[1300px]:overflow-y-auto max-[1300px]:border-b max-[1300px]:py-4 max-[1300px]:[padding-inline:var(--pad-x)] max-[1300px]:transition-[opacity,visibility,transform] max-[1300px]:duration-200 ${
            showMobileMenu
              ? "mobile-nav-panel-open max-[1300px]:visible max-[1300px]:translate-y-0 max-[1300px]:opacity-100"
              : "max-[1300px]:pointer-events-none max-[1300px]:invisible max-[1300px]:-translate-y-1 max-[1300px]:opacity-0"
          } min-[1301px]:static min-[1301px]:flex min-[1301px]:max-h-none min-[1301px]:flex-row min-[1301px]:items-center min-[1301px]:gap-8 min-[1301px]:overflow-visible min-[1301px]:border-0 min-[1301px]:bg-transparent min-[1301px]:py-0 min-[1301px]:opacity-100 min-[1301px]:visible min-[1301px]:pointer-events-auto min-[1301px]:translate-y-0`}
        >
          {HOME_LINKS.map((link) => (
            <li key={link.hash} className="min-[1301px]:py-0">
              <NavAnchor
                href={homeHref(link.hash, onHome)}
                onClick={closeMobile}
                className="block py-2.5 min-[1301px]:py-0"
              >
                {link.label}
              </NavAnchor>
            </li>
          ))}

          {PAGE_LINKS.map((link) => (
            <li key={link.href} className="min-[1301px]:py-0">
              <Link
                href={link.href}
                onClick={closeMobile}
                className={`block py-2.5 min-[1301px]:py-0 ${NAV_LINK_CLASS} ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-foreground/92 hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="relative min-[1301px]:overflow-visible" ref={dropdownRef}>
            <button
              type="button"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              onClick={() => setToolsOpen((o) => !o)}
              className={`flex w-full items-center gap-1.5 py-2.5 min-[1301px]:w-auto min-[1301px]:py-0 ${NAV_LINK_CLASS} text-foreground/92 hover:text-accent`}
            >
              Tools
              <span
                className={`inline-block text-sm transition-transform ${toolsOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>
            {toolsOpen && (
              <ul className="glass-panel z-50 mt-2 flex flex-col gap-1 rounded-lg p-2 min-[1301px]:absolute min-[1301px]:right-0 min-[1301px]:left-auto min-[1301px]:mt-2 min-[1301px]:min-w-[240px] min-[1301px]:max-w-[min(16rem,calc(100vw-2*var(--pad-x)))]">
                {TOOL_LINKS.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      onClick={() => {
                        setToolsOpen(false);
                        closeMobile();
                      }}
                      className={`font-display block rounded-md px-3 py-2.5 text-base font-medium transition ${
                        pathname === tool.href
                          ? "bg-white/5 text-accent"
                          : "text-foreground/90 hover:bg-white/5 hover:text-accent"
                      }`}
                    >
                      {tool.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </PageShell>
    </header>
  );
}
