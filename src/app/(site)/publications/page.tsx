import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PUBLICATIONS } from "@/lib/publications";
import { CONTACT_ROUTE } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Publications | ResearchIndia",
  description:
    "Issue briefs, research papers, and special reports from ResearchIndia.",
};

export default function PublicationsPage() {
  return (
    <main className="w-full section-pad-y">
      <PageShell>
        <header className="lab-section-header mb-12 w-full md:mb-14" data-scroll-header>
          <p className="lab-meta" data-scroll-header-item>
            <span className="text-accent">SECTION</span>
            <span className="text-muted"> · </span>
            PUBLICATIONS
          </p>
          <p className="font-label mt-3 text-accent" data-scroll-header-item>
            Research output
          </p>
          <h1
            className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground"
            data-scroll-header-item
          >
            Publications
          </h1>
          <p
            className="mt-4 max-w-[min(100%,52rem)] text-lg leading-relaxed text-muted"
            data-scroll-header-item
          >
            Evidence-based briefs and papers drawn from data that has been
            hidden—or never synthesized for public use. Each publication states
            its sources and methods.
          </p>
        </header>

        <ul className="w-full divide-y divide-border" data-scroll-group>
          {PUBLICATIONS.map((pub) => (
            <li key={pub.id} className="py-10 first:pt-0" data-scroll-item>
              <article className="border-l-4 border-accent pl-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="glass-chip px-3 py-0.5 text-xs font-medium text-accent">
                    {pub.type}
                  </span>
                  <time className="text-sm font-medium text-muted">
                    {pub.date}
                  </time>
                </div>
                <h2 className="font-display mt-3 text-2xl text-foreground md:text-3xl">
                  {pub.title}
                </h2>
                {pub.authors && (
                  <p className="mt-2 text-sm text-muted">{pub.authors}</p>
                )}
                <p className="mt-3 max-w-[min(100%,52rem)] leading-relaxed text-muted">
                  {pub.excerpt}
                </p>
                <button
                  type="button"
                  className="mt-4 text-sm font-semibold text-accent transition-colors hover:text-accent"
                  aria-label={`Download ${pub.title} — coming soon`}
                >
                  Read full brief →
                </button>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-muted">
          Full PDFs and datasets will be linked as they are released. For early
          access, use the{" "}
          <a href={CONTACT_ROUTE} className="font-medium text-accent underline underline-offset-2">
            contact form
          </a>
          .
        </p>
      </PageShell>
    </main>
  );
}
