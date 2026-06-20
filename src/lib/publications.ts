import { CORE_TOPICS, TOPIC_ACCENTS } from "@/lib/topics";

export type ResearchType =
  | "Issue Brief"
  | "Research Paper"
  | "Special Report"
  | "Working Paper";

export type TopicCategory = (typeof CORE_TOPICS)[number]["title"];

export type PublicationTopicFilterId =
  | "all"
  | (typeof CORE_TOPICS)[number]["id"];

const TOPIC_CATEGORY_IDS = Object.fromEntries(
  CORE_TOPICS.map((topic) => [topic.title, topic.id]),
) as Record<TopicCategory, Exclude<PublicationTopicFilterId, "all">>;

export const PUBLICATION_TOPIC_FILTER_ORDER = [
  "infrastructure",
  "technology",
  "indexes",
  "environment",
] as const satisfies readonly Exclude<PublicationTopicFilterId, "all">[];

export const PUBLICATION_TOPIC_FILTERS = [
  { id: "all", label: "All", accent: null },
  ...PUBLICATION_TOPIC_FILTER_ORDER.map((id) => {
    const topic = CORE_TOPICS.find((entry) => entry.id === id)!;
    return { id: topic.id, label: topic.title, accent: topic.accent };
  }),
] as const;

export function getTopicCategoryAccent(category: TopicCategory): string {
  const topic = CORE_TOPICS.find((entry) => entry.title === category);
  return topic?.accent ?? TOPIC_ACCENTS.indexes;
}

export function getTopicCategoryId(
  category: TopicCategory,
): Exclude<PublicationTopicFilterId, "all"> {
  return TOPIC_CATEGORY_IDS[category];
}

type PublicationBase = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  topic_category: TopicCategory;
  tags?: string[];
  authors?: string;
};

export type ResearchPublication = PublicationBase & {
  category: "research";
  type: ResearchType;
  url: string;
  /** When true, shows a "Key Paper" corner banner in the publications list. */
  key_paper?: boolean;
};

export type BlogPublication = PublicationBase & {
  category: "blog";
  slug: string;
};

export type Publication = ResearchPublication | BlogPublication;

export type PublishingLayer = {
  layer: string;
  purpose: string;
  audience: string;
};

export const PUBLICATIONS_HERO = {
  section: "PUBLICATIONS",
  label: "Research output",
  title: "Publications",
  description:
    "Evidence-based research and blog posts drawn from data that has been hidden—or never synthesized for public use.",
  architecture: {
    title: "The architecture of publishing",
    rows: [
      {
        layer: "Research Paper",
        purpose: "Deep investigation & evidence",
        audience: "Researchers, analysts, academia",
      },
      {
        layer: "Policy Paper",
        purpose: "Actionable governance recommendations",
        audience: "Policymakers, institutions, media",
      },
      {
        layer: "Public Edition",
        purpose: "Simplified understanding for citizens",
        audience: "General public, students, social audience",
      },
    ] satisfies PublishingLayer[],
  },
} as const;

