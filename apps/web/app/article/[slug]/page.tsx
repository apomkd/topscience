import { notFound } from "next/navigation";
import { buildMetadata } from "../../../lib/seo";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { RelatedCmsLinks } from "../../../components/RelatedCmsLinks";
import { getArticleBySlug, getRelatedArticles } from "../../../lib/content";

type Props = { params: { slug: string } };

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt ?? "",
    articleSection: article.category ?? "science",
    mainEntityOfPage: `https://topscience.news/article/${article.slug}`,
  };

  return (
    <main style={{ padding: 24 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs slug={article.slug} />
      <article className="card">
        <h1 style={{ marginTop: 0 }}>{article.title}</h1>
        {article.excerpt ? <p className="small">{article.excerpt}</p> : null}
        <p className="small">Category: {article.category ?? "general"}</p>

        {article.body ? (
          <div style={{ marginTop: 16, lineHeight: 1.6 }}>{article.body}</div>
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
