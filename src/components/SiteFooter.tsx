import PageShell from "@/components/PageShell";
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

export default function SiteFooter() {
  return (
    <footer className="waterfall-footer relative z-[1] w-full" data-scroll-footer>
      <div className="waterfall-glow" aria-hidden />
      <div className="waterfall-backdrop" aria-hidden>
        {Array.from({ length: WATERFALL_COLUMNS }, (_, i) => (
          <WaterfallColumn key={i} offset={i} />
        ))}
      </div>

      <div className="waterfall-hero">
        <p className="waterfall-name font-display">Research India</p>
      </div>

      <PageShell as="footer" className="waterfall-meta relative z-10 py-6 text-center">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} ResearchIndia — Independent research.
          Building India one data point at a time.
          <Link
            href="/blog"
            className="ml-1 text-[10px] opacity-20 transition-opacity hover:opacity-50"
            aria-label="Insights"
          >
            ·
          </Link>
        </p>
      </PageShell>
    </footer>
  );
}
