import PageShell from "@/components/PageShell";
import { SITE_NAME } from "@/lib/site";
import {
  BLOG_ROUTE,
  CONTACT_ROUTE,
  CONTRIBUTE_ROUTE,
  LOOKPUBLIC_ROUTE,
  PUBLICATIONS_ROUTE,
} from "@/lib/routes";
import Link from "next/link";

const WATERFALL_COLUMNS = 16;
const WATERFALL_WORDS = ["RESEARCH", "INDIA"] as const;

function WaterfallColumn({ offset }: { offset: number }) {
  const word = WATERFALL_WORDS[offset % 2];
  const chars = word.split("");
  const stream = Array.from({ length: 10 }, () => chars).flat();
  const loop = [...stream, ...stream];

  return (
    <div
      className="waterfall-column"
      style={
        {
          "--waterfall-delay": `${offset * -0.85}s`,
          "--waterfall-duration": `${9 + (offset % 6) * 1.2}s`,
        } as React.CSSProperties
      }
      aria-hidden
    >
      {loop.map((char, i) => (
        <span key={`${offset}-${i}`} className="waterfall-char">
          {char}
        </span>
      ))}
    </div>
  );
}

const FOOTER_LINKS = [
  { label: "Publications", href: PUBLICATIONS_ROUTE },
  { label: "Blog", href: BLOG_ROUTE },
  { label: "LookPublic", href: LOOKPUBLIC_ROUTE },
  { label: "Contribute", href: CONTRIBUTE_ROUTE },
  { label: "Contact", href: CONTACT_ROUTE },
] as const;

export default function SiteFooter() {
  return (
    <footer className="site-footer relative z-[1] w-full">
      <div className="waterfall-footer" data-scroll-footer>
        <div className="waterfall-glow" aria-hidden />
        <div className="waterfall-backdrop" aria-hidden>
          {Array.from({ length: WATERFALL_COLUMNS }, (_, i) => (
            <WaterfallColumn key={i} offset={i} />
          ))}
        </div>

        <div className="waterfall-hero">
          <p className="waterfall-name font-display">{SITE_NAME}</p>
        </div>
      </div>

      <div className="site-footer-static">
        <PageShell className="px-1 py-8 text-center sm:py-6">
          <p className="footer-disclaimer mx-auto max-w-xl text-[0.6875rem] leading-relaxed tracking-wide text-muted sm:text-xs">
            <span aria-hidden>⚠️</span> Independent · NOT an official government
            website · NDSAP · Article 19(1)(a)
          </p>
          <nav
            aria-label="Footer"
            className="mx-auto mt-5 grid max-w-sm grid-cols-2 gap-x-4 gap-y-3 sm:mt-4 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-2"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/85 transition-colors hover:text-accent sm:text-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted sm:mt-4">
            ©{" "}
            <span suppressHydrationWarning>
              {new Date().getFullYear()}
            </span>{" "}
            {SITE_NAME} — Independent research. Building India one data point at
            a time.
          </p>
          {/* <p className="mt-2 text-xs text-muted/80">
            Built by the minds graduated from IITs
          </p> */}
        </PageShell>
      </div>
    </footer>
  );
}
