import Section from "@/components/Section";
import { CORE_TOPICS } from "@/lib/topics";
import Link from "next/link";

export default function CoreTopics() {
  return (
    <Section
      id="topics"
      variant="alt"
      labCode="LANE_04"
      title="Core topics"
      subtitle="Four research lanes—each grounded in district-level data, open methods, and instruments anyone can inspect."
    >
      <ul className="grid w-full gap-6 md:grid-cols-2 md:gap-8" data-scroll-group>
        {CORE_TOPICS.map((topic, index) => (
          <li key={topic.id}>
            <article
              id={topic.id}
              className="section-anchor glass-card lab-card flex h-full flex-col p-[clamp(1.25rem,3vw,2rem)]"
              data-scroll-item
              style={
                {
                  borderLeftWidth: "4px",
                  borderLeftColor: topic.accent,
                  ...( "accentSecondary" in topic && topic.accentSecondary
                    ? {
                        backgroundImage: `linear-gradient(135deg, rgb(10 124 114 / 0.05) 0%, rgb(14 143 168 / 0.03) 55%, transparent 100%)`,
                      }
                    : {}),
                } as React.CSSProperties
              }
            >
              <span
                className="lab-specimen-id lab-meta"
                style={{ color: topic.accent }}
              >
                SPEC-{String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-display mt-3 text-2xl md:text-[1.65rem]"
                style={{ color: topic.accent }}
              >
                {topic.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">
                {topic.description}
              </p>
              {"links" in topic && topic.links && (
                <ul className="mt-5 flex flex-wrap gap-2 border-t border-white/15 pt-5">
                  {topic.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="glass-chip inline-flex px-3 py-1 text-xs font-medium transition hover:border-[color:var(--topic-accent)] hover:text-[color:var(--topic-accent)]"
                        style={
                          {
                            "--topic-accent": topic.accent,
                            color: "rgb(216 222 230 / 0.95)",
                          } as React.CSSProperties
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
