import Link from "next/link";

export function Breadcrumbs({ slug }: { slug: string }) {
  return (
    <nav className="small" style={{ marginBottom: 14 }}>
      <Link href="/">Home</Link> / <span>{slug}</span>
    </nav>
  );
}
