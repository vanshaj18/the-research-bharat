export type Publication = {
  id: string;
  title: string;
  type: "Issue Brief" | "Research Paper" | "Special Report" | "Working Paper";
  date: string;
  excerpt: string;
  authors?: string;
};

export const PUBLICATIONS: Publication[] = [
  {
    id: "district-fiscal-gap",
    title: "The District Fiscal Transparency Gap in India",
    type: "Issue Brief",
    date: "2026-04-12",
    authors: "ResearchIndia Research Desk",
    excerpt:
      "Subnational budget data remains fragmented. We map what is published, what is missing, and what citizens cannot see.",
  },
  {
    id: "household-income-fpl",
    title: "Household Income and Poverty Benchmarks: A Method Note",
    type: "Research Paper",
    date: "2026-03-28",
    authors: "Fiscal Policy Unit",
    excerpt:
      "Methodology behind our Household Income Index—assumptions, data sources, and limitations for policy use.",
  },
  {
    id: "public-safety-trends",
    title: "Public Safety Trends: Reading the Data Beneath Headlines",
    type: "Special Report",
    date: "2026-02-15",
    authors: "Civic Data Lab",
    excerpt:
      "How violent crime indices are constructed, where official series diverge, and what researchers should verify first.",
  },
  {
    id: "open-data-india",
    title: "Open Data and District Governance in India",
    type: "Working Paper",
    date: "2026-01-08",
    authors: "ResearchIndia Research Desk",
    excerpt:
      "A framework for linking citizen platforms, government portals, and think-tank analysis at the district level.",
  },
];

export const PUBLICATION_TYPES = [
  "All",
  "Issue Brief",
  "Research Paper",
  "Special Report",
  "Working Paper",
] as const;
