import Link from "next/link";
import { getLatestArticles } from "../../lib/content";

type Props = {
  searchParams?: {
    q?: string;
    category?: string;
    type?: string;
    page?: string;
    sort?: string;
  };
};

function buildSearchHref(params: Record<string, string | number | undefined>) {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || String(v).trim() === "") continue;
    usp.set(k, String(v));
  }
  return `/search?${usp.toString()}`;
}

export default async function SearchPage({ searchParams }: Props) {
  const q = (searchParams?.q ?? "").toLowerCase().trim();
  const category = (searchParams?.category ?? "").toLowerCase().trim();
  const type = (searchParams?.type ?? "").toLowerCase().trim();
  const sort = (searchParams?.sort ?? "latest").toLowerCase() === "oldest" ? "oldest" : "latest";
  const page = Math.max(1, Number(searchParams?.page ?? "1") || 1);
  const pageSize = 10;

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

  const sorted = [...filtered].sort((a, b) => {
    const ai = Number(a.id);
    const bi = Number(b.id);
    return sort === "oldest" ? ai - bi : bi - ai;
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

return (
    <main style={{ padding: 24 }}>
      <section className="card" style={{ marginBottom: 16 }}>
        <h1 style={{ marginTop: 0 }}>Search</h1>
        <form method="get" action="/search" style={{ display: "grid", gap: 8 }}>
          <input name="q" placeholder="keyword" defaultValue={searchParams?.q ?? ""} />
          <input name="category" placeholder="category slug (e.g. physics)" defaultValue={searchParams?.category ?? ""} />
          <input name="type" placeholder="type (news|analysis|explainer|popular-science)" defaultValue={searchParams?.type ?? ""} />
          <select name="sort" defaultValue={sort}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Results ({total}) · Page {page}/{totalPages}</h3>
        {paged.length === 0 ? (
          <p className="small">No results.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {paged.map((a) => {
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

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          {page > 1 ? (
            <Link href={buildSearchHref({ q, category, type, sort, page: page - 1 })}>← Prev</Link>
          ) : (
            <span className="small">← Prev</span>
          )}
          {page < totalPages ? (
            <Link href={buildSearchHref({ q, category, type, sort, page: page + 1 })}>Next →</Link>
          ) : (
            <span className="small">Next →</span>
          )}
        </div>
      </section>
    </main>
  );
}
