import "./globals.css";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const metadata = {
  title: "topscience.news",
  description: "P0 baseline"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="main">
          <div className="container">{children}</div>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
