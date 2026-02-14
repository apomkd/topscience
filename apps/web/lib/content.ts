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

export async function getArticlesByCategory(slug: string): Promise<CmsArticle[]> {
  try {
    const url =
      `${CMS_URL}/items/articles?limit=20&sort=-id` +
      `&filter%5Bstatus%5D%5B_eq%5D=published` +
      `&filter%5Bcategory%5D%5B_eq%5D=${encodeURIComponent(slug)}`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];

    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];
    return rows
      .map((r: any) => ({
        id: String(r.id ?? ""),
        slug: String(r.slug ?? ""),
        title: String(r.title ?? "Untitled"),
        excerpt: r.excerpt ? String(r.excerpt) : undefined,
        body: r.body ? String(r.body) : undefined,
        category: r.category ? String(r.category) : undefined,
        tags: Array.isArray(r.tags) ? r.tags.map((t: unknown) => String(t)) : [],
      }))
      .filter((a: CmsArticle) => a.slug && a.title);
  } catch {
    return [];
  }
}

export async function getLatestArticlesByType(contentType: string, limit = 4): Promise<CmsArticle[]> {
  try {
    const url =
      `${CMS_URL}/items/articles?limit=${limit}&sort=-id` +
      `&filter%5Bstatus%5D%5B_eq%5D=published` +
      `&filter%5Bcontent_type%5D%5B_eq%5D=${encodeURIComponent(contentType)}`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];

    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];

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
  } catch {
    return [];
  }
}

export async function getRelatedArticles(
  category: string | undefined,
  currentSlug: string
): Promise<CmsArticle[]> {
  try {
    if (category) {
      const res = await fetch(
        `${CMS_URL}/items/articles?limit=6&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published&filter%5Bcategory%5D%5B_eq%5D=${encodeURIComponent(category)}`,
        { next: { revalidate: 60 } }
      );
      if (res.ok) {
        const json = await res.json();
        const rows = Array.isArray(json?.data) ? json.data : [];
        const items = rows
          .map((r: any) => ({
            id: String(r.id ?? ""),
            slug: String(r.slug ?? ""),
            title: String(r.title ?? "Untitled"),
            excerpt: r.excerpt ? String(r.excerpt) : undefined,
            body: r.body ? String(r.body) : undefined,
            category: r.category ? String(r.category) : undefined,
            content_type: r.content_type ? String(r.content_type) : "news",
            author_name: r.author_name ? String(r.author_name) : undefined,
            published_at: r.published_at ? String(r.published_at) : undefined,
            tags: Array.isArray(r.tags) ? r.tags.map((t: unknown) => String(t)) : [],
          }))
          .filter((a: CmsArticle) => a.slug && a.title && a.slug !== currentSlug)
          .slice(0, 3);

        if (items.length > 0) return items;
      }
    }

    const latest = await getLatestArticles();
    return latest.filter((a) => a.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}