export const RESEARCH_PUBLICATIONS: ResearchPublication[] = [
  {
    id: "green-credits",
    category: "research",
    title: "A Two-Decade Study of Green Cover and Green Credits in India",
    type: "Research Paper",
    url: "#",
    date: "2026-04-12",
    authors: "The Research Bharat Research",
    topic_category: "Water • Trees • Air",
    tags: ["Green Credits", "Green Cover", "Carbon Credits", "Ecology disruption"],
    excerpt:
      "An economoics concept designed to incentivize ecological preservation and restoration, while real ecologic assets are being destroyed.",
  },
  {
    id: "aravali-forest-range",
    category: "research",
    title: "Comprehensive Socio-Ecological and Policy Assessment of the Aravalli Forest Range",
    type: "Research Paper",
    url: "#",
    date: "2026-04-12",
    authors: "The Research Bharat Research",
    topic_category: "Water • Trees • Air",
    tags: ["Aravali Forest", "Environmental Mismanagement", "Case Study"],
    excerpt:
      "A detailed analysis of the Aravali Forest, and how it is being mismanaged.",
  },
  {
    id: "purchasing-power-sensitivity",
    category: "research",
    title: "Purchasing Power, Price Sensitivity, and the Cost of Formality",
    type: "Research Paper",
    url: "#",
    date: "2026-04-12",
    authors: "The Research Bharat Research",
    topic_category: "Indexes",
    tags: ["Purchasing Power", "Price Sensitivity", "Cost of Formality"],
    excerpt:
      "A detailed analysis of purchasing power, price sensitivity, and the cost of formality in India.",
  },
  {
    id: "subsidy-ecosystem",
    category: "research",
    title: "Following the Money: Who Really Benefits From India's Subsidy Ecosystem?",
    type: "Working Paper",
    url: "#",
    date: "2026-01-08",
    authors: "The Research Bharat Research",
    topic_category: "Indexes",
    tags: ["Subsidy Ecosystem", "Beneficiaries", "Policy Analysis"],
    excerpt:
      "A detailed analysis of who really benefits from India's subsidy ecosystem, and how it affects the economy and society.",
  },
  {
    id: "true-race-of-ai",
    category: "research",
    title: "The True Race of AI: Can we progress sustainably?",
    type: "Research Paper",
    url: "#",
    date: "2026-02-15",
    authors: "The Research Bharat Research",
    topic_category: "Technology",
    tags: ["AI", "Race", "Sustainability"],
    excerpt:
      "A detailed analysis of the true race of AI, and how it affects the economy and society.",
  },
  {
    id: "ai-race",
    category: "research",
    title: "The AI Race: Where Are We and Where Do We Want to Go?",
    type: "Research Paper",
    url: "#",
    date: "2026-02-15",
    authors: "The Research Bharat Research",
    topic_category: "Technology",
    tags: ["AI", "Race", "Sustainability"],
    excerpt:
      "A detailed analysis of the AI race, where we are and where we want to go.",
  },
  {
    id: "sustainable-infrastructure",
    category: "research",
    title: "Adoption of sustainable infrastructure methodology for future India ",
    type: "Research Paper",
    url: "#",
    date: "2026-02-15",
    authors: "The Research Bharat Research",
    topic_category: "Infrastructure",
    tags: ["Sustainable Infrastructure", "Methodology", "Future of India"],
    excerpt:
      "A detailed analysis of the adoption of sustainable infrastructure methodology for future India.",
  },
  {
    id: "railway-system",
    category: "research",
    title: "A tactical shift from 20th century to 25th century railway system in India",
    type: "Research Paper",
    url: "#",
    date: "2026-02-15",
    authors: "The Research Bharat Research",
    topic_category: "Infrastructure",
    tags: ["Railway System", "20th Century", "25th Century", "India"],
    excerpt:
      "A detailed analysis of the tactical shift from 20th century to 25th century railway system in India.",
  },
  {
    id: "quantum-race",
    category: "research",
    title: "The Quantum Race: Global Trends, India's Position, and the Road to Quantum Advantage",
    type: "Research Paper",
    url: "#",
    date: "2026-02-15",
    authors: "The Research Bharat Research",
    topic_category: "Technology",
    tags: ["Quantum Race", "Global Trends", "India's Position", "Quantum Advantage"],
    excerpt: "A detailed analysis of the quantum race, global trends, India's position, and the road to quantum advantage.",
  },
  {
    id : "road-to-bharat-2047",
    category: "research",
    title: "The Road to Bharat 2047: Infrastructure",
    type: "Research Paper",
    date: "2026-02-15",
    url: "#",
    key_paper: true,
    authors: "The Research Bharat Research",
    topic_category: "Infrastructure",
    tags: ["Road to Bharat 2047", "Vision", "Future of India"],
    excerpt:
      "A detailed analysis of the road to Bharat 2047, and the vision for the future of India from infrastructure perspective.",
  },
  {
    id : "road-to-bharat-2047-technology",
    category: "research",
    title: "The Road to Bharat 2047: Technology",
    type: "Research Paper",
    url: "#",
    date: "2026-02-15",
    key_paper: true,
    authors: "The Research Bharat Research",
    topic_category: "Technology",
    tags: ["Road to Bharat 2047", "Technology", "Future of India"],
    excerpt:
      "A detailed analysis of the road to Bharat 2047, and the vision for the future of India from technology perspective.",
  },
  {
    id: "road-to-bharat-2047-water-air-trees",
    category: "research",
    title: "The Road to Bharat 2047: Water, Air, and Trees",
    type: "Research Paper",
    url: "#",
    date: "2026-02-15",
    key_paper: true,
    authors: "The Research Bharat Research",
    topic_category: "Water • Trees • Air",
    tags: ["Road to Bharat 2047", "Water", "Air", "Trees", "Future of India"],
    excerpt:
      "A detailed analysis of the road to Bharat 2047, and the vision for the future of India from water, air, and trees perspective.",
  }
];

export const BLOG_PUBLICATIONS: BlogPublication[] = [
  {
    id: "green-credits-ipl",
    category: "blog",
    slug: "dot-ball-green-credits",
    title: "Dot Ball: Green Credits in the IPL",
    date: "2026-05-01",
    authors: "The Research Bharat Research",
    topic_category: "Water • Trees • Air",
    tags: ["Green Credits", "IPL", "Economics", "Sports"],
    excerpt:
      "Where are the 1500+ trees planted per dot ball in 2025?",
  },
  {
    id: "bellandur-lake-degradation",
    category: "blog",
    slug: "bellandur-lake-degradation",
    title: "Bellandur Lake Degradation: A Case Study of Environmental Mismanagement",
    date: "2026-04-18",
    authors: "The Research Bharat Research",
    topic_category: "Water • Trees • Air",
    tags: ["Bellandur Lake", "Environmental Degradation", "Urban Planning"],
    excerpt: "Lakes are dying while lake-view apartments are being built.",
  },
  {
    id: "mangarove-saviour",
    category: "blog",
    slug: "mangarove-saviour",
    title: "Who actually saves during floods: Pune Case Study",
    date: "2026-03-22",
    authors: "The Research Bharat Research",
    topic_category: "Infrastructure",
    tags: ["Floods", "Pune", "Case Study", "Urban Planning"],
    excerpt:
      "A detailed analysis of who actually saves during floods in Pune, and how it affects the economy and society.",
  },
];

export const PUBLICATION_SECTIONS = [
  {
    id: "research",
    title: "Research",
    subtitle:
      "Issue briefs, research papers, special reports, and working papers—each with stated sources and methods.",
    items: RESEARCH_PUBLICATIONS,
  },
  {
    id: "blogs",
    title: "Blogs",
    subtitle:
      "Research notes and commentary on transparency, methodology, and India's data landscape.",
    items: BLOG_PUBLICATIONS,
  },
] as const;

export const RESEARCH_TYPES = [
  "All",
  "Issue Brief",
  "Research Paper",
  "Special Report",
  "Working Paper",
] as const;

/** @deprecated Use RESEARCH_PUBLICATIONS */
export const PUBLICATIONS = RESEARCH_PUBLICATIONS;

/** @deprecated Use RESEARCH_TYPES */
export const PUBLICATION_TYPES = RESEARCH_TYPES;

export function isBlogPublication(
  pub: Publication,
): pub is BlogPublication {
  return pub.category === "blog";
}

export function isResearchPublication(
  pub: Publication,
): pub is ResearchPublication {
  return pub.category === "research";
}
