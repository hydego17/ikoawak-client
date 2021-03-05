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
        <img src={urlFor(mainImage).width(400).height(400).url()} alt={title} />
      </figure>

      <article className="card-body">
        <section className="post-main">
          <Link as={`post/${slug}`} href="post/[slug]">
            <a className="post-title" target="_blank">
              <h3>{title}</h3>
            </a>
          </Link>

          <hr />

          <p className="post-subtitle">{subtitle}</p>
        </section>

        <div className="metafooter">
          <div className="links">
            <small>{formatDate(publishedAt)} </small>

            {categories?.length && categories?.map(category => (
              <small key={category}>{category}</small>
            ))}
          </div>
        </div>
      </article>
    </PostStyled>
  );
};

const PostStyled = styled.article`
  display: flex;
  position: relative;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 1.5rem;
  /* padding: 1rem; */
  transition: box-shadow 0.3s ease;

  @media screen and (max-width: 678px) {
    display: block;
  }

  .card-image {
    @media screen and (max-width: 678px) {
      max-width: 500px;
      max-height: 300px;
    }

    max-width: 200px;
    height: 225px;
    display: flex;
    align-items: center;
    flex-shrink: 1;
    overflow: hidden;
    /* border-radius: 5px; */

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* @media screen and (max-width: 678px) {
      display: none;
    } */
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 2rem;
    width: 100%;

    @media screen and (max-width: 678px) {
      padding: 1.2rem;
    }

    .post-main {
      .post-title {
        display: block;
        padding-bottom: 0.5rem;

        &:hover {
          text-decoration: underline;
        }
      }

      .post-subtitle {
        font-size: 0.85rem;
      }

      hr {
        width: 100%;
        padding: 0.25rem;
      }
    }

    .metafooter {
      font-size: 14.5px;

      .links {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;

        small {
          padding-right: 0.5rem;
        }
      }
    }
  }
`;

export default Post;
