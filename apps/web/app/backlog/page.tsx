import Link from "next/link";
import { getDraftBacklogWithPriority } from "../../lib/content";

export default async function BacklogPage() {
  const drafts = await getDraftBacklogWithPriority(100);

  return (
    <main style={{ padding: 24 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Content Backlog</h1>
        <p className="small">Oldest drafts first. Prioritize items marked HIGH.</p>

        {drafts.length === 0 ? (
          <p className="small">No drafts in backlog.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {drafts.map((a) => (
              <li key={a.id} style={{ margin: "10px 0" }}>
                <Link href={`/preview/${a.slug}?token=Skopskoiseemozno2!`}>{a.title}</Link>
                <span className="small">
                  {" "}· {String((a as any).content_type ?? "news")} · {a.category ?? "general"} ·{" "}
                  {a.priority === "high" ? "HIGH" : "OK"}
                  {a.missing_body ? " · missing body" : ""}
                  {a.missing_excerpt ? " · missing excerpt" : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
