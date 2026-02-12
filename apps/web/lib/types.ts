export type CmsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
};
