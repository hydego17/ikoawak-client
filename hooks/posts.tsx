import useSWR from 'swr';

import { TApiPost, TPopularPosts } from 'types/post';

type THooksProps = {
  title?: string;
  param: string | number;
  initialData: TApiPost;
};

const fetcher = url => fetch(url).then(res => res.json());

export const useGetPaginatedPosts = ({
  title,
  param,
  initialData,
}: THooksProps) => {
  const { data, error, mutate } = useSWR<TApiPost>(
    `/api/paginated-posts?page=${param || 0}&title=${title}`,
    fetcher,
    {
      initialData,
    },
  );

  return {
    data,
    error,
    loading: !data && !error,
    mutate,
  };
};

export const useGetCategoryPosts = ({ param, initialData }: THooksProps) => {
  const { data, error, mutate } = useSWR<TApiPost>(
    param ? `/api/latest-posts?category=${param}` : null,
    fetcher,
    {
      initialData,
    },
  );

  return {
    data,
    error,
    loading: !data && !error,
    mutate,
  };
};

export const useGetPopularPosts = () => {
  const { data, error, mutate } = useSWR<TPopularPosts>(
    '/api/most-popular',
    fetcher,
  );

  return {
    data,
    error,
    loading: !data && !error,
    mutate,
  };
};
