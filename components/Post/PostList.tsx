import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';

import { urlFor } from 'lib/api';
import { formatDate } from 'lib/date';

import { TPosts } from 'types/post';

export type PostListProps = {
  posts: TPosts;
  loading: boolean;
};

export function PostList({ posts, loading }: PostListProps) {
  return (
    <PostListStyled>
      {loading ? (
        <div className="post-list-info">Loading...</div>
      ) : (
        <>
          {!posts.length && (
            <div className="post-list-info">
              <p>No posts available :(</p>
            </div>
          )}

          {posts.map(post => (
            <article key={post.slug} className="post-list">
              <figure className="card-image">
                <Image
                  alt={post.title}
                  src={urlFor(post.mainImage).url()}
                  layout="fill"
                />
              </figure>

              <article className="card-body">
                <section className="post-main">
                  <Link as={`/post/${post.slug}`} href="/post/[slug]">
                    <a className={`post-title`}>
                      <h3>{post.title}</h3>
                    </a>
                  </Link>

                  <div className="metafooter">
                    <div className="category">
                      {post.categories?.length &&
                        post.categories?.map((category, index) => (
                          <small
                            className={`category-text ${
                              index === post.categories.length - 1 &&
                              'category-text-last'
                            } ${
                              post.categories.length === 1 &&
                              'category-text-single'
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
            </article>
          ))}
        </>
      )}
    </PostListStyled>
  );
}

const PostListStyled = styled.section`
  .post-list {
    cursor: pointer;
    display: flex;
    border-radius: 3px;
    padding: 1rem 0;
    border-bottom: 1px solid var(--borderColor);
    animation: fadeIn ease 0.3s;

    &-info {
      animation: fadeIn ease 0.3s;
    }

    .card-image {
      position: relative;
      width: 30%;
      height: 150px;

      @media screen and (max-width: 678px) {
        width: 33.333%;
        height: 80px;
      }
    }

    .card-body {
      margin-top: -5px;
      padding: 10px 2rem;
      width: 80%;

      @media screen and (max-width: 678px) {
        width: 100%;
      }

      @media screen and (max-width: 678px) {
        padding: 0;
        padding-left: 1rem;
      }

      .post-main {
        .post-title {
          display: block;
          font-size: 0.9em;
          line-height: 1.45;

          &:hover {
            text-decoration: underline;
          }
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
