import Link from "next/link";
import type { CmsArticle } from "../lib/types";

export function ArticlePreviewCard({ article }: { article: CmsArticle }) {
  return (
    <article className="card">
      <h3 style={{ marginTop: 0 }}>
        <Link href={`/article/${article.slug}`}>{article.title}</Link>
      </h3>
      {article.excerpt ? <p className="small">{article.excerpt}</p> : null}
      <div className="small" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {article.category ? <span>Category: {article.category}</span> : <span>Category: uncategorized</span>}
        {article.tags && article.tags.length > 0 ? (
          <span>Tags: {article.tags.join(", ")}</span>
        ) : (
          <span>Tags: none</span>
        )}
      </div>
    </article>
  );
}
