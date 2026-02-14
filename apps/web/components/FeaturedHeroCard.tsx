import Link from "next/link";
import { getFeaturedArticle } from "../lib/content";

export async function FeaturedHeroCard() {
  const a = await getFeaturedArticle();

  if (!a) {
    return (
      <section className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ marginTop: 0 }}>Featured</h2>
        <p className="small">No featured article available yet.</p>
      </section>
    );
  }

  return (
    <section className="card" style={{ marginBottom: 16 }}>
      <p className="small" style={{ marginTop: 0, marginBottom: 8 }}>
        Featured · {a.content_type ?? "news"} · {a.category ?? "general"}
      </p>
      <h2 style={{ marginTop: 0 }}>
        <Link href={`/article/${a.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          {a.title}
        </Link>
      </h2>
      {a.excerpt ? <p className="small">{a.excerpt}</p> : null}
      <Link href={`/article/${a.slug}`}>Read article →</Link>
    </section>
  );
}
