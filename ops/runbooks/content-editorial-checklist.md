# Content Editorial Checklist (P0)

## Before publishing
- Title is present and meaningful
- Slug is present and URL-safe
- Category is selected
- Body is present (not empty)
- Status set to published only when content is complete

## Quick readiness command
/opt/topscience/ops/scripts/content-readiness.sh

## Expected healthy output
- published >= 1
- missing_title = 0
- missing_slug = 0
- missing_body = 0
- missing_category = 0
