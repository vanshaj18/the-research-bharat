"use client";

import PageShell from "@/components/PageShell";
import {
  CONTACT_ROUTE,
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
  { label: "Publication", href: PUBLICATIONS_ROUTE },
  { label: "LookPublic", href: LOOKPUBLIC_ROUTE },
  { label: "Contact", href: CONTACT_ROUTE },
] as const;

const NAV_LINK_CLASS =
  "font-display text-base font-medium transition-colors md:text-[1.0625rem]";

function homeHref(hash: string, onHome: boolean) {
  return onHome ? hash : `/${hash}`;
}

function NavAnchor({
  href,
  children,
  onClick,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${NAV_LINK_CLASS} ${
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
  const dropdownRef = useRef<HTMLLIElement>(null);

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

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="nav-transparent fixed inset-x-0 top-0 z-50 w-full">
      <PageShell
        as="nav"
        className="flex min-h-[var(--nav-height)] flex-wrap items-center justify-between gap-x-4 gap-y-3 py-3"
      >
        <Link
          href={onHome ? "#top" : "/"}
          className="font-display shrink-0 text-[1.35rem] leading-none tracking-tight text-foreground md:text-[1.5rem]"
        >
          ResearchIndia
        </Link>

        {/* <NavLabStatus className="order-3 hidden w-full justify-center md:order-none md:flex md:w-auto lg:mx-4" /> */}

        {/* <button
          type="button"
          aria-label="Toggle menu"
          className="lab-btn lab-btn-secondary px-3 py-2 text-lg normal-case tracking-normal md:order-none md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button> */}

        <ul
          className={`${
            mobileOpen
              ? "glass-panel absolute inset-x-0 top-full flex flex-col gap-4 border-b py-6 [padding-inline:var(--pad-x)]"
              : "hidden"
          } md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}
        >
          {/* {mobileOpen && (
            <li className="md:hidden">
              <NavLabStatus className="w-full justify-center" />
            </li>
          )} */}

          {HOME_LINKS.map((link) => (
            <li key={link.hash}>
              <NavAnchor
                href={homeHref(link.hash, onHome)}
                onClick={closeMobile}
              >
                {link.label}
              </NavAnchor>
            </li>
          ))}

          {PAGE_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMobile}
                className={`${NAV_LINK_CLASS} ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-foreground/92 hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              onClick={() => setToolsOpen((o) => !o)}
              className={`flex items-center gap-1.5 ${NAV_LINK_CLASS} text-foreground/92 hover:text-accent`}
            >
              Tools
              <span
                className={`inline-block text-sm transition-transform ${toolsOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>
            {toolsOpen && (
              <ul className="glass-panel mt-2 flex flex-col gap-1 rounded-lg p-2 md:absolute md:left-0 md:mt-2 md:min-w-[240px]">
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
