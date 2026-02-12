import { getLatestArticles } from "../lib/content";
import { ArticlePreviewCard } from "./ArticlePreviewCard";

export async function LatestFromCmsCard() {
  const items = await getLatestArticles();

  return (
    <section className="card">
      <h3>Latest from CMS</h3>
      {items.length === 0 ? (
        <p className="small">No CMS articles yet (fallback mode).</p>
      ) : (
        <div className="grid">
          {items.map((a) => (
            <ArticlePreviewCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </section>
  );
}
