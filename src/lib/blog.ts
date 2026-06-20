import { BLOG_PUBLICATIONS, type BlogPublication } from "@/lib/publications";

export type BlogPost = BlogPublication & {
  body: string[];
};

const BLOG_BODIES: Record<string, string[]> = {
  "hidden-district-data": [
    "The Research Bharat was founded on a simple premise: the most consequential policy signals are often buried in subnational spreadsheets.",
    "We publish methodology-first briefs so journalists and officials can audit our claims—not just quote them.",
  ],
  "one-data-point": [
    "Each indexed dataset, each calculator run, each open record linked is a brick in a larger civic infrastructure.",
    "Our tools are designed for verification: citizens should be able to reproduce our conclusions.",
  ],
  "think-tank-landscape": [
    "India's think-tank ecosystem—documented by ICWA and peers such as ORF, CPR, and ICRIER—sets a high bar for rigor.",
    "The Research Bharat complements that tradition with open instruments aimed at district-level transparency.",
  ],
};

export const BLOG_POSTS: BlogPost[] = BLOG_PUBLICATIONS.map((post) => ({
  ...post,
  body: BLOG_BODIES[post.slug] ?? [],
}));

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
