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

export type TPosts = TPost[];

export type TApiPost = {
  message?: string;
  data: TPosts;
  dataCount?: number;
  firstData?: string;
  lastData?: string;
  maxPage?: number;
};
