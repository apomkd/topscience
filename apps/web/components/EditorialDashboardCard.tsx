import { getEditorialStats } from "../lib/content";

export async function EditorialDashboardCard() {
  const stats = await getEditorialStats();

  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Editorial Dashboard</h3>
      <p className="small" style={{ marginBottom: 6 }}>Drafts: {stats.drafts}</p>
      <p className="small" style={{ marginBottom: 6 }}>Published: {stats.published}</p>
      <p className="small" style={{ marginBottom: 0 }}>Categories: {stats.categories}</p>
    </section>
  );
}
