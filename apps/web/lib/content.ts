import { CMS_URL } from "./cms";
import type { CmsArticle } from "./types";

function mapRows(rows: any[]): CmsArticle[] {
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
      cover_image_url: r.cover_image_url ? String(r.cover_image_url) : undefined,
      tags: Array.isArray(r.tags) ? r.tags.map((t: unknown) => String(t)) : [],
    }))
    .filter((a: CmsArticle) => a.slug && a.title);
}

async function fetchArticles(params: string): Promise<{ rows: any[]; meta?: any }> {
  const res = await fetch(`${CMS_URL}/items/articles?${params}`, { next: { revalidate: 60 } });
  if (!res.ok) return { rows: [] };
  const json = await res.json();
  return { rows: Array.isArray(json?.data) ? json.data : [], meta: json?.meta };
}

export async function getLatestArticles(limit = 20): Promise<CmsArticle[]> {
  try {
    const { rows } = await fetchArticles(`limit=${limit}&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published`);
    return mapRows(rows);
  } catch {
    return [];
  }
}

export async function getLatestArticlesByType(contentType: string, limit = 4): Promise<CmsArticle[]> {
  try {
    const { rows } = await fetchArticles(
      `limit=${limit}&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published&filter%5Bcontent_type%5D%5B_eq%5D=${encodeURIComponent(contentType)}`
    );
    return mapRows(rows);
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<CmsArticle | null> {
  try {
    const { rows } = await fetchArticles(
      `limit=1&filter%5Bslug%5D%5B_eq%5D=${encodeURIComponent(slug)}&filter%5Bstatus%5D%5B_eq%5D=published`
    );
    return mapRows(rows)[0] ?? null;
  } catch {
    return null;
  }
}

export async function getArticleBySlugAnyStatus(slug: string): Promise<CmsArticle | null> {
  try {
    const { rows } = await fetchArticles(`limit=1&filter%5Bslug%5D%5B_eq%5D=${encodeURIComponent(slug)}`);
    return mapRows(rows)[0] ?? null;
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
      const byCat = mapRows(rows).filter((a) => a.slug !== currentSlug).slice(0, 3);
      if (byCat.length > 0) return byCat;
    }
    const latest = await getLatestArticles(6);
    return latest.filter((a) => a.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export async function getArticlesByCategory(slug: string): Promise<CmsArticle[]> {
  const { items } = await getArticlesByCategoryPaged(slug, 1, 20);
  return items;
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
      `limit=${pageSize}&offset=${offset}&sort=-id&filter%5Bstatus%5D%5B_eq%5D=published&filter%5Bcategory%5D%5B_eq%5D=${encodeURIComponent(slug)}&meta=filter_count`
    );

return { items: mapRows(rows), total: Number(meta?.filter_count ?? 0) };
  } catch {
    return { items: [], total: 0 };
  }
}

export async function getFeaturedArticle(): Promise<CmsArticle | null> {
  const latest = await getLatestArticles(1);
  return latest[0] ?? null;
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
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([t]) => t);
}

export async function getQuickStats(): Promise<{ published: number; categories: number }> {
  try {
    const [articlesRes, categoriesRes] = await Promise.all([
      fetch(`${CMS_URL}/items/articles?limit=1&meta=filter_count&filter%5Bstatus%5D%5B_eq%5D=published`, { next: { revalidate: 60 } }),
      fetch(`${CMS_URL}/items/categories?limit=1&meta=filter_count`, { next: { revalidate: 60 } }),
    ]);
    const published = articlesRes.ok ? Number((await articlesRes.json())?.meta?.filter_count ?? 0) : 0;
    const categories = categoriesRes.ok ? Number((await categoriesRes.json())?.meta?.filter_count ?? 0) : 0;
    return { published, categories };
  } catch {
    return { published: 0, categories: 0 };
  }
}

export async function getEditorialStats(): Promise<{ drafts: number; published: number; categories: number }> {
  try {
    const [draftsRes, publishedRes, categoriesRes] = await Promise.all([
      fetch(`${CMS_URL}/items/articles?limit=1&meta=filter_count&filter%5Bstatus%5D%5B_eq%5D=draft`, { next: { revalidate: 60 } }),
      fetch(`${CMS_URL}/items/articles?limit=1&meta=filter_count&filter%5Bstatus%5D%5B_eq%5D=published`, { next: { revalidate: 60 } }),
      fetch(`${CMS_URL}/items/categories?limit=1&meta=filter_count`, { next: { revalidate: 60 } }),
    ]);
    const drafts = draftsRes.ok ? Number((await draftsRes.json())?.meta?.filter_count ?? 0) : 0;
    const published = publishedRes.ok ? Number((await publishedRes.json())?.meta?.filter_count ?? 0) : 0;
    const categories = categoriesRes.ok ? Number((await categoriesRes.json())?.meta?.filter_count ?? 0) : 0;
    return { drafts, published, categories };
  } catch {
    return { drafts: 0, published: 0, categories: 0 };
  }
}

export async function getDraftBacklog(limit = 50): Promise<CmsArticle[]> {
  try {
    const { rows } = await fetchArticles(`limit=${limit}&sort=id&filter%5Bstatus%5D%5B_eq%5D=draft`);
    return mapRows(rows);
  } catch {
    return [];
  }
}

export async function getDailyDigestArticles(limit = 10): Promise<CmsArticle[]> {
  return getLatestArticles(limit);
}
