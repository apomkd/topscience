import Link from "next/link";

const demoArticles = [
  { slug: "quantum-materials-breakthrough", title: "Quantum Materials Breakthrough" },
  { slug: "mars-ice-core-analysis", title: "Mars Ice Core Analysis" },
  { slug: "ai-assisted-drug-discovery", title: "AI-assisted Drug Discovery" }
];

export function ArticleListCard() {
  return (
    <section className="card">
      <h3>Latest Articles (Demo)</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {demoArticles.map((a) => (
          <li key={a.slug} style={{ margin: "8px 0" }}>
            <Link href={`/article/${a.slug}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
