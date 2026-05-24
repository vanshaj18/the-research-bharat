import { TOOL_ROUTES } from "@/lib/routes";

/** Per-topic accent colors — restrained, on-brand */
export const TOPIC_ACCENTS = {
  technology: "#1A4FD8", // deep electric blue
  infrastructure: "#6E7A88", // steel / graphite
  environment: "#0A7C72", // deep emerald → cyan
  indexes: "#D8DEE6", // white / silver / analytical grey
} as const;

export const CORE_TOPICS = [
  {
    id: "technology",
    title: "Technology",
    description:
      "Digital public infrastructure, AI governance, connectivity gaps, and how technology reshapes access to state services at district scale.",
    accent: TOPIC_ACCENTS.technology,
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description:
      "Roads, power, transit, and built environment—budget lines, delivery delays, and equity across rural and urban districts.",
    accent: TOPIC_ACCENTS.infrastructure,
  },
  {
    id: "environment",
    title: "Water • Trees • Air",
    description:
      "Groundwater, forest cover, air quality, and climate stressors tracked against policy commitments and on-the-ground outcomes.",
    accent: TOPIC_ACCENTS.environment,
    accentSecondary: "#0E8FA8", // cyan lift for environment lane
  },
  {
    id: "indexes",
    title: "Indexes",
    description:
      "Composite measures—household income, fiscal burden, public safety, and policy history—built for verification and extension.",
    accent: TOPIC_ACCENTS.indexes,
    links: [
      { label: "Household Income Index", href: TOOL_ROUTES.ghi },
      { label: "Tax Policy Estimator", href: TOOL_ROUTES.tax },
      { label: "Public Safety Data", href: TOOL_ROUTES.crime },
      { label: "Policy History Lab", href: TOOL_ROUTES.history },
    ],
  },
] as const;
