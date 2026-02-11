import { buildMetadata } from "../../../lib/seo";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  return buildMetadata({
    title: `Article: ${params.slug} | topscience.news`,
    description: `Science article page for ${params.slug}`,
    path: `/article/${params.slug}`
  });
}

export default function ArticlePage({ params }: Props) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Article: {params.slug}</h1>
      <p>This is the P0 dynamic article route scaffold.</p>
    </main>
  );
}
