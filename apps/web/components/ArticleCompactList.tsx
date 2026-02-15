import Link from "next/link";
import type { CmsArticle } from "../lib/types";

export function ArticleCompactList({ items }: { items: CmsArticle[] }) {
  if (!items.length) return <p className="small">No articles yet.</p>;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {items.map((a) => (
        <article key={a.id} className="card" style={{ padding: 12 }}>
          <p className="small" style={{ marginTop: 0, marginBottom: 6 }}>
            {(a.content_type ?? "news").toUpperCase()} · {(a.category ?? "general").toUpperCase()}
          </p>
          <h3 style={{ marginTop: 0, marginBottom: 6 }}>
            <Link href={`/article/${a.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
              {a.title}
            </Link>
          </h3>
          {a.excerpt ? (
            <p className="small" style={{ marginBottom: 0 }}>
              {a.excerpt.length > 140 ? `${a.excerpt.slice(0, 137)}...` : a.excerpt}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
