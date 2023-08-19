import React, { useEffect } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import { getSinglePost, getLatestPosts, getPopularPosts } from '@/data/posts';
import { getPageViews, incrementPageView } from '@/data/views';
import { sanityImageUrl } from '@/lib/sanity';

import SeoContainer from '@/components/seo-container';
import PreviewAlert from '@/components/PreviewAlert';
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

      <section className='post py-16 max-w-[680px] mx-auto'>
        {preview && <PreviewAlert />}

        <div className='space-y-4'>
          <h1 className='page-title'>{title} </h1>
          {subtitle && <p className='page-subtitle'>{subtitle}</p>}
        </div>

        <div className='mt-6 flex gap-2 justify-between'>
          <div className='space-y-0.5 text-subtitle'>
            <div className='text-mini font-medium'>By {author}</div>
            <div className='text-sm'>{dayjs(publishedAt).format('ll')}</div>
          </div>

          {viewCount && (
            <div className='text-mini font-medium text-subtitle'>{viewCount} views</div>
          )}
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

        <hr className='my-8' />

        <section>
          <BlockContent type='blog' blocks={body} dropCaps />
        </section>

        <hr className='my-8' />

        <div className='space-y-2'>
          <div className='category flex gap-2'>
            {categories?.slice(0, 2).map((category, index) => (
              <span
                className='px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-sm md:text-mini font-medium'
                key={category}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
