import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from 'lib/api';
import { formatDate } from 'lib/date';
import { TPost } from 'types/post';

type PostType = {
  post: TPost;
};

export default function PostCard({ post }: PostType) {
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

  function truncateString(str: string, num: number): string {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  return (
    <PostStyled className="post-card">
      <figure className="card-image">
        {/* <img src={urlFor(mainImage).width(400).height(400).url()} alt={title} /> */}
        <Image alt={title} src={urlFor(mainImage).url()} layout="fill" />
      </figure>

      <article className="card-body">
        <section className="post-main">
          <Link as={`/post/${slug}`} href="/post/[slug]">
            <a className="post-title">
              <h3>{title}</h3>
            </a>
          </Link>

          <hr />

          <p className="post-subtitle">{truncateString(subtitle, 150)}</p>
        </section>

        <div className="metafooter">
          <div className="links">
            <small>{formatDate(publishedAt)} </small>

            <div className="category">
              {categories?.length &&
                categories?.map((category, index) => (
                  <small
                    className={`category-text ${
                      index === categories.length - 1 && 'category-text-last'
                    } ${categories.length === 1 && 'category-text-single'}`}
                    key={category}
                  >
                    {category}
                  </small>
                ))}
            </div>
          </div>
        </div>
      </article>
    </PostStyled>
  );
}

const PostStyled = styled.article`
  cursor: pointer;
  display: flex;
  border-radius: 3px;
  overflow: hidden;
  min-height: 250px;
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

      .category {
        .category-text {
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
`;
