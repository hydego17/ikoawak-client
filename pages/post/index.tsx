import { FC, useState } from 'react';
// import Link from 'next/link';
import styled from '@emotion/styled';

import { useGetPaginatedPosts } from 'hooks/posts';
import { getAllPosts } from 'lib/post';
// import { formatDate } from 'lib/date';
import { TApiPost, TPosts } from 'types/post';

import { PostList } from 'components/Post';
import PaginateBtn from 'components/PaginateBtn';
import SeoContainer from 'components/SeoContainer';

type PostsProps = {
  initialData: TApiPost;
};

const Posts: FC<PostsProps> = ({ initialData }) => {
  // State for offset page query
  const [offset, setOffset] = useState(0);

  const [loadingMutate, setLoadingMutate] = useState(false);

  const { data: fetchedPosts, loading, error, mutate } = useGetPaginatedPosts({
    param: offset,
    initialData,
  });

  const posts = fetchedPosts?.data;

  // Conditional Rendering
  let content = null;

  if (loading) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <>
        <PostList posts={posts} loading={loadingMutate} />

        <PaginateBtn
          initialData={initialData}
          fetchedPosts={fetchedPosts}
          mutate={mutate}
          setOffset={setOffset}
          setLoadingMutate={setLoadingMutate}
        />
      </>
    );
  }

  return (
    <>
      <SeoContainer
        title={`Tulisan | Rahmat Panji`}
        description={`Tulisan dan coretan oleh Rahmat Paji`}
      />
      <ArchiveStyled>
        <h1>Tulisan</h1>
        <hr />

        {content}
      </ArchiveStyled>
    </>
  );
};

export async function getStaticProps() {
  const result: TPosts = await getAllPosts();

  // Pass data to the page via props
  return {
    props: {
      initialData: {
        message: 'Fetched Posts',
        data: result?.slice(0, 10),
        dataCount: result?.length,
        firstData: result ? result[0].slug : null,
        lastData: result ? result[result.length - 1].slug : null,
        maxPage: Math.ceil(result?.length / 10),
      },
    },
    revalidate: 1,
  };
}

const ArchiveStyled = styled.section`
  table {
    width: 100%;
    border-collapse: collapse;

    td {
      padding: 0.75rem 0;
      white-space: nowrap;

      &.post_title {
        padding-right: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        max-width: 0;
      }

      &.post_date {
        text-align: right;
      }
    }
  }

  h1 {
    font-size: clamp(1.75rem, 2.5vw, 2rem);
    padding-bottom: 1rem;
  }

  p {
    padding-top: 1rem;
  }
`;

export default Posts;
