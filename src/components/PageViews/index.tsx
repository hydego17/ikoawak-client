import { useQuery } from 'react-query';

interface PageViewsProps {
  slug: string;
}

const PageViews = ({ slug }: PageViewsProps) => {

  const { data } = useQuery(
    ['Page View', slug],
    async () => {
      const res = await fetch(`/api/views/${slug}`);
      return await res.json();
    },
    {
      keepPreviousData: true,
    }
  );

  if (data?.total) {
    return <div className="page-views">{data.total} views</div>;
  }

  return null;
};

export default PageViews;
