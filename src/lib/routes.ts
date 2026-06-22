export const PUBLICATIONS_ROUTE = "/publications";
export const BLOG_ROUTE = "/blog";
export const ABOUT_ROUTE = "/about";
export const LOOKPUBLIC_ROUTE = "/lookpublic";
export const CONTACT_ROUTE = "/contact";
export const CONTRIBUTE_ROUTE = "/contribute";

export const TOOL_ROUTES = {
  ghi: "/tools/ghi",
  tax: "/tools/tax",
  crime: "/tools/crime",
  history: "/tools/history",
} as const;

export const TOOL_LINKS = [
  { label: "Household Income Index", href: TOOL_ROUTES.ghi },
  { label: "Indian Salary Tax Estimator", href: TOOL_ROUTES.tax },
  { label: "Public Safety Data", href: TOOL_ROUTES.crime },
  { label: "Policy History Lab", href: TOOL_ROUTES.history },
] as const;
