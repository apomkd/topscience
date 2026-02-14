import { TrendingTagsCard } from "../components/TrendingTagsCard";
import { QuickStatsCard } from "../components/QuickStatsCard";
import { CmsHealthCard } from "../components/CmsHealthCard";
import { HeroSection } from "../components/HeroSection";
import { SectionTitle } from "../components/SectionTitle";
import { LatestFromCmsCard } from "../components/LatestFromCmsCard";
import { LatestByTypeCard } from "../components/LatestByTypeCard";

export default function HomePage() {
  return (
    <>
      <HeroSection />

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


      <SectionTitle title="Widgets" subtitle="Quick editorial insights" />
      <section className="grid" style={{ marginBottom: 20 }}>
        <QuickStatsCard />
        <TrendingTagsCard />
      </section>

      <SectionTitle title="By Content Type" subtitle="Editorial distribution by format" />
      <section className="grid" style={{ marginBottom: 20 }}>
        <LatestByTypeCard contentType="news" title="Latest News" />
        <LatestByTypeCard contentType="analysis" title="Latest Analysis" />
        <LatestByTypeCard contentType="explainer" title="Latest Explainers" />
      </section>
    </>
  );
}
