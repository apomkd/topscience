import type { MetadataRoute } from "next";
import { getLatestArticles } from "../lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://topscience.news";
  const latest = await getLatestArticles();

  const articleUrls = latest.map((a) => ({
    url: `${base}/article/${a.slug}`,
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  return [
    { url: `${base}/`, changeFrequency: "hourly", priority: 1 },
    ...articleUrls,
  ];
}
