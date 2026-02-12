# Directus Setup v1 (P0)

## Goal
Create CMS collections/fields matching `docs/cms/content-model-v1.md` and `packages/schemas/article.schema.json`.

## Collection: articles
Field checklist:
- [ ] title (string, required)
- [ ] slug (string, required, unique)
- [ ] excerpt (text)
- [ ] body (text/richtext)
- [ ] category (string)
- [ ] tags (json array of strings OR m2m tags relation)
- [ ] cover_image_url (string)
- [ ] published_at (datetime)
- [ ] status (string enum: draft|review|published)

Recommended:
- [ ] created_at / updated_at (default Directus meta)
- [ ] index on slug
- [ ] index on status + published_at

## Collection: categories
Field checklist:
- [ ] name (string, required)
- [ ] slug (string, required, unique)
- [ ] description (text)

## Access and workflow
- [ ] Role rules aligned with editorial flow
- [ ] draft -> review -> published transition policy
- [ ] only published items exposed to public web queries

## API query contract (web)
Latest articles:
- filter status=published
- sort by published_at desc
- limit 3 (homepage block)

By slug:
- filter slug={slug}
- status=published for public route

## Validation pass
- [ ] create 3 demo articles
- [ ] verify `/` shows CMS cards
- [ ] verify `/article/[slug]` resolves correctly
