export type VisionMilestone = {
  year: string;
  startYear: number;
  endYear: number;
  title: string;
  body: string;
  signal: string;
};

export const VISION_MILESTONE_COLORS = [
  "#2A4D73",
  "#3B82F6",
  "#2E8F6A",
  "#00A34A",
  "#00C853",
] as const;

export function milestoneProgress(index: number, total: number): number {
  return total <= 1 ? 0 : index / (total - 1);
}

export function getCurrentMilestoneIndex(
  milestones: readonly VisionMilestone[],
  currentYear = new Date().getFullYear(),
): number {
  let match = -1;
  for (let i = 0; i < milestones.length; i++) {
    const milestone = milestones[i];
    if (
      currentYear >= milestone.startYear &&
      currentYear <= milestone.endYear
    ) {
      match = i;
    }
  }
  return match;
}

/** India vision arc 2026 → 2050 — positivity & research growth intensify over time */
export const VISION_MILESTONES: VisionMilestone[] = [
  {
    year: "2026–27",
    startYear: 2026,
    endYear: 2027,
    title: "Foundational research",
    body: "Introductory work drawing on government data, official sources, and independent records. The aim is to surface key insights the media rarely covers—making hidden patterns legible to the public.",
    signal: "Hidden insights",
  },
  {
    year: "2027–30",
    startYear: 2027,
    endYear: 2030,
    title: "Acceleration & independent data",
    body: "Scale independent data collection and research output in line with the think tank’s core aims. Publish policy papers and build courses and learning materials that carry our vision into classrooms and public debate.",
    signal: "Research growth",
  },
  {
    year: "2030–35",
    startYear: 2030,
    endYear: 2035,
    title: "Open public policy",
    body: "Bring openness to every public scheme, dataset, and policy—and put citizens at the centre of policymaking. Retire century-old laws that no longer serve a future India; align governance with what comes next.",
    signal: "Open governance",
  },
  {
    year: "2035–40",
    startYear: 2035,
    endYear: 2040,
    title: "Thinking citizens",
    body: "Equip citizens with the thinking skills and curiosity to shape India’s future. Policy literacy becomes a civic habit—not a specialist skill.",
    signal: "Civic curiosity",
  },
  {
    year: "2040–50",
    startYear: 2040,
    endYear: 2050,
    title: "Technology-led future",
    body: "India enters a new technology era where progress is driven by innovation, open discussion, long-range planning, and sustainability—woven into how the republic governs and grows.",
    signal: "Future India",
  },
];

export const VISION_GRADIENT =
  "linear-gradient(90deg, #2A4D73 0%, #3B82F6 55%, #00C853 100%)";
