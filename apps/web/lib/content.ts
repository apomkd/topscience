import { CMS_URL } from "./cms";
import type { CmsArticle } from "./types";

const REVALIDATE_SECONDS = 60;

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
      author_name: r.author_name ? String(r.author_name) : undefined,
      published_at: r.published_at ? String(r.published_at) : undefined,
      tags: Array.isArray(r.tags) ? r.tags.map((t: unknown) => String(t)) : [],
    }))
    .filter((a: CmsArticle) => a.slug && a.title);
}

async function fetchArticles(params: string): Promise<{ rows: any[]; meta?: any }> {
  const res = await fetch(`${CMS_URL}/items/articles?${params}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return { rows: [] };
  const json = await res.json();
  return {
    rows: Array.isArray(json?.data) ? json.data : [],
    meta: json?.meta,
  };
}

export async function getLatestArticles(limit = 20): Promise<CmsArticle[]> {
  try {
    const { rows } = await fetchArticles(
      `limit=${limit}&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published`
    );
    return normalize(rows);
  } catch {
    return [];
  }
}

export async function getLatestArticlesByType(contentType: string, limit = 4): Promise<CmsArticle[]> {
  try {
    const { rows } = await fetchArticles(
      `limit=${limit}&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published&filter%5Bcontent_type%5D%5B_eq%5D=${encodeURIComponent(contentType)}`
    );
    return normalize(rows);
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<CmsArticle | null> {
  try {
    const { rows } = await fetchArticles(
      `limit=1&filter%5Bslug%5D%5B_eq%5D=${encodeURIComponent(slug)}&filter%5Bstatus%5D%5B_eq%5D=published`
    );
    return normalize(rows)[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedArticles(category: string | undefined, currentSlug: string): Promise<CmsArticle[]> {
  try {
    if (category) {
      const { rows } = await fetchArticles(
        `limit=6&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published&filter%5Bcategory%5D%5B_eq%5D=${encodeURIComponent(category)}`
      );
      const items = normalize(rows).filter((a) => a.slug !== currentSlug).slice(0, 3);
      if (items.length > 0) return items;
    }

    const latest = await getLatestArticles(6);
    return latest.filter((a) => a.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export async function getArticlesByCategoryPaged(
  slug: string,
  page: number,
  pageSize = 10
): Promise<{ items: CmsArticle[]; total: number }> {
  const safePage = Math.max(1, page);
  const offset = (safePage - 1) * pageSize;

  try {
    const { rows, meta } = await fetchArticles(
      `limit=${pageSize}&offset=${offset}&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published&filter%5Bcategory%5D%5B_eq%5D=${encodeURIComponent(
        slug
      )}&meta=filter_count`
    );
    return { items: normalize(rows), total: Number(meta?.filter_count ?? 0) };
  } catch {
    return { items: [], total: 0 };
  }
}

export async function getFeaturedArticle(): Promise<CmsArticle | null> {
  try {
    const latest = await getLatestArticles(1);
    return latest[0] ?? null;

} catch {
    return null;
  }
}

export async function getTrendingTags(limit = 10): Promise<string[]> {
  const latest = await getLatestArticles(30);
  const freq = new Map<string, number>();

  for (const a of latest) {
    for (const t of a.tags ?? []) {
      const tag = String(t).trim().toLowerCase();
      if (!tag) continue;
      freq.set(tag, (freq.get(tag) ?? 0) + 1);
    }
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

export async function getQuickStats(): Promise<{ published: number; categories: number }> {
  try {
    const [articlesRes, categoriesRes] = await Promise.all([
      fetch(`${CMS_URL}/items/articles?limit=1&meta=filter_count&filter%5Bstatus%5D%5B_eq%5D=published`, {
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      fetch(`${CMS_URL}/items/categories?limit=1&meta=filter_count`, {
        next: { revalidate: REVALIDATE_SECONDS },
      }),
    ]);

    const published = articlesRes.ok ? Number((await articlesRes.json())?.meta?.filter_count ?? 0) : 0;
    const categories = categoriesRes.ok ? Number((await categoriesRes.json())?.meta?.filter_count ?? 0) : 0;

    return { published, categories };
  } catch {
    return { published: 0, categories: 0 };
  }
}

export async function getArticlesByCategory(slug: string): Promise<CmsArticle[]> {
  const { items } = await getArticlesByCategoryPaged(slug, 1, 20);
  return items;
}
