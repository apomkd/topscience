import Link from "next/link";
import type { CmsArticle } from "../lib/types";

export function RelatedCmsLinks({ items }: { items: CmsArticle[] }) {
  if (items.length === 0) return null;

  return (
    <aside className="card" style={{ marginTop: 18 }}>
      <h3 style={{ marginTop: 0 }}>Related</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {items.map((r) => (
          <li key={r.slug} style={{ margin: "8px 0" }}>
            <Link href={`/article/${r.slug}`}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
