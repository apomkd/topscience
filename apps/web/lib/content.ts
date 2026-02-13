import { CMS_URL } from "./cms";
import type { CmsArticle } from "./types";

function mapRows(rows: any[]): CmsArticle[] {
  return rows
    .map((r: any) => ({
      id: String(r.id ?? ""),
      slug: String(r.slug ?? ""),
      title: String(r.title ?? "Untitled"),
      excerpt: r.excerpt ? String(r.excerpt) : undefined,
      category: r.category ? String(r.category) : undefined,
      tags: Array.isArray(r.tags) ? r.tags.map((t: unknown) => String(t)) : [],
    }))
    .filter((a: CmsArticle) => a.slug && a.title);
}

export async function getLatestArticles(): Promise<CmsArticle[]> {
  try {
    const res = await fetch(
      `${CMS_URL}/items/articles?limit=3&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];
    return mapRows(rows);
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<CmsArticle | null> {
  try {
    const url =
      `${CMS_URL}/items/articles?limit=1&filter%5Bslug%5D%5B_eq%5D=${encodeURIComponent(slug)}` +
      `&filter%5Bstatus%5D%5B_eq%5D=published`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    const row = Array.isArray(json?.data) ? json.data[0] : null;
    if (!row) return null;
    return mapRows([row])[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedArticles(
  category: string | undefined,
  currentSlug: string
): Promise<CmsArticle[]> {
  try {
    if (category) {
      const byCatUrl =
        `${CMS_URL}/items/articles?limit=4&sort=-id` +
        `&filter%5Bstatus%5D%5B_eq%5D=published` +
        `&filter%5Bcategory%5D%5B_eq%5D=${encodeURIComponent(category)}`;
      const byCatRes = await fetch(byCatUrl, { cache: "no-store" });
      if (byCatRes.ok) {
        const json = await byCatRes.json();
        const rows = Array.isArray(json?.data) ? json.data : [];
        const filtered = mapRows(rows).filter((a) => a.slug !== currentSlug).slice(0, 3);
        if (filtered.length > 0) return filtered;
      }
    }

    const fallbackUrl =
      `${CMS_URL}/items/articles?limit=4&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published`;
    const fallbackRes = await fetch(fallbackUrl, { cache: "no-store" });
    if (!fallbackRes.ok) return [];
    const fallbackJson = await fallbackRes.json();
    const fallbackRows = Array.isArray(fallbackJson?.data) ? fallbackJson.data : [];
    return mapRows(fallbackRows).filter((a) => a.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}
