import { CMS_URL } from "./cms";
import type { CmsArticle } from "./types";

export async function getLatestArticles(): Promise<CmsArticle[]> {
  try {
    // Directus items endpoint example (placeholder contract)
    const res = await fetch(`${CMS_URL}/items/articles?limit=3&sort=-date_created`, {
      cache: "no-store"
    });
    if (!res.ok) return [];

    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];
    return rows.map((r: any) => ({
      id: String(r.id ?? ""),
      slug: String(r.slug ?? ""),
      title: String(r.title ?? "Untitled"),
      excerpt: r.excerpt ? String(r.excerpt) : undefined,
      category: r.category ? String(r.category) : undefined,
      tags: Array.isArray(r.tags) ? r.tags.map((t) => String(t)) : []
    })).filter((a: CmsArticle) => a.slug && a.title);
  } catch {
    return [];
  }
}
