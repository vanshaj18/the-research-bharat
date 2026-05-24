export type VisionMilestone = {
  year: number;
  title: string;
  body: string;
  signal: string;
};

export const VISION_MILESTONE_COLORS = [
  "#2A4D73",
  "#3B82F6",
  "#3B82F6",
  "#2E8F6A",
  "#00A34A",
  "#00C853",
] as const;

export function milestoneProgress(index: number, total: number): number {
  return total <= 1 ? 0 : index / (total - 1);
}

/** India vision arc 2026 → 2050 — positivity & research growth intensify over time */
export const VISION_MILESTONES: VisionMilestone[] = [
  {
    year: 2026,
    title: "Transparency baseline",
    body: "District-level datasets published in machine-readable form. Citizens can trace budgets, schemes, and outcomes for the first time at scale.",
    signal: "Open data",
  },
  {
    year: 2030,
    title: "Research acceleration",
    body: "Independent research output doubles. Policy literacy enters classrooms; journalists cite primary civic data by default.",
    signal: "Research growth",
  },
  {
    year: 2035,
    title: "Evidence in government",
    body: "State capitals run open policy simulations. Legislation carries published assumptions, sensitivity checks, and dissenting views.",
    signal: "Institutional rigor",
  },
  {
    year: 2040,
    title: "Real-time republic",
    body: "Subnational fiscal dashboards update in near real time. Safety, health, and infrastructure indices are comparable across districts.",
    signal: "Live accountability",
  },
  {
    year: 2045,
    title: "Regional knowledge hub",
    body: "India exports governance models and research partnerships across South Asia. Think tanks collaborate on shared open standards.",
    signal: "Global leadership",
  },
  {
    year: 2050,
    title: "Data-sovereign democracy",
    body: "Every citizen can read the budget that shapes their life. Hidden data is the exception—clarity, participation, and trust are the norm.",
    signal: "Vision realised",
  },
];

export const VISION_GRADIENT =
  "linear-gradient(90deg, #2A4D73 0%, #3B82F6 55%, #00C853 100%)";
