import type { MetadataRoute } from "next";
import { getLatestArticles } from "../lib/content";
import { SITE_URL } from "../lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const latest = await getLatestArticles();

  const articleUrls = latest.map((a) => ({
    url: `${SITE_URL}/article/${a.slug}`,
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  return [
    { url: `${SITE_URL}/`, changeFrequency: "hourly", priority: 1 },
    ...articleUrls,
  ];
}
