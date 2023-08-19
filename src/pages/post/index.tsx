import { useRef, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { getPaginatedPosts, getTotalPosts } from '@/data/posts';
import { usePaginator } from '@/hooks/usePaginator';
import { debounce, formatDate } from '@/utils';
import type { InferNextProps } from '@/types/infer-next-props-type';

import SeoContainer from '@/components/SeoContainer';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import { sanityImageUrl } from '@/lib/sanity';

const PAGE_SIZE = 20;

export const getStaticProps = async () => {
  // Prefetch posts data from server
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['Posts', { offset: 0, search: '' }], () =>
    getPaginatedPosts({ offset: 0, pageSize: PAGE_SIZE })
  );

  // Get total data from server
  const totalPosts = await getTotalPosts();

  // Pass data to the page via props
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      totalPosts,
    },
    revalidate: 60,
  };
};

export default function Posts({ totalPosts }: InferNextProps<typeof getStaticProps>) {
  // Store search data in two separate entities
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');

  // Invoke pagination hook to transform page size data
  const { currentPage, setCurrentPage, isDisabled, pagesQuantity, offset, pageSize } = usePaginator(
    {
      total: totalPosts,
      initialState: {
        pageSize: PAGE_SIZE,
        currentPage: 1,
        isDisabled: false,
      },
    }
  );

  const showPagination = pagesQuantity > 1 && !search.length;

  // Get all posts data
  const { data: posts, isLoading } = useQuery(['Posts', { offset, pageSize, search }], () =>
    getPaginatedPosts({ offset, pageSize, search })
  );

  const isEmpty = !posts?.length;

  // After user typing in search, debounce the change and execute search
  const handleSearchChange = debounce((e) => {
    e.preventDefault();

    const input = inputRef.current?.value || '';
    setSearch(input);
  }, 500);

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const input = inputRef.current?.value || '';
    setSearch(input);
  };

  // Page change handlers
  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);

    window.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      <SeoContainer
        title={`Tulisan | Rahmat Panji`}
        description={`Tulisan dan coretan oleh Rahmat Paji`}
      />

      <section className='py-16'>
        <h1 className='text-3xl font-bold'>Semua Tulisan</h1>

        <div className='my-6'>
          <form className='search-form' onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              aria-label='Search posts'
              name='title'
              type='text'
              onChange={handleSearchChange}
              placeholder='Search posts'
            />
            <svg
              className='search-icon'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </form>
        </div>

        <div className=''>
          {isLoading ? (
            <>
              <div className='loading'>Loading...</div>
            </>
          ) : isEmpty ? (
            <div className='post-list-info'>
              <p>No posts found :(</p>
            </div>
          ) : (
            <div className='divide-y'>
              {posts.map((post) => (
                <article key={post.slug} className='post-list flex flex-row gap-4 lg:gap-8 py-8'>
                  <figure className='mt-1 post-image relative h-[80px] md:h-[125px] aspect-square w-auto'>
                    <Image
                      alt={post.title}
                      src={sanityImageUrl(post.mainImage).url() || ''}
                      fill
                      priority
                      sizes='(max-width: 768px) 80px, 125px'
                      className='rounded-sm object-cover'
                    />
                  </figure>

                  <div className='post-main'>
                    <Link href={`/post/${post.slug}`} className='link block'>
                      <h3 className='text-lg lg:text-xl leading-snug font-semibold line-clamp-3'>
                        {post.title}
                      </h3>
                    </Link>

                    {/* <p className='mt-3 text-mini text-slate-700 dark:text-slate-300 line-clamp-3 leading-snug'>
                      {post.subtitle}
                    </p> */}

                    <div className='mt-4 flex gap-2'>
                      <div className='category'>
                        {post.categories?.slice(0, 1).map((category, index) => (
                          <small className='font-medium text-link' key={category}>
                            {category}
                          </small>
                        ))}
                      </div>
                      <div className='dot'> • </div>
                      <div className='date'>
                        <small className='font-medium'>{formatDate(post.publishedAt)}</small>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {showPagination && (
          <Pagination
            isDisabled={isDisabled}
            currentPage={currentPage}
            pagesQuantity={pagesQuantity}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </>
  );
}
