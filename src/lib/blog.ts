export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "hidden-district-data",
    title: "What District Data Reveals When You Look Past Aggregates",
    date: "2026-05-01",
    excerpt:
      "National headlines miss the variance that determines outcomes on the ground.",
    body: [
      "ResearchIndia was founded on a simple premise: the most consequential policy signals are often buried in subnational spreadsheets.",
      "We publish methodology-first briefs so journalists and officials can audit our claims—not just quote them.",
    ],
  },
  {
    slug: "one-data-point",
    title: "Building a New India, One Data Point at a Time",
    date: "2026-04-18",
    excerpt:
      "Incremental transparency compounds into systemic accountability.",
    body: [
      "Each indexed dataset, each calculator run, each open record linked is a brick in a larger civic infrastructure.",
      "Our tools are designed for verification: citizens should be able to reproduce our conclusions.",
    ],
  },
  {
    slug: "think-tank-landscape",
    title: "Where ResearchIndia Sits in India's Research Landscape",
    date: "2026-03-22",
    excerpt:
      "We learn from established institutions while focusing on citizen-scale data.",
    body: [
      "India's think-tank ecosystem—documented by ICWA and peers such as ORF, CPR, and ICRIER—sets a high bar for rigor.",
      "ResearchIndia complements that tradition with open instruments aimed at district-level transparency.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
