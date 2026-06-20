import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { CONTACT_ROUTE } from "@/lib/routes";
import { CONTRIBUTION_PATHS, REPO_URL } from "@/lib/contribute";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contribute | The Research Bharat",
  description:
    "Contribute code, research topics, co-authored publications, or datasets to The Research Bharat.",
};

export default function ContributePage() {
  return (
    <main className="w-full section-pad-y">
      <PageShell>
        <header className="lab-section-header mb-12 w-full md:mb-14" data-scroll-header>
          <p className="lab-meta" data-scroll-header-item>
            <span className="text-accent">SECTION</span>
            <span className="text-muted"> · </span>
            CONTRIBUTE
          </p>
          <p className="font-label mt-3 text-accent" data-scroll-header-item>
            Open research
          </p>
          <h1
            className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground"
            data-scroll-header-item
          >
            How to contribute
          </h1>
          <p
            className="mt-4 max-w-[min(100%,52rem)] text-lg leading-relaxed text-muted"
            data-scroll-header-item
          >
            The Research Bharat is independent and open. Whether you write code, propose
            topics, co-author analysis, or share data—we want verifiable,
            district-scale work that citizens can inspect and extend.
          </p>
        </header>

        <ul className="grid w-full gap-6 md:grid-cols-2 md:gap-8" data-scroll-group>
          {CONTRIBUTION_PATHS.map((path, index) => (
            <li key={path.id} data-scroll-item>
              <article className="glass-card lab-card flex h-full flex-col border-l-4 border-accent p-[clamp(1.25rem,3vw,2rem)]">
                <span className="lab-specimen-id lab-meta text-accent">
                  PATH-{String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display mt-3 text-2xl text-foreground md:text-[1.65rem]">
                  {path.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{path.summary}</p>
                <ol className="mt-5 flex-1 space-y-2.5 border-t border-white/15 pt-5 text-sm leading-relaxed text-muted">
                  {path.steps.map((step) => (
                    <li key={step} className="flex gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {step}
                    </li>
                  ))}
                </ol>
                {path.cta.external ? (
                  <a
                    href={path.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lab-btn lab-btn-secondary mt-6 w-fit"
                  >
                    {path.cta.label} ↗
                  </a>
                ) : (
                  <Link href={path.cta.href} className="lab-btn lab-btn-secondary mt-6 w-fit">
                    {path.cta.label}
                  </Link>
                )}
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-[min(100%,52rem)] text-sm leading-relaxed text-muted">
          Questions before you start? Use the{" "}
          <Link
            href={CONTACT_ROUTE}
            className="font-medium text-accent underline underline-offset-2"
          >
            contact form
          </Link>
          . Code contributions go through{" "}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline underline-offset-2"
          >
            GitHub
          </a>
          .
        </p>
      </PageShell>
    </main>
  );
}
