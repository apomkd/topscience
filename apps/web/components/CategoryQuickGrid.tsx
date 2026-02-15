import Link from "next/link";

const categories = [
  { slug: "space", title: "Space" },
  { slug: "physics", title: "Physics" },
  { slug: "biotech-health", title: "Biotech & Health" },
  { slug: "ai-computing", title: "AI & Computing" },
  { slug: "climate-energy", title: "Climate & Energy" },
  { slug: "materials-engineering", title: "Materials & Engineering" },
  { slug: "earth-environment", title: "Earth & Environment" },
  { slug: "policy-industry", title: "Policy & Industry" },
  { slug: "life-sciences", title: "Life Sciences" },
];

export function CategoryQuickGrid() {
  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Explore Categories</h3>
      <div className="grid">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <strong>{c.title}</strong>
            <p className="small" style={{ marginBottom: 0 }}>/category/{c.slug}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
