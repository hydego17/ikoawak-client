import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';

import { sanityImageUrl } from '@/lib/sanity';
import { formatCount } from '@/lib/utils';

interface PostCardProps {
  views?: number;
  post: IPost;
}

export function PostCard({ post, views }: PostCardProps) {
  const { title, subtitle, slug, author, mainImage, categories, publishedAt } = post;

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

      <div className='flex-1 flex flex-col justify-between px-4 py-6 md:p-8 md:border-l'>
        <div className='post-main min-h-[150px] space-y-4'>
          {/* Category */}
          {categories?.length && (
            <div className='flex gap-3'>
              {categories?.map((category, index) => (
                <span className='text-xs text-link font-medium' key={category}>
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <Link href={`/post/${slug}`} className='link block'>
            <h3 className='font-semibold text-lg tracking-tight leading-snug line-clamp-3'>
              {title}
            </h3>
          </Link>

          {/* Subtitle */}
          <p className='text-mini text-subtitle line-clamp-3'>{subtitle}</p>
        </div>

        <div className='mt-8 flex items-center  justify-between'>
          {/* Views */}
          <div>
            {views ? (
              <div className='text-subtitle font-medium text-xs md:text-sm'> {formatCount(views)} views</div>
            ) : (
              <div className='text-subtitle font-medium text-xs md:text-sm'>By: {author}</div>
            )}
          </div>

          {/* Date */}
          <div className='text-subtitle font-medium text-xs md:text-sm'>{dayjs(publishedAt).format('ll')}</div>
        </div>
      </div>
    </div>
  );
}
