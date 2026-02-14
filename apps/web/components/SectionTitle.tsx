export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      {subtitle ? <p className="small" style={{ margin: "6px 0 0" }}>{subtitle}</p> : null}
    </div>
  );
}
