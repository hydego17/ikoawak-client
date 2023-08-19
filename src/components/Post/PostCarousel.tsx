import { useMemo } from 'react';
import dynamic from 'next/dynamic';

import type { IPopularPost } from '@/types';

import { PostCard } from './PostCard';
import { Button } from '../ui/button';

import 'react-alice-carousel/lib/alice-carousel.css';

// Dynamic Import for AliceCarousel (Client Side Only)
const AliceCarousel = dynamic(() => import('react-alice-carousel'), {
  ssr: false,
});

type PostCarouselProps = {
  posts: IPopularPost[];
};

/**
 * Carousel component to display popular posts in homepage
 */
export function PostCarousel({ posts }: PostCarouselProps) {
  // Render post card item into carousel children
  const carouselItems = useMemo(
    () =>
      posts.map((popular) => (
        <PostCard
          key={`popular-post-${popular.slug}`}
          post={popular.post}
          views={popular.view_count}
        />
      )),
    [posts]
  );

  return (
    <div>
      <AliceCarousel
        infinite
        mouseTracking
        items={carouselItems}
        autoPlay
        animationType='fadeout'
        autoPlayInterval={5000}
        animationDuration={1000}
        renderNextButton={({ isDisabled }) => (
          <Button variant='outline' size='sm' disabled={isDisabled}>
            Next
          </Button>
        )}
        renderPrevButton={({ isDisabled }) => (
          <Button variant='outline' size='sm' disabled={isDisabled}>
            Prev
          </Button>
        )}
      />
    </div>
  );
}
