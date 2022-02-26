import { useState, useRef } from 'react';
import type { InferGetStaticPropsType } from 'next';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';

import { getCategories, getCategoryPosts, getPopularPosts } from '@/data/posts';
import { getHomePageContent } from '@/data/pages';
import { sanityImageUrl } from '@/lib/sanity';

import { PostCard, PostCarousel } from '@/components/Post';
import SeoContainer from '@/components/SeoContainer';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

export const getStaticProps = async () => {
  // Prefectch Category Posts
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['Category Posts', 'all'], async () => {
    return await getCategoryPosts('all');
  });

  // Get static data
  const homePageContent = await getHomePageContent();
  const categories = await getCategories();
  const popularPosts = await getPopularPosts();

  // Pass data to the page via props
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      content: homePageContent,
      categories,
      popularPosts,
    },
    revalidate: 60,
  };
};

export default function Home({ content, categories, popularPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Set initial selected category state
  const [category, setCategory] = useState({
    id: 'all',
    label: 'All',
  });

  // Category Select Ref ( to scroll when selected)
  const selectRef = useRef<HTMLDivElement>(null);

  // Store all categories into select options
  const categoryOptions = [{ label: 'All', value: 'all' }].concat([
    ...categories.map((category) => ({
      value: category._id,
      label: category.title,
    })),
  ]);

  // Get Category Posts
  const { data: categoryPosts, isLoading } = useQuery(['Category Posts', category.id], async () => {
    return await getCategoryPosts(category.id);
  });

  // Change category handler
  const changeCategory = async (selected) => {
    if (selected.value === category?.id) {
      return;
    }

    setCategory({
      id: selected.value,
      label: selected.label,
    });

    window.scrollTo({
      top: selectRef.current.offsetTop - 150,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <SeoContainer image={sanityImageUrl(content.image).saturation(-100).url()} />

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
          <h2>Latest posts - {isLoading ? ' ' : category ? category.label : 'All'}</h2>

          <div className="category-select" ref={selectRef}>
            <div className="select-container">
              <Select placeholder="Select Category..." options={categoryOptions} onChange={changeCategory} />
            </div>
          </div>

          {isLoading ? (
            <div className="posts-list-info">
              <p>Loading...</p>
            </div>
          ) : (
            <article className="posts-list">
              {!categoryPosts?.length && (
                <div className="posts-list-info">
                  <p>No posts available :(</p>
                </div>
              )}
              {categoryPosts?.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </article>
          )}
        </section>
      </HomeStyled>
    </>
  );
}

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
