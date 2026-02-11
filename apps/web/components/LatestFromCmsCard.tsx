import Link from "next/link";
import { getLatestArticles } from "../lib/content";

export async function LatestFromCmsCard() {
  const items = await getLatestArticles();

  return (
    <section className="card">
      <h3>Latest from CMS</h3>
      {items.length === 0 ? (
        <p className="small">No CMS articles yet (fallback mode).</p>
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
  );
}
