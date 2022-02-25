import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
// import AliceCarousel from 'react-alice-carousel';
const AliceCarousel = dynamic(() => import('react-alice-carousel'), {
  ssr: false,
});
import 'react-alice-carousel/lib/alice-carousel.css';

import { IPopularPost, IPost } from '@/types/post';

import { PostCard } from './PostCard';

type PopularPostProps = {
  views: number;
  post: IPost;
};

const PopularPost = ({ post, views }: PopularPostProps) => {
  return <PostCard post={post} views={views} />;
};

type PostCarouselProps = {
  posts: IPopularPost[];
};

export function PostCarousel({ posts }: PostCarouselProps) {
  // const handleDragStart = e => e.preventDefault();

  const items = posts.map((popular) => (
    <PopularPost key={`popular-${popular.slug}`} post={popular.post} views={popular.view_count} />
  ));

  const PrevButton = ({ isDisabled }) => {
    return (
      <button className="paginate-btn" disabled={isDisabled}>
        Prev
      </button>
    );
  };

  const NextButton = ({ isDisabled }) => {
    return (
      <button className="paginate-btn" disabled={isDisabled}>
        Next
      </button>
    );
  };

  return (
    <PostCarouselStyled>
      <AliceCarousel
        infinite
        mouseTracking
        items={items}
        autoPlay
        animationType="fadeout"
        autoPlayInterval={5000}
        animationDuration={1000}
        renderPrevButton={PrevButton}
        renderNextButton={NextButton}
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
