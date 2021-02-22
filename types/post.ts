export type TPosts = TPost[];

export type TPost = {
  title: string;
  subtitle: string;
  slug: string;
  author: string;
  mainImage: string;
  categories: string[];
  publishedAt: string;
  body: any[];
};
