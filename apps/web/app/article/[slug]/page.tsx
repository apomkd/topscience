import { buildMetadata } from "../../../lib/seo";

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
      <h1>{prettySlug(params.slug)}</h1>
      <p className="small">Dynamic article route scaffold (P0).</p>
    </main>
  );
}
