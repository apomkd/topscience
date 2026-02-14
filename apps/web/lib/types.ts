export type CmsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body?: string;
  category?: string;
  content_type?: string;
  tags: string[];
};
