import { getSiteUrl } from "@/lib/site";
import {
  CONTACT_ROUTE,
  CONTRIBUTE_ROUTE,
  LOOKPUBLIC_ROUTE,
  PUBLICATIONS_ROUTE,
  TOOL_ROUTES,
} from "@/lib/routes";
import type { MetadataRoute } from "next";

const INDEXABLE_PATHS = [
  "/",
  PUBLICATIONS_ROUTE,
  LOOKPUBLIC_ROUTE,
  CONTRIBUTE_ROUTE,
  CONTACT_ROUTE,
  TOOL_ROUTES.ghi,
  TOOL_ROUTES.tax,
  TOOL_ROUTES.crime,
  TOOL_ROUTES.history,
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const lastModified = new Date();

  return INDEXABLE_PATHS.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
