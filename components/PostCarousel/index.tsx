import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
// import AliceCarousel from 'react-alice-carousel';
const AliceCarousel = dynamic(() => import('react-alice-carousel'), {
  ssr: false,
});
import 'react-alice-carousel/lib/alice-carousel.css';

import { TPopularPosts, TPost } from 'types/post';

import PostCard from 'components/Post';

export type PopularPostProps = {
  views: number;
  post: TPost;
};

const PopularPost = ({ post, views }: PopularPostProps) => {
  return <PostCard post={post} views={views} />;
};

export type PostCarouselProps = {
  posts: TPopularPosts;
};

export default function PostCarousel({ posts }: PostCarouselProps) {
  const handleDragStart = e => e.preventDefault();

  const items = posts.map(popular => (
    <PopularPost
      key={`popular-${popular.slug}`}
      post={popular.post}
      views={popular.view_count}
    />
  ));

  return (
    <PostCarouselStyled>
      <AliceCarousel
        autoPlay
        animationType="fadeout"
        autoPlayInterval={5000}
        animationDuration={1000}
        infinite
        mouseTracking
        items={items}
      />
    </PostCarouselStyled>
  );
}

const PostCarouselStyled = styled.section`
  /* min-height: 100vh; */

  .alice-carousel__dots {
    margin: 0;
    margin-top: 1rem;
  }
  .alice-carousel__dots-item:not(.__custom):hover,
  .alice-carousel__dots-item:not(.__custom).__active {
    background-color: #e79d12;
  }
`;
