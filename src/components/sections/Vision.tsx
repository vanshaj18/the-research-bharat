import Section from "@/components/Section";
import VisionTimeline from "@/components/vision/VisionTimeline";

const PILLARS = [
  {
    title: "Uncover what is buried",
    body: "We surface datasets, filings, and indicators that never make the headline—but shape outcomes for millions.",
  },
  {
    title: "Publish with rigor",
    body: "Every insight is sourced, method-stated, and written for decision-makers who need clarity, not spin.",
  },
  {
    title: "Scale through tools",
    body: "Interactive indices and open instruments let anyone verify our work and extend the analysis.",
  },
];

const PEER_ORGS = [
  "Observer Research Foundation (ORF)",
  "Centre for Policy Research (CPR)",
  "Indian Council for Research on International Economic Relations (ICRIER)",
  "Gateway House",
  "Centre for the Study of Developing Societies (CSDS)",
];

export default function Vision() {
  return (
    <Section
      id="vision"
      labCode="HORIZON_2050"
      title="Vision"
      subtitle="A data-literate India from 2026 to 2050—research growth, civic clarity, and national advancement."
    >
      <VisionTimeline />

      <div className="grid gap-6 md:grid-cols-3 md:gap-8" data-scroll-group>
        {PILLARS.map((pillar, i) => (
          <article
            key={pillar.title}
            className="border-l-4 border-accent pl-10"
            data-scroll-item
          >
            <span className="font-label text-accent/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-3 text-2xl text-foreground">
              {pillar.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{pillar.body}</p>
          </article>
        ))}
      </div>

      <blockquote
        className="mt-[clamp(2.75rem,6vw,4.5rem)] w-full border-t border-white/15 pt-8 text-xl leading-relaxed text-foreground md:pt-10 md:text-2xl"
        data-scroll-reveal
      >
        &ldquo;Mature democracies are built on mature data. Our mandate is to
        make the hidden visible—and the visible actionable.&rdquo;
      </blockquote>

      <div
        className="glass-card lab-card mt-[clamp(2.5rem,5vw,4rem)] p-[clamp(1.25rem,3vw,2rem)]"
        data-scroll-reveal
      >
        <p className="lab-meta text-accent">Archive · peer network</p>
        <p className="font-label mt-2 text-accent">Research ecosystem</p>
        <p className="mt-3 max-w-[min(100%,52rem)] leading-relaxed text-muted">
          ResearchIndia stands alongside established institutions documented by
          the{" "}
          <a
            href="https://www.icwa.in/show_content.php?lang=1&level=1&ls_id=1586&lid=1555"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            Indian Council of World Affairs
          </a>
          —including ORF, CPR, ICRIER, and Gateway House—while focusing on
          subnational transparency and citizen-scale datasets.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {PEER_ORGS.map((org) => (
            <li
              key={org}
              className="glass-chip px-3 py-1 text-xs font-medium text-muted"
            >
              {org}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
