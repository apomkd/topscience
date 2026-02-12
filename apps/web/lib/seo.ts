type MetaInput = {
  title: string;
  description: string;
  path?: string;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://topscience.news";

export function buildMetadata({ title, description, path = "/" }: MetaInput) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "topscience.news",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
