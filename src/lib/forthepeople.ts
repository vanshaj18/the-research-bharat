/** ForThePeople.in — citizen transparency platform (external). */
export const FOR_THE_PEOPLE_BASE = "https://forthepeople.in";
export const FOR_THE_PEOPLE_HOME = `${FOR_THE_PEOPLE_BASE}/en`;

export const FOR_THE_PEOPLE_LINKS = [
  {
    label: "Explore India",
    href: `${FOR_THE_PEOPLE_BASE}/en/india-detail`,
    description: "National overview and district discovery",
  },
  {
    label: "Find your district",
    href: `${FOR_THE_PEOPLE_BASE}/en/vote-district`,
    description: "Locate your constituency and local data",
  },
  {
    label: "Features",
    href: `${FOR_THE_PEOPLE_BASE}/en/features`,
    description: "Budgets, schemes, crop prices, water levels, and more",
  },
  {
    label: "Support",
    href: `${FOR_THE_PEOPLE_BASE}/en/support`,
    description: "Help the platform and report issues",
  },
] as const;
