/**
 * Canonical site URL for metadata, sitemap, and robots.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://researchindia.org).
 */
export function getSiteUrl(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;

  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return undefined;
    }
    return url;
  } catch {
    return undefined;
  }
}

export const SITE_NAME = "The Research Bharat";

export function siteTitle(page?: string): string {
  if (page) return `${page} | ${SITE_NAME}`;
  return `${SITE_NAME} | Data-Driven Policy Insights for India`;
}
