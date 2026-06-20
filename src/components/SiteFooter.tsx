import PageShell from "@/components/PageShell";
import { SITE_NAME } from "@/lib/site";
import {
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
        <PageShell className="py-6 text-center">
          <p className="footer-disclaimer text-xs tracking-wide text-muted">
            <span aria-hidden>⚠️</span> Independent · NOT an official government
            website · NDSAP · Article 19(1)(a)
          </p>
          <nav
            aria-label="Footer"
            className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/85 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mt-4 text-sm text-muted">
            © {new Date().getFullYear()} {SITE_NAME} — Independent research.
            Building India one data point at a time.
            <Link
              href="/blog"
              className="ml-1 text-[10px] opacity-20 transition-opacity hover:opacity-50"
              aria-label="Insights"
            >
              ·
            </Link>
          </p>
          {/* <p className="mt-2 text-xs text-muted/80">
            Built by the minds graduated from IITs
          </p> */}
        </PageShell>
      </div>
    </footer>
  );
}
