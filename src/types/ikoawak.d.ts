export interface IHomePage {
  title: string;
  subtitle: string;
  description: any[];
  image: {};
}

export interface IAboutPage {
  title: string;
  subtitle: string;
  image: {};
  description: any[];
}

export interface ICategory {
  title: string;
  description: string;
  _id: string;
  _ref: string;
  _type: string;
  _updatedAt: string;
  _createdAt: string;
}

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
