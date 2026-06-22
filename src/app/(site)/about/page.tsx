import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { CONTACT_ROUTE, CONTRIBUTE_ROUTE } from "@/lib/routes";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | The Research Bharat",
  description:
    "Independent research publishing real insights from data that have been hidden. Building a new India, one data point at a time.",
};

const ABOUT_POINTS = [
  {
    title: "What we do",
    body: "We publish evidence-based research and tools drawn from government data, independent sources, and synthesis the media rarely covers—so citizens and decision-makers can see what shapes outcomes.",
  },
  {
    title: "How we work",
    body: "Every publication states its sources and methods. We favour reproducible analysis, open instruments, and district-scale clarity over headline spin.",
  },
  {
    title: "Independence",
    body: "The Research Bharat is not an official government website. We operate under NDSAP principles and Article 19(1)(a)—independent research for a data-literate republic.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="w-full section-pad-y">
      <PageShell>
        <header className="lab-section-header mb-12 w-full md:mb-14" data-scroll-header>
          <p className="lab-meta" data-scroll-header-item>
            <span className="text-accent">SECTION</span>
            <span className="text-muted"> · </span>
            ABOUT
          </p>
          <p className="font-label mt-3 text-accent" data-scroll-header-item>
            Who we are
          </p>
          <h1
            className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground"
            data-scroll-header-item
          >
            About The Research Bharat
          </h1>
          <p
            className="mt-4 max-w-[min(100%,52rem)] text-lg leading-relaxed text-muted"
            data-scroll-header-item
          >
            Publishing real insights from data that have been hidden. Building a
            new India, one data point at a time.
          </p>
        </header>

        <ul className="grid w-full gap-6 md:gap-8" data-scroll-group>
          {ABOUT_POINTS.map((point, index) => (
            <li key={point.title} data-scroll-item>
              <article className="glass-card lab-card border-l-4 border-accent p-[clamp(1.25rem,3vw,2rem)]">
                <span className="lab-specimen-id lab-meta text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display mt-3 text-2xl text-foreground md:text-[1.65rem]">
                  {point.title}
                </h2>
                <p className="mt-3 max-w-[min(100%,52rem)] leading-relaxed text-muted">
                  {point.body}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-[min(100%,52rem)] text-sm leading-relaxed text-muted">
          Want to collaborate or contribute research? Visit{" "}
          <Link
            href={CONTRIBUTE_ROUTE}
            className="font-medium text-accent underline underline-offset-2"
          >
            Contribute
          </Link>{" "}
          or reach us via the{" "}
          <Link
            href={CONTACT_ROUTE}
            className="font-medium text-accent underline underline-offset-2"
          >
            contact form
          </Link>
          .
        </p>
      </PageShell>
    </main>
  );
}
