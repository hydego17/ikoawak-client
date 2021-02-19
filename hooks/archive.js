import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetArchive = ({ initialData }) => {
  const { data, error } = useSWR(`/api/archive`, fetcher, {
    initialData,
  });

  return {
    data,
    error,
    loading: !data && !error,
  };
};
