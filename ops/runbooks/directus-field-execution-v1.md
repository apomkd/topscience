# Directus Field Execution v1 (Staging)

## Target
- URL: http://<server-ip>:8055/admin
- Collection set: `articles`, `categories`

## Step-by-step (UI)

### A) Create `categories` collection
- [ ] name (string, required)
- [ ] slug (string, required, unique)
- [ ] description (text, optional)

### B) Create `articles` collection
- [ ] title (string, required)
- [ ] slug (string, required, unique)
- [ ] excerpt (text)
- [ ] body (text/richtext)
- [ ] category (string OR relation to categories)
- [ ] tags (json array or relation)
- [ ] cover_image_url (string)
- [ ] published_at (datetime)
- [ ] status (string enum: draft|review|published)

## Permissions baseline
- [ ] public role: read only published content
- [ ] editor role: create/update drafts
- [ ] reviewer role: review + publish

## Verification
- [ ] create 1 category
- [ ] create 3 articles (published)
- [ ] confirm `/` shows latest content block
- [ ] confirm `/article/[slug]` route resolves
