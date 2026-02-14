import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="header">
      <div className="container header-inner" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <strong><Link href="/" style={{ textDecoration: "none", color: "inherit" }}>topscience.news</Link></strong>
        <nav className="small" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/">Home</Link>
          <Link href="/search">Search</Link>
          <Link href="/category/space">Space</Link>
          <Link href="/category/physics">Physics</Link>
          <Link href="/category/life-sciences">Life Sciences</Link>
        </nav>
      </div>
    </header>
  );
}
