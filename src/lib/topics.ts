import { TOOL_ROUTES } from "@/lib/routes";

/** Per-topic accent colors — restrained, on-brand */
export const TOPIC_ACCENTS = {
  technology: "#E39774", // deep electric blue
  infrastructure: "#EEEEEE", // steel / graphite
  environment: "#64F58D", // deep emerald → cyan
  indexes: "#FFA69E", // white / silver / analytical grey
} as const;

export const CORE_TOPICS = [
  {
    id: "technology",
    title: "Technology",
    tags: [
      "Digital public infrastructure",
      "AI governance",
      "Connectivity gaps",
      "District-scale access",
    ],
    accent: TOPIC_ACCENTS.technology,
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    tags: [
      "Roads",
      "Electricity",
      "Solar power",
      "Budget lines",
      "Delivery delays",
      "Rural & urban equity",
    ],
    accent: TOPIC_ACCENTS.infrastructure,
  },
  {
    id: "environment",
    title: "Water • Trees • Air",
    tags: [
      "Ground water",
      "Forest cover",
      "Air quality",
      "Climate change",
      "Policy commitments",
    ],
    accent: TOPIC_ACCENTS.environment,
    accentSecondary: "#EEEEEE", // cyan lift for environment lane
  },
  {
    id: "indexes",
    title: "Indexes",
    tags: [
      "Household income",
      "Fiscal burden",
      "Public safety",
      "Policy history",
      "Verification & extension",
    ],
    accent: TOPIC_ACCENTS.indexes,
    links: [
      { label: "Household Income Index", href: TOOL_ROUTES.ghi },
      { label: "Tax Policy Estimator", href: TOOL_ROUTES.tax },
      { label: "Public Safety Data", href: TOOL_ROUTES.crime },
      { label: "Policy History Lab", href: TOOL_ROUTES.history },
    ],
  },
] as const;
