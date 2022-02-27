import 'react-alice-carousel/lib/alice-carousel.css';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

import type { IPopularPost } from '@/types';

import { PostCard } from './PostCard';

// Dynamic Import for AliceCarousel (Client Side Only)
const AliceCarousel = dynamic(() => import('react-alice-carousel'), {
  ssr: false,
});

// Custom button for carousel
const RenderButton = (label: 'Prev' | 'Next') => ({ isDisabled }) => {
  <button className="paginate-btn" disabled={isDisabled}>
    {label}
  </button>;
};

type PostCarouselProps = {
  posts: IPopularPost[];
};

/**
 * Carousel component to display popular posts in homepage
 */
export function PostCarousel({ posts }: PostCarouselProps) {
  // Render post card item into carousel children
  const carouselItems = posts.map((popular) => (
    <PostCard key={`popular-post-${popular.slug}`} post={popular.post} views={popular.view_count} />
  ));

  return (
    <PostCarouselStyled>
      <AliceCarousel
        infinite
        mouseTracking
        items={carouselItems}
        autoPlay
        animationType="fadeout"
        autoPlayInterval={5000}
        animationDuration={1000}
        renderNextButton={RenderButton('Next')}
        renderPrevButton={RenderButton('Prev')}
      />
    </PostCarouselStyled>
  );
}

const PostCarouselStyled = styled.article`
  .card-body {
    @media screen and (max-width: 678px) {
      min-height: 300px;
    }
  }
  .alice-carousel__dots {
    margin: 0;
    margin-top: 0.5rem;
  }
  .alice-carousel__dots-item:not(.__custom):hover,
  .alice-carousel__dots-item:not(.__custom).__active {
    background-color: #e79d12;
  }
`;
