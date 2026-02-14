import Link from "next/link";
import { getDailyDigestArticles } from "../../lib/content";

export default async function DigestPage() {
  const items = await getDailyDigestArticles(12);

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const key = item.content_type ?? "news";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const order = ["news", "analysis", "explainer", "popular-science"];

  return (
    <main style={{ padding: 24 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Daily Digest</h1>
        <p className="small">Latest published science stories, grouped by content type.</p>
      </section>

      {items.length === 0 ? (
        <section className="card" style={{ marginTop: 16 }}>
          <p className="small">No articles in digest yet.</p>
        </section>
      ) : (
        order
          .filter((k) => grouped[k]?.length)
          .map((k) => (
            <section key={k} className="card" style={{ marginTop: 16 }}>
              <h3 style={{ marginTop: 0, textTransform: "capitalize" }}>{k}</h3>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {grouped[k].map((a) => (
                  <li key={a.id} style={{ margin: "8px 0" }}>
                    <Link href={`/article/${a.slug}`}>{a.title}</Link>
                    <span className="small"> · {a.category ?? "general"}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))
      )}
    </main>
  );
}
