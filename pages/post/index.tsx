import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { useGetPaginatedPosts } from 'hooks/posts';
import { getAllPosts } from 'lib/post';
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
  const [search, setSearch] = useState('');

  const [loadingMutate, setLoadingMutate] = useState(false);

  const { data: fetchedPosts, loading, mutate } = useGetPaginatedPosts({
    title: search,
    param: offset,
    initialData,
  });

  const searchPost = async e => {
    e.preventDefault();

    if (!search.length) {
      return;
    }

    setLoadingMutate(true);
    await mutate(fetchedPosts);
    setLoadingMutate(false);
  };

  const posts = fetchedPosts?.data;

  // Count only available is the data is coming from paginated result, not from the search result.
  const count = fetchedPosts?.dataCount;

  // Conditional Rendering
  let content = null;

  if (loading) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <>
        <PostList posts={posts} loading={loadingMutate} />

        {count && !loadingMutate && (
          <PaginateBtn
            initialData={initialData}
            fetchedPosts={fetchedPosts}
            mutate={mutate}
            setOffset={setOffset}
            setLoadingMutate={setLoadingMutate}
          />
        )}
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

        <div className="input-container">
          <form className="search-form" onSubmit={searchPost}>
            <input
              aria-label="Search posts"
              type="text"
              onChange={e => setSearch(e.target.value)}
              placeholder="Search posts"
            />
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>

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

  .input-container {
    margin-bottom: 1rem;

    .search-form {
      position: relative;

      input[type='text'] {
        outline: none;
        width: 100%;
        border: 2px solid rgb(209, 213, 219);
        border-radius: 0.375rem;
        padding: 0.5rem 1rem;
        transition: all 0.4s ease;

        ::placeholder {
          color: rgb(141, 141, 141);
        }

        &:focus {
          border-color: #126abd;
        }
      }

      svg.search-icon {
        width: 1.25rem;
        height: 1.25rem;
        top: 8px;
        right: 10px;
        position: absolute;
        color: #9c9c9c;
      }
    }
  }

  p {
    padding-top: 1rem;
  }
`;

export default Posts;
