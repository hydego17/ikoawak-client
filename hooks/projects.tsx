import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetProjects = ({ offset, initialData }) => {
  const { data, error, mutate } = useSWR(
    `/api/projects?page=${offset || 0}`,
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
