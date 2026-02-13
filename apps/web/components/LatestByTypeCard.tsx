import Link from "next/link";
import { getLatestArticlesByType } from "../lib/content";

export async function LatestByTypeCard({
  contentType,
  title,
}: {
  contentType: string;
  title: string;
}) {
  const items = await getLatestArticlesByType(contentType, 4);

  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {items.length === 0 ? (
        <p className="small">No published {contentType} articles yet.</p>
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
