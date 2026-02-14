import { CmsHealthCard } from "../components/CmsHealthCard";
import { HeroSection } from "../components/HeroSection";
import { SectionTitle } from "../components/SectionTitle";
import { LatestFromCmsCard } from "../components/LatestFromCmsCard";
import { LatestByTypeCard } from "../components/LatestByTypeCard";
import { CategoryQuickGrid } from "../components/CategoryQuickGrid";
import { FeaturedHeroCard } from "../components/FeaturedHeroCard";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedHeroCard />

      <SectionTitle title="Platform Overview" subtitle="Current P0 operational modules" />
      <section className="grid" style={{ marginBottom: 20 }}>
        <article className="card">
          <h3 style={{ marginTop: 0 }}>Latest Science</h3>
          <p className="small">Live CMS-backed publishing enabled.</p>
        </article>
        <article className="card">
          <h3 style={{ marginTop: 0 }}>Editorial</h3>
          <p className="small">Policy and quality gates baseline active.</p>
        </article>
        <CmsHealthCard />
      </section>

      <SectionTitle title="Latest from CMS" subtitle="Live content from Directus" />
      <section style={{ marginBottom: 20 }}>
        <LatestFromCmsCard />
      </section>

      <SectionTitle title="Categories" subtitle="Navigate by science domain" />
      <section style={{ marginBottom: 20 }}>
        <CategoryQuickGrid />
      </section>

      <SectionTitle title="By Content Type" subtitle="Editorial distribution by format" />
      <section className="grid" style={{ marginBottom: 20 }}>
        <LatestByTypeCard contentType="news" title="Latest News" />
        <LatestByTypeCard contentType="analysis" title="Latest Analysis" />
        <LatestByTypeCard contentType="explainer" title="Latest Explainers" />
        <LatestByTypeCard contentType="popular-science" title="Latest Popular Science" />
      </section>
    </>
  );
}
