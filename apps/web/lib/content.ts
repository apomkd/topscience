import { CMS_URL } from "./cms";
import type { CmsArticle } from "./types";

function normalize(rows: any[]): CmsArticle[] {
  return rows
    .map((r: any) => ({
      id: String(r.id ?? ""),
      slug: String(r.slug ?? ""),
      title: String(r.title ?? "Untitled"),
      excerpt: r.excerpt ? String(r.excerpt) : undefined,
      body: r.body ? String(r.body) : undefined,
      category: r.category ? String(r.category) : undefined,
      content_type: r.content_type ? String(r.content_type) : "news",
      tags: Array.isArray(r.tags) ? r.tags.map((t: unknown) => String(t)) : [],
    }))
    .filter((a: CmsArticle) => a.slug && a.title);
}

export async function getLatestArticles(): Promise<CmsArticle[]> {
  try {
    const res = await fetch(
      `${CMS_URL}/items/articles?limit=20&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];
    return normalize(rows);
  } catch {
    return [];
  }
}

export async function getLatestArticlesByType(contentType: string, limit = 4): Promise<CmsArticle[]> {
  try {
    const res = await fetch(
      `${CMS_URL}/items/articles?limit=${limit}&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published&filter%5Bcontent_type%5D%5B_eq%5D=${encodeURIComponent(contentType)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];
    return normalize(rows);
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<CmsArticle | null> {
  try {
    const res = await fetch(
      `${CMS_URL}/items/articles?limit=1&filter%5Bslug%5D%5B_eq%5D=${encodeURIComponent(slug)}&filter%5Bstatus%5D%5B_eq%5D=published`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const row = Array.isArray(json?.data) ? json.data[0] : null;
    if (!row) return null;
    return normalize([row])[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedArticles(category: string | undefined, currentSlug: string): Promise<CmsArticle[]> {
  try {
    if (category) {
      const res = await fetch(
        `${CMS_URL}/items/articles?limit=6&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published&filter%5Bcategory%5D%5B_eq%5D=${encodeURIComponent(category)}`,
        { next: { revalidate: 60 } }
      );
      if (res.ok) {
        const json = await res.json();
        const rows = Array.isArray(json?.data) ? json.data : [];
        const items = normalize(rows).filter((a) => a.slug !== currentSlug).slice(0, 3);
        if (items.length > 0) return items;
      }
    }

    const fallback = await getLatestArticles();
    return fallback.filter((a) => a.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export async function getArticlesByCategory(slug: string): Promise<CmsArticle[]> {
  try {
    const res = await fetch(
      `${CMS_URL}/items/articles?limit=20&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published&filter%5Bcategory%5D%5B_eq%5D=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];
    return normalize(rows);
  } catch {
    return [];
  }
}

export async function getFeaturedArticle(): Promise<CmsArticle | null> {
  try {
    const res = await fetch(
      `${CMS_URL}/items/articles?limit=1&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const json = await res.json();

const row = Array.isArray(json?.data) ? json.data[0] : null;
    if (!row) return null;
    return normalize([row])[0] ?? null;
  } catch {
    return null;
  }
}
