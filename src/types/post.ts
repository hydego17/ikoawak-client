export interface IPost {
  title: string;
  subtitle: string;
  slug: string;
  author: string;
  mainImage: {};
  categories: string[];
  publishedAt: string;
  body: any[];
}

export interface IApiPosts {
  message?: string;
  data: IPost[];
  dataCount?: number;
  firstData?: string;
  lastData?: string;
  maxPage?: number;
}

export type IPopularPost = {
  slug: string;
  view_count: number;
  post: IPost;
};
