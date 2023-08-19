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

const PAGE_SIZE = 10;

export const getStaticProps = async () => {
  // Prefetch posts data from server
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['Posts', { offset: 0, search: '' }], () =>
    getPaginatedPosts({ offset: 0 })
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
  const { currentPage, setCurrentPage, isDisabled, pagesQuantity, offset } = usePaginator({
    total: totalPosts,
    initialState: {
      pageSize: PAGE_SIZE,
      currentPage: 1,
      isDisabled: false,
    },
  });

  // Get all posts data
  const { data: posts, isLoading } = useQuery(['Posts', { offset, search }], () =>
    getPaginatedPosts({ offset, search })
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
        <h1 className='text-3xl font-bold'>Tulisan</h1>

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
                <article
                  key={post.slug}
                  className='post-list flex flex-col-reverse lg:flex-row gap-4 lg:gap-8 py-8'
                >
                  <div className='post-main flex-1 p-1'>
                    <Link href={`/post/${post.slug}`} className='link'>
                      <h3 className='text-xl leading-snug font-semibold'>{post.title}</h3>
                    </Link>

                    <p className='mt-3 text-mini text-slate-700 dark:text-slate-300 line-clamp-3 leading-snug'>
                      {post.subtitle}
                    </p>

                    <div className='mt-6 flex gap-2'>
                      <div className='category'>
                        {post.categories?.map((category, index) => (
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

                  <figure className='post-image relative h-[250px] lg:h-[160px] lg:aspect-square w-auto'>
                    <Image
                      alt={post.title}
                      src={sanityImageUrl(post.mainImage).url() || ''}
                      fill
                      priority
                      className='rounded-sm object-cover'
                    />
                  </figure>
                </article>
              ))}
            </div>
          )}
        </div>

        {!search.length && (
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

// const ArchiveStyled = styled.section`
//   table {
//     width: 100%;
//     border-collapse: collapse;

//     td {
//       padding: 0.75rem 0;
//       white-space: nowrap;

//       &.post_title {
//         padding-right: 1rem;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         width: 100%;
//         max-width: 0;
//       }

//       &.post_date {
//         text-align: right;
//       }
//     }
//   }

//   h1 {
//     font-size: clamp(1.75rem, 2.5vw, 2rem);
//     padding-bottom: 1rem;
//   }

//   .input-container {
//     margin-bottom: 1rem;

//     .search-form {
//       position: relative;

//       input[type='text'] {
//         -webkit-appearance: none;
//         -moz-appearance: none;
//         appearance: none;
//         outline: none;
//         width: 100%;
//         border: 1.5px solid var(--borderColor);
//         border-radius: 0.375rem;
//         padding: 0.5rem 1rem;
//         transition: all 0.4s ease;
//         background-color: white;
//         color: #1a1a1a;

//         ::placeholder {
//           color: rgb(141, 141, 141);
//         }

//         &:focus {
//           box-shadow: 0 0 0 1px var(--inputBorder);
//           border-color: var(--inputBorder);
//         }
//       }

//       svg.search-icon {
//         width: 1.25rem;
//         height: 1.25rem;
//         top: 8px;
//         right: 12px;
//         position: absolute;
//         color: #9c9c9c;
//       }
//     }
//   }

//   div.loading {
//     animation: fadeIn 0.3s ease;
//   }
// `;
