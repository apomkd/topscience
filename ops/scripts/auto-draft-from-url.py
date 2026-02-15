#!/usr/bin/env python3
import json, os, re, sys, time, subprocess, urllib.request, urllib.parse
import html

ENV_FILE = "/opt/topscience/.env.ai-draft"
TMP_DIR = "/opt/topscience/backups/tmp"
CMS_SCRIPT = "/opt/topscience/ops/scripts/cms-create-draft.sh"
BFL_SCRIPT = "/opt/topscience/ops/scripts/bfl_generate_image.py"

def load_env(path):
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8") as f:
        for ln in f:
            ln = ln.strip()
            if ln and not ln.startswith("#") and "=" in ln:
                k, v = ln.split("=", 1)
                os.environ[k.strip()] = v.strip()

def web_fetch_markdown(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        html = r.read().decode("utf-8", "ignore")

    title = "New Science Development"
    m = re.search(r"<title[^>]*>(.*?)</title>", html, flags=re.I|re.S)
    if m:
        title = re.sub(r"\s+", " ", m.group(1)).strip()

    text = re.sub(r"<script.*?</script>", " ", html, flags=re.I|re.S)
    text = re.sub(r"<style.*?</style>", " ", text, flags=re.I|re.S)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    return title, text[:14000]

def clean_title(t):
    t = re.sub(r"\s*[:|\-]\s*ScienceAlert.*$", "", t, flags=re.I).strip()
    t = re.sub(r"\s+", " ", t).strip()
    return t[:110] if t else "New Science Development"

def summarize(text, n):
    sents = re.split(r'(?<=[.!?])\s+', text)
    good = [s.strip() for s in sents if 60 <= len(s.strip()) <= 280]
    return " ".join(good[:n]) if good else text[:900]

def infer_category(t):
    t = t.lower()
    if any(k in t for k in ["alcohol","cancer","dementia","disease","medical","clinical","health","brain"]):
        return "biotech-health"
    if any(k in t for k in ["space", "astronaut", "nasa", "orbit", "microgravity"]):
        return "space"
    if any(k in t for k in ["ai ", "artificial intelligence", "machine learning"]):
        return "ai-computing"
    if any(k in t for k in ["climate", "energy", "battery", "solar", "wind"]):
        return "climate-energy"
    if any(k in t for k in ["medical", "health", "clinical", "brain", "disease"]):
        return "biotech-health"
    if any(k in t for k in ["physics", "quantum", "particle"]):
        return "physics"
    return "life-sciences"

def slugify(s):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    s = re.sub(r"-+", "-", s)
    return s[:110].strip("-")

def main():
    if len(sys.argv) < 2:
        print("Usage: auto-draft-from-url.py <source_url>")
        sys.exit(1)

    source_url = sys.argv[1].strip()
    load_env(ENV_FILE)
    os.makedirs(TMP_DIR, exist_ok=True)

    title_raw, raw = web_fetch_markdown(source_url)
    raw = re.sub(r"\bSpace Health Environment Humans Tech Nature Physics Society Opinion Explainer About Us Our Team Follow Us Big breakthroughs\b", " ", raw, flags=re.I)

    raw = re.sub(r"\s+", " ", raw).strip()
    title = html.unescape(clean_title(title_raw))
    title = re.sub(r"\s*:\s*ScienceAlert\s*\.?$", "", title, flags=re.I).strip()
    excerpt = html.unescape(summarize(raw, 1)[:220])
    excerpt = re.sub(r"\s*:\s*ScienceAlert\s*\.?$", "", excerpt, flags=re.I).strip()
    body = html.unescape(summarize(raw, 7))
    body = re.sub(r"\s*:\s*ScienceAlert\s*\.?\s*", " ", body, flags=re.I).strip()
    category = infer_category(raw)
    slug = slugify(title) + "-" + str(int(time.time()))

    img_out = subprocess.check_output(
        [BFL_SCRIPT, "Editorial science cover image: " + title + ". Realistic, no text."],
        text=True
    )
    image_url = json.loads(img_out).get("image_url", "")

    payload = {
        "title": title,
        "slug": slug,
        "excerpt": excerpt,
        "body": body,
        "category": category,
        "content_type": "news",
        "tags": [category, "news", "research", "science"],
        "author_name": "TopScience Editorial",
        "cover_image_url": image_url,
        "status": "draft",
        "source_url": source_url
    }

    out_json = TMP_DIR + "/ai-draft-auto.json"
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False)

    subprocess.run([CMS_SCRIPT, out_json], check=False)

    rid = "unknown"
    if os.path.exists("/tmp/cms_create_resp.json"):
        resp = open("/tmp/cms_create_resp.json", encoding="utf-8").read()
        m = re.search(r'"id":\s*([0-9]+)', resp)
        if m:
            rid = m.group(1)

    preview_base = os.getenv("PREVIEW_BASE_URL", "http://31.187.76.46:3000")
    preview_token = os.getenv("PREVIEW_TOKEN", "")
    print("DRAFT_CREATED id=" + rid + " slug=" + slug)
    print("admin: http://31.187.76.46:8055/admin/content/articles/" + rid)
    print("preview: " + preview_base + "/preview/" + slug + "?token=" + preview_token)

if __name__ == "__main__":
    main()


