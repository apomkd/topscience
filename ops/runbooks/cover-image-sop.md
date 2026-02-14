# Cover Image SOP (TopScience)

## 1) Recommended specs
- Format: JPG or WEBP
- Aspect ratio: 16:9
- Resolution target: 1600x900
- Max file size: < 350 KB (ideal 150-300 KB)
- Prefer clean images without text overlays

## 2) Naming convention
Use slug-based filenames:
- quantum-materials-breakthrough-cover.jpg
- mars-ice-core-analysis-cover.webp

## 3) Editorial quality checks
Before publish:
- Image is relevant to article topic
- Usage rights/license are valid
- No offensive/low-quality visuals
- Subject remains clear in thumbnail crop

## 4) CMS entry rule
In Directus article:
- Set `cover_image_url` to an absolute URL
- Verify URL opens directly in browser
- Avoid expiring/temporary URLs

## 5) Fallback behavior
If `cover_image_url` is empty:
- Article can still publish
- Frontend remains text-first (no broken image placeholder)

## 6) Quick post-publish verification
- Open article page and confirm image render
- Run: `/opt/topscience/ops/scripts/web-cms-smoke.sh`
