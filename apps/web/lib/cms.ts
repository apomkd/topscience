export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://127.0.0.1:8055";

export async function cmsHealth(): Promise<{ ok: boolean; status: number | null }> {
  try {
    const res = await fetch(`${CMS_URL}/server/health`, { cache: "no-store" });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: null };
  }
}
