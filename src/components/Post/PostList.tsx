import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';

import { sanityImageUrl } from '@/lib/sanity';
import type { IPost } from '@/types/post';
import { formatDate, truncateString } from '@/utils';

export type PostListProps = {
  posts: IPost[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <PostListStyled>
      {!posts.length && (
        <div className="post-list-info">
          <p>No posts found :(</p>
        </div>
      )}

      {posts.map((post) => (
        <article key={post.slug} className="post-list">
          <article className="card-body">
            <section className="post-main">
              <Link as={`/post/${post.slug}`} href="/post/[slug]">
                <a className={`post-title`}>
                  <h3>{post.title}</h3>
                </a>
              </Link>

              <p className="post-subtitle">{truncateString(post.subtitle, 150)}</p>

              <div className="metafooter">
                <div className="category">
                  {post.categories?.map((category, index) => (
                    <small
                      className={`category-text ${index === post.categories.length - 1 && 'category-text-last'} ${
                        post.categories.length === 1 && 'category-text-single'
                      }`}
                      key={category}
                    >
                      {category}
                    </small>
                  ))}
                </div>
                <div className="dot"> • </div>
                <div className="date">
                  <small>{formatDate(post.publishedAt)}</small>
                </div>
              </div>
            </section>
          </article>

          <figure className="card-image">
            <Image alt={post.title} src={sanityImageUrl(post.mainImage).url()} layout="fill" priority />
          </figure>
        </article>
      ))}
    </PostListStyled>
  );
}

const PostListStyled = styled.section`
  .post-list {
    cursor: pointer;
    display: flex;
    gap: 1rem;
    padding: 1rem 0.25rem;

    border-radius: 3px;
    border-bottom: 1px solid var(--borderColor);
    animation: fadeIn ease 0.2s;

    &-info {
      animation: fadeIn ease 0.2s;
    }

    .card-image {
      position: relative;
      width: 30%;
      height: 150px;

      @media screen and (max-width: 678px) {
        width: 33.333%;
        max-height: 70px;
      }
    }

    .card-body {
      margin-top: -5px;
      padding: 10px 0;
      width: 80%;

      @media screen and (max-width: 678px) {
        width: 100%;
      }

      @media screen and (max-width: 678px) {
        padding: 0;
      }

      .post-main {
        .post-title {
          display: block;
          font-size: clamp(0.9rem, 2.5vw, 1rem);

          &:hover {
            text-decoration: underline;
          }

          h3 {
            font-weight: 600;
          }
        }

        .post-subtitle {
          margin-top: 0.65rem;
          font-size: clamp(0.8rem, 2.5vw, 0.85rem);
        }

        hr {
          padding: 0.25rem;
        }
      }

      .metafooter {
        margin-top: 1rem;
        font-size: 14.5px;
        display: flex;

        .date {
          small {
            font-weight: 500;
            padding-right: 2px;
          }
        }

        .dot {
          margin: 0 5px;
        }

        .category {
          .category-text {
            color: var(--hoverClr);
            font-weight: 600;
            display: inline-block;
            padding-right: 5px;
            margin-right: 5px;
            border-right: 1px solid var(--borderColor);

            &-single {
              padding: 0;
              margin: 0;
            }

            &-last {
              border: 0;
            }
          }
        }
      }
    }
  }
`;
