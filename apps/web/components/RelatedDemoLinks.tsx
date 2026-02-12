import Link from "next/link";

const related = [
  { slug: "quantum-materials-breakthrough", title: "Quantum Materials Breakthrough" },
  { slug: "mars-ice-core-analysis", title: "Mars Ice Core Analysis" },
  { slug: "ai-assisted-drug-discovery", title: "AI-assisted Drug Discovery" }
];

export function RelatedDemoLinks({ current }: { current: string }) {
  return (
    <aside className="card" style={{ marginTop: 18 }}>
      <h3 style={{ marginTop: 0 }}>Related</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {related.filter((r) => r.slug !== current).map((r) => (
          <li key={r.slug} style={{ margin: "8px 0" }}>
            <Link href={`/article/${r.slug}`}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
