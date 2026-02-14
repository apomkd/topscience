import { notFound } from "next/navigation";
import { buildMetadata } from "../../../lib/seo";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { RelatedCmsLinks } from "../../../components/RelatedCmsLinks";
import { getArticleBySlug, getRelatedArticles } from "../../../lib/content";

type Props = { params: { slug: string } };

function estimateReadingMinutes(text?: string) {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateMetadata({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return buildMetadata({
      title: "Article not found | topscience.news",
      description: "Requested article was not found.",
      path: `/article/${params.slug}`,
    });
  }

  return buildMetadata({
    title: `${article.title} | topscience.news`,
    description: article.excerpt ?? `Science article: ${article.slug}`,
    path: `/article/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.category, article.slug);

  return (
    <main className="article-shell" style={{ padding: 24 }}>
      <Breadcrumbs slug={article.slug} />
      <article className="card">
        <h1 className="article-title">{article.title}</h1>
        {article.excerpt ? <p className="small">{article.excerpt}</p> : null}

        <p className="article-meta">
          {article.author_name ?? "TopScience Editorial"} ·{" "}
          {article.published_at ? new Date(article.published_at).toLocaleDateString("en-GB") : "Date TBD"} ·{" "}
          {estimateReadingMinutes(article.body)} min read
        </p>

        <p className="article-meta">
          Type: {article.content_type ?? "news"} · Published in {article.category ?? "general"}
          {article.tags?.length ? ` · Tags: ${article.tags.join(", ")}` : ""}
        </p>

        {article.body ? (
          <div className="article-body">{article.body}</div>
        ) : (
          <p className="small" style={{ marginTop: 16 }}>
            No body content yet.
          </p>
        )}
      </article>

      <RelatedCmsLinks items={related} />
    </main>
  );
}
