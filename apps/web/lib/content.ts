import { CMS_URL } from "./cms";
import type { CmsArticle } from "./types";

export async function getLatestArticles(): Promise<CmsArticle[]> {
  try {
    const res = await fetch(
      `${CMS_URL}/items/articles?limit=3&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];
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

    return {
      id: String(row.id ?? ""),
      slug: String(row.slug ?? ""),
      title: String(row.title ?? "Untitled"),
      excerpt: row.excerpt ? String(row.excerpt) : undefined,
      category: row.category ? String(row.category) : undefined,
      tags: Array.isArray(row.tags) ? row.tags.map((t: unknown) => String(t)) : [],
    };
  } catch {
    return null;
  }
}
