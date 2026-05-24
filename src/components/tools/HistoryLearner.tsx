"use client";

import PageShell from "@/components/PageShell";
import { useState } from "react";

const LESSONS = [
  {
    id: "boston",
    title: "Boston Tea Party",
    snippet:
      "Taxation without representation fueled a boycott—and a harbor full of tea. A case study in organized civic pressure.",
  },
  {
    id: "suffrage",
    title: "Suffrage movement",
    snippet:
      "Decades of petitions, protests, and persistence until the ballot included more voices.",
  },
  {
    id: "labor",
    title: "Labor strikes",
    snippet:
      "Collective action turned workplace grievances into negotiated rights—often after prolonged refusal.",
  },
];

export default function HistoryLearner() {
  const [active, setActive] = useState(LESSONS[0].id);
  const lesson = LESSONS.find((l) => l.id === active) ?? LESSONS[0];

  return (
    <PageShell>
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-2">
          {LESSONS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => setActive(l.id)}
                className={`lab-btn w-full justify-start text-left normal-case tracking-normal ${
                  active === l.id
                    ? "lab-btn-active"
                    : "lab-btn-secondary text-foreground/75"
                }`}
              >
                {l.title}
              </button>
            </li>
          ))}
        </ul>
        <article className="glass-card flex-1 border-l-4 border-accent p-6 md:p-8">
          <h2 className="font-display text-3xl text-foreground md:text-4xl">
            {lesson.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {lesson.snippet}
          </p>
        </article>
      </div>
    </PageShell>
  );
}
