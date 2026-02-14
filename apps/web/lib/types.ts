export type CmsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body?: string;
  category?: string;
  content_type?: string;
  author_name?: string;
  published_at?: string;
  cover_image_url?: string;
  tags: string[];
};
