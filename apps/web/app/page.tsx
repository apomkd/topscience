import { CmsHealthCard } from "../components/CmsHealthCard";
import { ArticleListCard } from "../components/ArticleListCard";
import { LatestFromCmsCard } from "../components/LatestFromCmsCard";

export default function HomePage() {
  return (
    <>
      <section className="card" style={{ marginBottom: 16 }}>
        <h1 style={{ marginTop: 0 }}>topscience.news</h1>
        <p className="small">P0 web + CMS baseline in progress.</p>
      </section>

      <section className="grid" style={{ marginBottom: 16 }}>
        <article className="card">
          <h3 style={{ marginTop: 0 }}>Latest Science</h3>
          <p className="small">Content pipeline baseline active.</p>
        </article>
        <article className="card">
          <h3 style={{ marginTop: 0 }}>Editorial</h3>
          <p className="small">Policy and quality gates baseline active.</p>
        </article>
        <CmsHealthCard />
      </section>

      <section style={{ marginBottom: 16 }}>
        <LatestFromCmsCard />
      </section>

      <section>
        <ArticleListCard />
      </section>
    </>
  );
}
