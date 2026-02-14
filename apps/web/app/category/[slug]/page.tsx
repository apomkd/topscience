import Link from "next/link";
import { buildMetadata } from "../../../lib/seo";
import { getArticlesByCategoryPaged } from "../../../lib/content";

type Props = {
  params: { slug: string };
  searchParams?: { page?: string };
};

function pretty(slug: string) {
  return slug.split("-").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return buildMetadata({
    title: `${pretty(params.slug)} | topscience.news`,
    description: `Latest published articles in ${pretty(params.slug)}.`,
    path: `/category/${params.slug}`,
  });
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const page = Math.max(1, Number(searchParams?.page ?? "1") || 1);
  const pageSize = 10;

  const { items, total } = await getArticlesByCategoryPaged(params.slug, page, pageSize);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

return (
    <main style={{ padding: 24 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Category: {pretty(params.slug)}</h1>
        <p className="small">Published articles in this category. Page {page}/{totalPages}</p>

        {items.length === 0 ? (
          <p className="small">No published articles in this category yet.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {items.map((a) => (
              <li key={a.id} style={{ margin: "8px 0" }}>
                <Link href={`/article/${a.slug}`}>{a.title}</Link>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          {page > 1 ? <Link href={`/category/${params.slug}?page=${page - 1}`}>← Prev</Link> : <span className="small">← Prev</span>}
          {page < totalPages ? <Link href={`/category/${params.slug}?page=${page + 1}`}>Next →</Link> : <span className="small">Next →</span>}
        </div>
      </section>
    </main>
  );
}
