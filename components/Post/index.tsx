import { FC } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { urlFor } from 'lib/api';
import { formatDate } from 'lib/date';
import { TPost } from 'types/post';

type PostType = {
  post: TPost;
};

const Post: FC<PostType> = ({ post }) => {
  const {
    title,
    subtitle,
    slug,
    author,
    mainImage,
    categories,
    publishedAt,
    body,
  } = post;

  return (
    <PostStyled className="post-card">
      <figure className="card-image">
        <img src={urlFor(mainImage).width(200).height(200).url()} alt={title} />
      </figure>

      <article className="card-body">
        <div className="post-header">
          <Link as={`posts/${slug}`} href="posts/[slug]">
            <a className="post-title" target="_blank">
              <h3>{title}</h3>
            </a>
          </Link>
        </div>

        <hr />

        <p>{subtitle}</p>

        <div className="links">
          {categories?.map(category => (
            <small key={category}>{category}</small>
          ))}
          <small>{formatDate(publishedAt)}</small>
        </div>
      </article>
    </PostStyled>
  );
};

const PostStyled = styled.article`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 1rem;
  padding: 1rem;
  transition: box-shadow 0.3s ease;

  .card-body {
    @media screen and (min-width: 678px) {
      margin-left: 2rem;
    }

    width: 100%;

    p {
      line-height: 1.5;
    }
  }

  .card-image {
    display: flex;
    align-items: center;
    /* padding: 0.2rem; */
    flex-shrink: 1;
    overflow: hidden;
    border-radius: 5px;
    /* margin-right: 2rem; */

    @media screen and (max-width: 678px) {
      display: none;
    }
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
  }

  .post-title {
    display: block;

    &:hover {
      text-decoration: underline;
    }
  }

  hr {
    padding: 0.25rem;
  }

  .links {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    small {
      padding-right: 0.5rem;
    }
  }
`;

export default Post;
