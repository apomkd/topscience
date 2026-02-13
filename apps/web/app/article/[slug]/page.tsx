import { notFound } from "next/navigation";
import { buildMetadata } from "../../../lib/seo";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { RelatedDemoLinks } from "../../../components/RelatedDemoLinks";
import { getArticleBySlug } from "../../../lib/content";

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

  return (
    <main style={{ padding: 24 }}>
      <Breadcrumbs slug={article.slug} />
      <article className="card">
        <h1 style={{ marginTop: 0 }}>{article.title}</h1>
        {article.excerpt ? <p className="small">{article.excerpt}</p> : null}
        <p className="small">
          Published in {article.category ?? "general"}{article.tags?.length ? ` · Tags: ${article.tags.join(", ")}` : ""}
        </p>
      </article>
      <RelatedDemoLinks current={article.slug} />
    </main>
  );
}
