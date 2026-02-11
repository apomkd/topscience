import { cmsHealth, CMS_URL } from "../lib/cms";

export async function CmsHealthCard() {
  const health = await cmsHealth();
  return (
    <section className="card">
      <h3>CMS Connectivity</h3>
      <p className="small">Endpoint: {CMS_URL}</p>
      <p>Status: {health.ok ? "Connected" : "Unavailable"} {health.status ? `(${health.status})` : ""}</p>
    </section>
  );
}
