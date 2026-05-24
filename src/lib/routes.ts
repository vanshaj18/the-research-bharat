export const PUBLICATIONS_ROUTE = "/publications";
export const LOOKPUBLIC_ROUTE = "/lookpublic";
export const CONTACT_ROUTE = "/contact";

export const TOOL_ROUTES = {
  ghi: "/tools/ghi",
  tax: "/tools/tax",
  crime: "/tools/crime",
  history: "/tools/history",
} as const;

export const TOOL_LINKS = [
  { label: "Household Income Index", href: TOOL_ROUTES.ghi },
  { label: "Tax Policy Estimator", href: TOOL_ROUTES.tax },
  { label: "Public Safety Data", href: TOOL_ROUTES.crime },
  { label: "Policy History Lab", href: TOOL_ROUTES.history },
] as const;
