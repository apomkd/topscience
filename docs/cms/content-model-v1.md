# CMS Content Model v1 (P0)

## Collection: articles
Required fields:
- title (string)
- slug (string, unique)
- excerpt (text)
- body (rich text/markdown)
- category (string)
- tags (string[], optional)
- cover_image_url (string, optional)
- published_at (datetime)
- status (draft|review|published)

## Collection: categories
Required fields:
- name (string)
- slug (string, unique)
- description (text, optional)

## Workflow
draft -> review -> published
