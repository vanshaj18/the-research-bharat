"use client";

import PublicationEntry from "@/components/publications/PublicationEntry";
import {
  getTopicCategoryId,
  PUBLICATION_TOPIC_FILTERS,
  type PublicationTopicFilterId,
  type ResearchPublication,
} from "@/lib/publications";
import { useMemo, useState } from "react";

type ResearchPublicationsSectionProps = {
  title: string;
  subtitle: string;
  items: readonly ResearchPublication[];
};

export default function ResearchPublicationsSection({
  title,
  subtitle,
  items,
}: ResearchPublicationsSectionProps) {
  const [activeFilter, setActiveFilter] =
    useState<PublicationTopicFilterId>("all");
  const [keyPaperOnly, setKeyPaperOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((pub) => {
      if (keyPaperOnly && !pub.key_paper) return false;
      if (activeFilter === "all") return true;
      return getTopicCategoryId(pub.topic_category) === activeFilter;
    });
  }, [activeFilter, items, keyPaperOnly]);

  return (
    <section aria-labelledby="research-heading">
      <header className="mb-8 md:mb-10" data-scroll-item>
        <h2
          id="research-heading"
          className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-foreground"
        >
          {title}
        </h2>
        <p className="mt-3 max-w-[min(100%,52rem)] leading-relaxed text-muted">
          {subtitle}
        </p>
      </header>

      <div
        className="mb-8 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter research publications"
        data-scroll-item
      >
        {PUBLICATION_TOPIC_FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={isActive}
              className={`lab-btn inline-flex items-center gap-2 normal-case tracking-normal ${
                isActive
                  ? "lab-btn-active"
                  : "lab-btn-secondary text-foreground/75"
              }`}
              style={
                isActive && filter.accent
                  ? {
                      borderColor: `color-mix(in srgb, ${filter.accent} 60%, transparent)`,
                      background: `linear-gradient(180deg, color-mix(in srgb, ${filter.accent} 28%, transparent) 0%, color-mix(in srgb, ${filter.accent} 8%, rgb(10 10 11 / 0.6)) 100%)`,
                    }
                  : undefined
              }
            >
              {filter.accent && (
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: filter.accent,
                    boxShadow: `0 0 10px ${filter.accent}99`,
                  }}
                  aria-hidden
                />
              )}
              {filter.label}
            </button>
          );
        })}

        <span
          className="mx-1 hidden h-5 w-px bg-border sm:inline-block"
          aria-hidden
        />

        <button
          type="button"
          onClick={() => setKeyPaperOnly((current) => !current)}
          aria-pressed={keyPaperOnly}
          className={`lab-btn inline-flex items-center gap-2 normal-case tracking-normal ${
            keyPaperOnly
              ? "lab-btn-active"
              : "lab-btn-secondary text-foreground/75"
          }`}
        >
          Key Paper
        </button>
      </div>

      <ul className="w-full divide-y divide-border">
        {filteredItems.length > 0 ? (
          filteredItems.map((pub, index) => (
            <li
              key={pub.id}
              className={`py-10 ${index === 0 ? "pt-0" : ""}`}
              data-scroll-item
            >
              <PublicationEntry pub={pub} />
            </li>
          ))
        ) : (
          <li className="py-10 text-sm text-muted" data-scroll-item>
            No research publications match these filters yet.
          </li>
        )}
      </ul>
    </section>
  );
}
