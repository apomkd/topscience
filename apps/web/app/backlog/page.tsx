import Link from "next/link";
import { getDraftBacklog } from "../../lib/content";

export default async function BacklogPage() {
  const drafts = await getDraftBacklog(100);

  return (
    <main style={{ padding: 24 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Content Backlog</h1>
        <p className="small">Oldest drafts first. Use this page for editorial throughput.</p>

        {drafts.length === 0 ? (
          <p className="small">No drafts in backlog.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {drafts.map((a) => (
              <li key={a.id} style={{ margin: "8px 0" }}>
                <Link href={`/preview/${a.slug}?token=Skopskoiseemozno2!`}>{a.title}</Link>
                <span className="small"> · {a.content_type ?? "news"} · {a.category ?? "general"}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
