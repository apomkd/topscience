import Link from "next/link";
import { getLatestArticles } from "../../lib/content";

type Props = {
  searchParams?: {
    q?: string;
    category?: string;
    type?: string;
  };
};

export default async function SearchPage({ searchParams }: Props) {
  const q = (searchParams?.q ?? "").toLowerCase().trim();
  const category = (searchParams?.category ?? "").toLowerCase().trim();
  const type = (searchParams?.type ?? "").toLowerCase().trim();

  const all = await getLatestArticles();

  const filtered = all.filter((a) => {
    const matchesQ =
      !q ||
      a.title.toLowerCase().includes(q) ||
      (a.excerpt ?? "").toLowerCase().includes(q);

    const matchesCategory = !category || (a.category ?? "").toLowerCase() === category;

    const rawType = (a as any).content_type ?? "news";
    const matchesType = !type || String(rawType).toLowerCase() === type;

    return matchesQ && matchesCategory && matchesType;
  });

  return (
    <main style={{ padding: 24 }}>
      <section className="card" style={{ marginBottom: 16 }}>
        <h1 style={{ marginTop: 0 }}>Search</h1>
        <form method="get" action="/search" style={{ display: "grid", gap: 8 }}>
          <input name="q" placeholder="keyword" defaultValue={searchParams?.q ?? ""} />
          <input
            name="category"
            placeholder="category slug (e.g. physics)"
            defaultValue={searchParams?.category ?? ""}
          />
          <input
            name="type"
            placeholder="type (news|analysis|explainer|popular-science)"
            defaultValue={searchParams?.type ?? ""}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Results ({filtered.length})</h3>
        {filtered.length === 0 ? (
          <p className="small">No results.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {filtered.map((a) => {
              const ctype = String((a as any).content_type ?? "news");
              return (
                <li key={a.id} style={{ margin: "8px 0" }}>
                  <Link href={`/article/${a.slug}`}>{a.title}</Link>
                  <span className="small"> · {ctype} · {a.category ?? "general"}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
