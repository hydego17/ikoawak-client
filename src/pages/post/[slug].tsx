import React, { useEffect } from 'react';
import Image from 'next/image';

import { getSinglePost, getLatestPosts, getPopularPosts } from '@/data/posts';
import { getPageViews, incrementPageView } from '@/data/views';
import { formatDate } from '@/utils';
import { sanityImageUrl } from '@/lib/sanity';
import type { InferNextProps } from '@/types/infer-next-props-type';

import PreviewAlert from '@/components/PreviewAlert';
import SeoContainer from '@/components/SeoContainer';
import BlockContent from '@/components/block-content';

const DEV = process.env.NODE_ENV === 'development';

export const getStaticPaths = async () => {
  // Get all slugs from posts and provide it to paths
  const latestPosts = await getLatestPosts();
  const popularPosts = await getPopularPosts();

  const paths = latestPosts
    ?.map((p) => ({ params: { slug: p.slug } }))
    .concat(popularPosts?.map((p) => ({ params: { slug: p.slug } })));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params, preview = false }) => {
  const slug = params?.slug as string;
  const post = await getSinglePost(slug, preview);
  const viewCount = await getPageViews(slug);

  return {
    props: {
      post,
      viewCount: viewCount,
      preview,
    },
    revalidate: 60,
  };
};

export default function PostDetail({
  post,
  viewCount,
  preview,
}: InferNextProps<typeof getStaticProps>) {
  const { author, title, subtitle, body, categories, publishedAt, mainImage, slug } = post;

  // Update views
  useEffect(() => {
    // Only count views if not in Dev/Preview Mode,
    // and user is in the first visit on window session
    if (!DEV && !preview) {
      incrementPageView(slug);
    }
  }, [preview, slug]);

  const parsedImageUrl = sanityImageUrl(mainImage).url() || '';

  return (
    <>
      <SeoContainer
        title={`${title} – Rahmat Panji`}
        description={`${subtitle} | ${categories.map((c) => c + ' ')}`}
        image={parsedImageUrl}
        date={publishedAt}
        type='article'
        author={author}
        tag={categories[0]}
      />

      <section className='post py-12'>
        {preview && <PreviewAlert />}

        <div className='flex items-center justify-between'>
          <div className='category flex gap-2'>
            {categories?.slice(0, 2).map((category, index) => (
              <span
                className='px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-sm font-medium'
                key={category}
              >
                {category}
              </span>
            ))}
          </div>

          <span className='text-sm font-medium'>{formatDate(publishedAt)}</span>
        </div>

        <header className='mt-4 py-12'>
          <h1 className='page-title'>{title} </h1>
          {subtitle && <p className='mt-6 text-subtitle text-lg'>{subtitle}</p>}
        </header>

        <div className='flex items-center justify-between'>
          <span className='text-mini text-slate-600 dark:text-slate-400  font-medium'>
            By: {author}{' '}
          </span>

          <span className='text-mini text-slate-600 dark:text-slate-400 font-medium'>
            {viewCount && <div className='page-views'>{viewCount} views</div>}
          </span>
        </div>

        <figure className='mt-8'>
          <Image
            alt={title}
            src={parsedImageUrl}
            height={400}
            width={800}
            className='h-[250px] md:h-[400px] object-cover'
          />
        </figure>

        <div className='my-8 py-8 border-y'>
          <BlockContent blocks={body} dropCaps />
        </div>
      </section>
    </>
  );
}
