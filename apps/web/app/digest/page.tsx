import Link from "next/link";
import { getDailyDigestArticles } from "../../lib/content";

export default async function DigestPage() {
  const items = await getDailyDigestArticles(10);

  return (
    <main style={{ padding: 24 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Daily Digest</h1>
        <p className="small">Latest published science stories.</p>

        {items.length === 0 ? (
          <p className="small">No articles in digest yet.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {items.map((a) => (
              <li key={a.id} style={{ margin: "8px 0" }}>
                <Link href={`/article/${a.slug}`}>{a.title}</Link>
                <span className="small"> · {a.content_type ?? "news"} · {a.category ?? "general"}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
