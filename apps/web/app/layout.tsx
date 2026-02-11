export const metadata = { title: "topscience.news", description: "P0 bootstrap" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
return <html lang="en"><body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>{children}</body></html>;
}
