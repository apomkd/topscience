import { getQuickStats } from "../lib/content";

export async function QuickStatsCard() {
  const stats = await getQuickStats();

  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Quick Stats</h3>
      <p className="small" style={{ marginBottom: 6 }}>Published articles: {stats.published}</p>
      <p className="small" style={{ marginBottom: 0 }}>Categories: {stats.categories}</p>
    </section>
  );
}
