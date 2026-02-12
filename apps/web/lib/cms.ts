export const CMS_URL = process.env.CMS_URL || "http://127.0.0.1:8055";

export async function cmsHealth(): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch(`${CMS_URL}/server/health`, { cache: "no-store" });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  }
}
