type Props = { params: { slug: string }; searchParams?: { token?: string } };

export default async function PreviewPage({ params, searchParams }: Props) {
  const token = searchParams?.token ?? "";
  const expected = process.env.NEXT_PREVIEW_TOKEN ?? "";

  if (!expected || token !== expected) {
    return (
      <main style={{ padding: 24 }}>
        <section className="card">
          <h1 style={{ marginTop: 0 }}>Preview Access Denied</h1>
          <p className="small">Invalid preview token.</p>
        </section>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <section className="card">
        <p className="small" style={{ marginTop: 0 }}>Draft Preview Mode</p>
        <h1 style={{ marginTop: 0 }}>{params.slug}</h1>
      </section>
    </main>
  );
}
