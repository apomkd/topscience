import { getLatestArticlesByType } from "../lib/content";
import { ArticleCompactList } from "./ArticleCompactList";

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
      <ArticleCompactList items={items} />
    </section>
  );
}
