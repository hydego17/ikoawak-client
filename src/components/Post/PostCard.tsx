import Link from 'next/link';
import Image from 'next/image';

import { formatDate } from '@/utils';
import { sanityImageUrl } from '@/lib/sanity';
import type { IPost } from '@/types';

type PostCardType = {
  views?: number;
  post: IPost;
};

export function PostCard({ post, views }: PostCardType) {
  const { title, subtitle, slug, author, mainImage, categories, publishedAt, body } = post;

  return (
    <div className='flex flex-col md:flex-row border border-slate-200 dark:border-gray-800 rounded overflow-hidden transition hover:shadow-md shadow-slate-700 dark:shadow-gray-700 min-h-[200px]'>
      <figure className='md:w-[28%] min-h-[200px] relative'>
        <Image
          alt={title}
          src={sanityImageUrl(mainImage).url() || ''}
          fill
          priority
          className='object-cover'
        />
      </figure>

      <div className='flex-1 flex flex-col justify-between px-4 py-6 lg:p-8'>
        <div className='post-main min-h-[150px]'>
          {views && categories?.length && (
            <div className='flex gap-2 mb-4'>
              {categories?.map((category, index) => (
                <span className='text-xs text-link font-medium' key={category}>
                  {category}
                </span>
              ))}
            </div>
          )}

          <Link href={`/post/${slug}`} className='link'>
            <h3 className='font-semibold text-lg leading-snug lg:leading-normal line-clamp-3'>
              {title}
            </h3>
          </Link>

          <hr className='my-3' />

          <p className='text-mini text-subtitle line-clamp-4'>{subtitle}</p>
        </div>

        <div className='mt-8 flex justify-between'>
          <div className='category flex gap-3'>
            {views ? (
              <small className='text-subtitle'>{views} views</small>
            ) : (
              categories?.length &&
              categories?.map((category, index) => (
                <span className='text-xs text-link font-medium' key={category}>
                  {category}
                </span>
              ))
            )}
          </div>

          <div className='font-medium text-xs'>{formatDate(publishedAt)}</div>
        </div>
      </div>
    </div>
  );
}
