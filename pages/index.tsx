import { useState, useEffect } from 'react';
import { InferGetStaticPropsType } from 'next';
import Select from 'react-select';
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';

import { getHomePageContent } from 'lib/page';
import { getCategories, getFeaturedPosts } from 'lib/post';
import { useGetCategoryPosts } from 'hooks/posts';
import { TPosts } from 'types/post';
import { TCategories } from 'types/categories';
import { THomePage } from 'types/page';

import Post from 'components/Post';
import SeoContainer from 'components/SeoContainer';

export default function Home({
  content,
  initialData,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Set Mounted State to avoid SSR issue
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Set initial selected category state
  const [category, setCategory] = useState(null);

  // Set Loading Mutation state
  const [loadingMutate, SetLoadingMutate] = useState(false);

  // store all categories into select options
  const categoryOptions = categories.map(category => ({
    value: category._id,
    label: category.title,
  }));

  // Call the hook
  const { data: filteredPosts, loading, error, mutate } = useGetCategoryPosts({
    param: category,
    initialData,
  });

  // When category is selected, mutate the data
  const changeCategory = async selected => {
    SetLoadingMutate(true);
    await setCategory(selected.value);
    await mutate(filteredPosts);
    SetLoadingMutate(false);
  };

  const posts = filteredPosts?.data;

  return (
    <>
      <SeoContainer />
      <HomeStyled>
        <section className="intro">
          <h1 className="page-title">{content.title}</h1>

          <article>
            <BlockContent blocks={content.description} />
          </article>
        </section>
        {/* {preview && <PreviewAlert />}
        {content} */}

        <h2>Featured posts</h2>

        {mounted && (
          <div className="category-select">
            <h3>Category</h3>
            <div className="select-container">
              <Select
                placeholder="Select Category..."
                options={categoryOptions}
                onChange={changeCategory}
              />
            </div>
          </div>
        )}

        {loadingMutate ? (
          <div className="projects-list-info">
            <p>Loading...</p>
          </div>
        ) : (
          <article className="projects-list">
            {!posts.length && (
              <div className="projects-list-info">
                <p>No posts available :(</p>
              </div>
            )}
            {posts.map(post => (
              <Post key={post.slug} post={post} />
            ))}
          </article>
        )}
      </HomeStyled>
    </>
  );
}

export const getStaticProps = async () => {
  const result: THomePage = await getHomePageContent();
  const posts: TPosts = await getFeaturedPosts();
  const categories: TCategories = await getCategories();
  // Pass data to the page via props
  return {
    props: {
      content: result,
      initialData: {
        data: posts,
      },
      categories,
    },
    revalidate: 1,
  };
};

const HomeStyled = styled.section`
  min-height: 100vh;

  .intro {
    margin-bottom: 4rem;
  }

  article {
    animation: fadeIn ease 0.3s;
    -webkit-animation: fadeIn ease 0.3s;
    p {
      padding-bottom: 1rem;
    }
  }

  .category-select {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: black !important;

    h3 {
      padding: 5px 2px;
      color: var(--color);
    }
  }

  .projects-list {
    /* min-height: 30vh; */

    &-info {
      margin-top: 1.5rem;
      animation: fadeIn ease 0.3s;
      -webkit-animation: fadeIn ease 0.3s;
    }
  }

  h2 {
    font-size: clamp(1.45rem, 5vw, 1.6rem);
  }
`;
