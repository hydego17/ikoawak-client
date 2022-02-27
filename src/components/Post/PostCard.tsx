import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';

import { formatDate, truncateString } from '@/utils';
import { sanityImageUrl } from '@/lib/sanity';
import type { IPost } from '@/types';

type PostCardType = {
  views?: number;
  post: IPost;
};

export function PostCard({ post, views }: PostCardType) {
  const { title, subtitle, slug, author, mainImage, categories, publishedAt, body } = post;

  return (
    <PostStyled className="post-card">
      <figure className="card-image">
        <Image alt={title} src={sanityImageUrl(mainImage).url() || ''} layout="fill" priority />
      </figure>

      <article className="card-body">
        <section className="post-main">
          <div className="category">
            {views &&
              categories?.length &&
              categories?.map((category, index) => (
                <small
                  className={`category-text ${index === categories.length - 1 && 'category-text-last'} ${
                    categories.length === 1 && 'category-text-single'
                  }`}
                  key={category}
                >
                  {category}
                </small>
              ))}
          </div>

          <Link as={`/post/${slug}`} href="/post/[slug]">
            <a className={`post-title ${views && 'views'}`}>
              <h3>{title}</h3>
            </a>
          </Link>

          <hr />

          <p className="post-subtitle">{truncateString(subtitle, 150)}</p>
        </section>

        <div className="metafooter">
          <div className="category">
            {views ? (
              <small>{views} views</small>
            ) : (
              categories?.length &&
              categories?.map((category, index) => (
                <small
                  className={`category-text ${index === categories.length - 1 && 'category-text-last'} ${
                    categories.length === 1 && 'category-text-single'
                  }`}
                  key={category}
                >
                  {category}
                </small>
              ))
            )}
          </div>
          <div className="date">
            <small>{formatDate(publishedAt)} </small>
          </div>
        </div>
      </article>
    </PostStyled>
  );
}

const PostStyled = styled.article`
  cursor: pointer;
  display: flex;
  min-height: 250px;
  overflow: hidden;
  border-radius: 3px;
  margin-top: 1.5rem;
  background: var(--cardBg);
  border: 1px solid var(--borderColor);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: var(--boxShadow);
  }

  @media screen and (max-width: 678px) {
    display: block;
  }

  .card-image {
    flex: 1;
    flex-shrink: 1;
    flex-grow: 1;
    width: 100%;
    min-height: 200px;
    position: relative;
  }

  .card-body {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    width: 100%;

    @media screen and (max-width: 678px) {
      padding: 1.2rem;
    }

    .post-main {
      .post-title {
        display: block;
        font-size: clamp(0.95rem, 2.5vw, 1rem);
        padding-bottom: 0.5rem;

        &:hover {
          text-decoration: underline;
        }

        h3 {
          font-weight: 600;
        }
      }

      .views {
        margin-top: 5px;
      }

      .post-subtitle {
        font-size: 0.85rem;
      }

      hr {
        padding: 0.25rem;
      }
    }

    .metafooter {
      font-size: 14.5px;
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }
  }
`;
