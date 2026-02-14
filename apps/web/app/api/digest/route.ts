import { NextResponse } from "next/server";
import { getDailyDigestArticles } from "../../../lib/content";

export async function GET() {
  const items = await getDailyDigestArticles(10);

  return NextResponse.json({
    generated_at: new Date().toISOString(),
    count: items.length,
    items: items.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? "",
      category: a.category ?? "general",
      content_type: a.content_type ?? "news",
      url: `https://topscience.news/article/${a.slug}`,
    })),
  });
}
