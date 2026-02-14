export function HeroSection() {
  return (
    <section className="card" style={{ marginBottom: 18, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.18, background: "radial-gradient(circle at 20% 0%, #60a5fa 0%, transparent 45%), radial-gradient(circle at 80% 100%, #22d3ee 0%, transparent 40%)" }} />
      <div style={{ position: "relative" }}>
        <p className="small" style={{ marginTop: 0, letterSpacing: 1, textTransform: "uppercase" }}>TopScience Network</p>
        <h1 style={{ marginTop: 0, marginBottom: 10 }}>Science Newsroom, Built for Scale</h1>
        <p className="small" style={{ maxWidth: 820, marginBottom: 0 }}>
          Real-time science coverage with CMS-driven editorial workflow, category intelligence, and publish-grade operations.
        </p>
      </div>
    </section>
  );
}
