import { useState, useEffect } from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
// import Select from 'react-select';
const Select = dynamic(() => import('react-select'), {
  ssr: false,
});
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';

import { getHomePageContent } from 'lib/page';
import { getCategories, getLatestPosts } from 'lib/post';
import { useGetCategoryPosts, useGetPopularPosts } from 'hooks/posts';
import { TPosts, TPopularPosts } from 'types/post';
import { TCategories } from 'types/categories';
import { THomePage } from 'types/page';

import { PostCard, PostCarousel } from 'components/Post';
import SeoContainer from 'components/SeoContainer';

export default function Home({
  content,
  initialData,
  categories,
  popularPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Set Mounted State to avoid SSR issue
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);

  // Get Most Popular Posts hook
  // const { data: popularPosts, loading } = useGetPopularPosts();

  // Set initial selected category state
  const [category, setCategory] = useState(null);

  // Set Loading Mutation state
  const [loadingMutate, SetLoadingMutate] = useState(false);

  // store all categories into select options
  const categoryOptions = categories.map(category => ({
    value: category._id,
    label: category.title,
  }));

  // Get Category Posts hook
  const { data: filteredPosts, mutate } = useGetCategoryPosts({
    param: category?.value,
    initialData,
  });

  // When category is selected, mutate the data
  const changeCategory = async selected => {
    SetLoadingMutate(true);
    await setCategory(selected);
    await mutate(filteredPosts);
    SetLoadingMutate(false);
  };

  const posts = filteredPosts?.data;

  return (
    <>
      <SeoContainer />
      <HomeStyled>
        {/* {preview && <PreviewAlert />} */}

        <section className="intro">
          <h1 className="page-title">{content.title}</h1>

          <article>
            <BlockContent blocks={content.description} />
          </article>
        </section>

        <section className="most-popular">
          <h2>Most popular</h2>

          <PostCarousel posts={popularPosts} />
        </section>

        <section className="latest-posts">
          <h2>
            Latest posts -{' '}
            {loadingMutate ? ' ' : category ? category.label : 'All'}
          </h2>

          <div className="category-select">
            {/* <h3>Category</h3> */}
            <div className="select-container">
              <Select
                placeholder="Select Category..."
                options={categoryOptions}
                onChange={changeCategory}
              />
            </div>
          </div>

          {loadingMutate ? (
            <div className="posts-list-info">
              <p>Loading...</p>
            </div>
          ) : (
            <article className="posts-list">
              {!posts.length && (
                <div className="posts-list-info">
                  <p>No posts available :(</p>
                </div>
              )}
              {posts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </article>
          )}
        </section>
      </HomeStyled>
    </>
  );
}

export const getStaticProps = async () => {
  const result: THomePage = await getHomePageContent();
  const posts: TPosts = await getLatestPosts();
  const categories: TCategories = await getCategories();
  const popularPosts: TPopularPosts = await fetch(
    `${process.env.CLIENT_URL}/api/most-popular`,
  ).then(res => res.json());

  // Pass data to the page via props
  return {
    props: {
      content: result,
      initialData: {
        data: posts,
      },
      categories,
      popularPosts,
    },
    revalidate: 1,
  };
};

const HomeStyled = styled.section`
  min-height: 100vh;

  & > section:first-of-type {
    margin-bottom: 4rem;
  }

  & > section:nth-of-type(2) {
    margin-bottom: 2rem;
  }

  article {
    animation: fadeIn ease 0.3s;
    -webkit-animation: fadeIn ease 0.3s;
    p {
      padding-bottom: 1rem;
    }
  }

  .category-select {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: black !important;

    h3 {
      padding: 5px 2px;
      color: var(--color);
    }
  }

  .posts-list {
    &-info {
      min-height: 30vh;
      margin-top: 1.5rem;
      animation: fadeIn ease 0.3s;
      -webkit-animation: fadeIn ease 0.3s;
    }
  }

  h2 {
    font-size: clamp(1.45rem, 5vw, 1.6rem);
  }
`;
