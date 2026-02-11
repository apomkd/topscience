import { CmsHealthCard } from "../components/CmsHealthCard";

export default function HomePage() {
  return (
    <>
      <section className="card" style={{ marginBottom: 16 }}>
        <h1>topscience.news</h1>
        <p className="small">P0 web + CMS baseline in progress.</p>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Latest Science</h3>
          <p className="small">Content pipeline placeholder.</p>
        </article>
        <article className="card">
          <h3>Editorial</h3>
          <p className="small">Policy and quality gates placeholder.</p>
        </article>
        <CmsHealthCard />
      </section>
    </>
  );
}
