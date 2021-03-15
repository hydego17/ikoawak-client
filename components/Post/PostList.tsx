import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

import { TPopularPosts, TPost } from 'types/post';

export type PostListProps = {
  posts: TPopularPosts;
};

export function PostList({ posts }: PostListProps) {
  return (
    <PostListStyled>
      <div></div>
    </PostListStyled>
  );
}

const PostListStyled = styled.article``;
