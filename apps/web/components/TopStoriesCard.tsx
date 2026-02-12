import Link from "next/link";

const topStories = [
  { slug: "quantum-materials-breakthrough", title: "Quantum Materials Breakthrough", tag: "Physics" },
  { slug: "mars-ice-core-analysis", title: "Mars Ice Core Analysis", tag: "Space" },
  { slug: "ai-assisted-drug-discovery", title: "AI-assisted Drug Discovery", tag: "Biotech" }
];

export function TopStoriesCard() {
  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Top Stories</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {topStories.map((s) => (
          <li key={s.slug} style={{ margin: "10px 0" }}>
            <Link href={`/article/${s.slug}`}>{s.title}</Link>
            <span className="small" style={{ marginLeft: 8 }}>· {s.tag}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
