import Link from "next/link";
import { buildMetadata } from "../../../lib/seo";
import { getArticlesByCategory } from "../../../lib/content";

type Props = { params: { slug: string } };

function pretty(slug: string) {
  return slug.split("-").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
}

export async function generateMetadata({ params }: Props) {
  return buildMetadata({
    title: `${pretty(params.slug)} | topscience.news`,
    description: `Latest published articles in ${pretty(params.slug)}.`,
    path: `/category/${params.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const items = await getArticlesByCategory(params.slug);

  return (
    <main style={{ padding: 24 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Category: {pretty(params.slug)}</h1>
        <p className="small">Published articles in this category.</p>

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
      </section>
    </main>
  );
}
