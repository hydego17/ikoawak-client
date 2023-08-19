import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import type { InferNextProps } from '@/types/infer-next-props-type';
import { getCategories, getCategoryPosts, getPopularPosts } from '@/data/posts';
import { getHomePageContent } from '@/data/pages';
// import { sanityImageUrl } from '@/lib/sanity';
import { prefetchQueries } from '@/lib/react-query-server';

import BlockContent from '@/components/block-content';
import { PostCard } from '@/components/post-card';
import SeoContainer from '@/components/SeoContainer';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

export const getStaticProps = async () => {
  // Get static data
  const homePageContent = await getHomePageContent();
  const categories = await getCategories();
  const popularPosts = await getPopularPosts();

  // Prefetch Queries
  const dehydratedState = await prefetchQueries([
    {
      queryKey: ['Category Posts', 'all'],
      queryFn: () => getCategoryPosts('all'),
    },
  ]);

  // Pass data to the page via props
  return {
    props: {
      dehydratedState,
      content: homePageContent,
      categories,
      popularPosts,
    },
    revalidate: 60,
  };
};

export default function Home({
  content,
  categories,
  popularPosts,
}: InferNextProps<typeof getStaticProps>) {
  // Set initial selected category state
  const [category, setCategory] = useState({
    id: 'all',
    label: 'Semua Kategori',
  });

  // Category Select Ref ( to scroll when selected)
  const selectRef = useRef<HTMLDivElement>(null);

  // Store all categories into select options
  const categoryOptions = [{ label: 'Semua Kategori', value: 'all' }].concat([
    ...categories.map((category) => ({
      value: category._id,
      label: category.title,
    })),
  ]);

  // Get Category Posts
  const { data: categoryPosts, isLoading } = useQuery({
    queryKey: ['Category Posts', category.id],
    queryFn: () => getCategoryPosts(category.id),
  });
  const isEmpty = !categoryPosts?.length;

  // Change category handler
  const changeCategory = async (selected) => {
    if (selected.value === category?.id) {
      return;
    }

    setCategory({
      id: selected.value,
      label: selected.label,
    });

    if (selectRef.current?.offsetTop) {
      window.scrollTo({
        top: selectRef?.current?.offsetTop - 150,
        behavior: 'smooth',
      });
    }
  };

  // const parsedImageUrl = sanityImageUrl(content.image).saturation(-100).url() || '';

  return (
    <>
      <SeoContainer />

      <div className='py-16 space-y-16'>
        <section className=''>
          <h1 className='page-title'>{content.title}</h1>

          <article className='mt-8 text-subtitle'>
            <BlockContent blocks={content.description} />
          </article>
        </section>

        <section>
          <h2 className='text-xl md:text-2xl font-semibold'>Populer</h2>
          <hr className='my-4' />
          <div className='space-y-6'>
            {popularPosts.map((post) => (
              <PostCard key={post.slug} post={post.post} views={post.view_count} />
            ))}
          </div>
        </section>

        <section>
          <h2 className='text-xl md:text-2xl font-semibold'>
            Tulisan Terbaru - {isLoading ? ' ' : category ? category.label : 'All'}
          </h2>

          <hr className='my-4' />

          <div className='mt-4' ref={selectRef}>
            <Select
              placeholder='Pilih Kategori'
              options={categoryOptions}
              onChange={changeCategory}
              isSearchable={false}
              styles={{
                option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                  return {
                    ...styles,
                    background: isSelected ? '#cbd5e1' : data.background,
                    color: isDisabled ? '#ccc' : isSelected ? 'black' : 'black',
                  };
                },
              }}
            />
          </div>

          <div className='mt-6'>
            {isLoading ? (
              <div>
                <p>Loading...</p>
              </div>
            ) : isEmpty ? (
              <div>
                <p>{`No posts available :(`}</p>
              </div>
            ) : (
              <div className='space-y-4'>
                {categoryPosts?.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
