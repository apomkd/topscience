import { buildMetadata } from "../../../lib/seo";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { RelatedDemoLinks } from "../../../components/RelatedDemoLinks";

type Props = { params: { slug: string } };

function prettySlug(slug: string) {
  return slug
    .split("-")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props) {
  const title = `${prettySlug(params.slug)} | topscience.news`;
  return buildMetadata({
    title,
    description: `Science article page for ${params.slug}`,
    path: `/article/${params.slug}`
  });
}

export default function ArticlePage({ params }: Props) {
  return (
    <main style={{ padding: 24 }}>
      <Breadcrumbs slug={params.slug} />
      <article className="card">
        <h1 style={{ marginTop: 0 }}>{prettySlug(params.slug)}</h1>
        <p className="small">
          Dynamic article route scaffold (P0). Content body integration with CMS is next.
        </p>
      </article>
      <RelatedDemoLinks current={params.slug} />
    </main>
  );
}
