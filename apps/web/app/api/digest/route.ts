import { NextResponse } from "next/server";
import { getDailyDigestArticles } from "../../../lib/content";

export async function GET() {
  const items = await getDailyDigestArticles(12);

  const normalized = items.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? "",
    category: a.category ?? "general",
    content_type: a.content_type ?? "news",
    url: `https://topscience.news/article/${a.slug}`,
  }));

  const grouped: Record<string, typeof normalized> = {};
  for (const it of normalized) {
    if (!grouped[it.content_type]) grouped[it.content_type] = [];
    grouped[it.content_type].push(it);
  }

  return NextResponse.json({
    generated_at: new Date().toISOString(),
    count: normalized.length,
    grouped,
    items: normalized,
  });
}
