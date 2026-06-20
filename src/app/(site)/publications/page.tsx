import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PublicationEntry from "@/components/publications/PublicationEntry";
import ResearchPublicationsSection from "@/components/publications/ResearchPublicationsSection";
import {
  BLOG_PUBLICATIONS,
  PUBLICATION_SECTIONS,
  PUBLICATIONS_HERO,
  RESEARCH_PUBLICATIONS,
} from "@/lib/publications";
import { CONTACT_ROUTE } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Publications | The Research Bharat",
  description:
    "Research papers, issue briefs, and blog posts from The Research Bharat.",
};

export default function PublicationsPage() {
  const researchSection = PUBLICATION_SECTIONS.find(
    (section) => section.id === "research",
  )!;
  const blogsSection = PUBLICATION_SECTIONS.find(
    (section) => section.id === "blogs",
  )!;

  return (
    <main className="w-full section-pad-y">
      <PageShell>
        <header className="lab-section-header mb-12 w-full md:mb-14" data-scroll-header>
          <p className="lab-meta" data-scroll-header-item>
            <span className="text-accent">SECTION</span>
            <span className="text-muted"> · </span>
            {PUBLICATIONS_HERO.section}
          </p>
          <p className="font-label mt-3 text-accent" data-scroll-header-item>
            {PUBLICATIONS_HERO.label}
          </p>
          <h1
            className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground"
            data-scroll-header-item
          >
            {PUBLICATIONS_HERO.title}
          </h1>
          <p
            className="mt-4 max-w-[min(100%,52rem)] text-lg leading-relaxed text-muted"
            data-scroll-header-item
          >
            {PUBLICATIONS_HERO.description}
          </p>
          <div
            className="lab-hero-panel mt-8 w-full max-w-[min(100%,52rem)]"
            data-scroll-header-item
          >
            <h2 className="font-label text-sm text-accent">
              {PUBLICATIONS_HERO.architecture.title}
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 pr-4 font-semibold text-foreground">
                      Layer
                    </th>
                    <th className="pb-3 pr-4 font-semibold text-foreground">
                      Purpose
                    </th>
                    <th className="pb-3 font-semibold text-foreground">
                      Audience
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  {PUBLICATIONS_HERO.architecture.rows.map((row) => (
                    <tr key={row.layer} className="border-b border-border/60">
                      <td className="py-3 pr-4 font-medium text-foreground">
                        {row.layer}
                      </td>
                      <td className="py-3 pr-4 leading-relaxed">{row.purpose}</td>
                      <td className="py-3 leading-relaxed">{row.audience}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </header>

        <div className="flex w-full flex-col gap-16 md:gap-20" data-scroll-group>
          <ResearchPublicationsSection
            title={researchSection.title}
            subtitle={researchSection.subtitle}
            items={RESEARCH_PUBLICATIONS}
          />

          <section aria-labelledby="blogs-heading">
            <header className="mb-8 md:mb-10" data-scroll-item>
              <h2
                id="blogs-heading"
                className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-foreground"
              >
                {blogsSection.title}
              </h2>
              <p className="mt-3 max-w-[min(100%,52rem)] leading-relaxed text-muted">
                {blogsSection.subtitle}
              </p>
            </header>
            <ul className="w-full divide-y divide-border">
              {BLOG_PUBLICATIONS.map((pub, index) => (
                <li
                  key={pub.id}
                  className={`py-10 ${index === 0 ? "pt-0" : ""}`}
                  data-scroll-item
                >
                  <PublicationEntry pub={pub} />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-12 text-sm text-muted">
          Full PDFs and datasets will be linked as they are released. For early
          access, use the{" "}
          <a
            href={CONTACT_ROUTE}
            className="font-medium text-accent underline underline-offset-2"
          >
            contact form
          </a>
          .
        </p>
      </PageShell>
    </main>
  );
}
