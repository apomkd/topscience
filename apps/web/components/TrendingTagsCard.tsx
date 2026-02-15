import Link from "next/link";
import { getTrendingTags } from "../lib/content";

export async function TrendingTagsCard() {
  const tags = await getTrendingTags(10);

  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Trending Tags</h3>
      {tags.length === 0 ? (
        <p className="small">No tags yet.</p>
      ) : (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="small" style={{ textDecoration: "none" }}>
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
