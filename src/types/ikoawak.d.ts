interface IHomePage {
  title: string;
  subtitle: string;
  description: any[];
  image: {};
}

interface IAboutPage {
  title: string;
  subtitle: string;
  image: {};
  description: any[];
}

interface ICategory {
  title: string;
  description: string;
  _id: string;
  _ref: string;
  _type: string;
  _updatedAt: string;
  _createdAt: string;
}

interface IPost {
  title: string;
  subtitle: string;
  slug: string;
  author: string;
  mainImage: {};
  categories: string[];
  publishedAt: string;
  body: any[];
}

interface IApiPosts {
  message?: string;
  data: IPost[];
  dataCount?: number;
  firstData?: string;
  lastData?: string;
  maxPage?: number;
}

type IPopularPost = {
  slug: string;
  view_count: number;
  post: IPost;
};
