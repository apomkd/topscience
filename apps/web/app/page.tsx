import { CmsHealthCard } from "../components/CmsHealthCard";
import { ArticleListCard } from "../components/ArticleListCard";
import { HeroSection } from "../components/HeroSection";
import { SectionTitle } from "../components/SectionTitle";
import { TopStoriesCard } from "../components/TopStoriesCard";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <SectionTitle title="Platform Overview" subtitle="Current P0 operational modules" />
      <section className="grid" style={{ marginBottom: 20 }}>
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

      <SectionTitle title="Top Stories" subtitle="Demo ordering for P0 presentation mode" />
      <section className="grid" style={{ marginBottom: 20 }}>
        <TopStoriesCard />
        <ArticleListCard />
      </section>
    </>
  );
}
