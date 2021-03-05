import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetPosts = ({ offset, initialData }) => {
  const { data, error, mutate } = useSWR(
    `/api/posts?page=${offset || 0}`,
    fetcher,
    {
      initialData,
    }
  );

  return {
    data,
    error,
    loading: !data && !error,
    mutate,
  };
};
