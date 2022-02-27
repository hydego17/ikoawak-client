import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';

import { getSinglePost, getLatestPosts, getPopularPosts } from '@/data/posts';
import { formatDate } from '@/utils';
import { sanityImageUrl } from '@/lib/sanity';
import type { InferNextProps } from '@/types/infer-next-props-type';

import PreviewAlert from '@/components/PreviewAlert';
import SeoContainer from '@/components/SeoContainer';
import PageViews from '@/components/PageViews';

const DEV = process.env.NODE_ENV === 'development';

export const getStaticPaths = async () => {
  // Get all slugs from posts and provide it to paths
  const latestPosts = await getLatestPosts();
  const popularPosts = await getPopularPosts();

  const paths = latestPosts
    ?.map((p) => ({ params: { slug: p.slug } }))
    .concat(popularPosts?.map((p) => ({ params: { slug: p.slug } })));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params, preview = false }) => {
  const slug = params?.slug as string;
  const post = await getSinglePost(slug, preview);

  return {
    props: {
      post,
      preview,
    },
    revalidate: 60,
  };
};

export default function PostDetail({ post, preview }: InferNextProps<typeof getStaticProps>) {
  const { author, title, subtitle, body, categories, publishedAt, mainImage, slug } = post;

  const updatePageViews = useCallback(async () => {
    let firstTimeVisit = false;

    // Check if user already has a session
    if (typeof window !== 'undefined') {
      // Get session status of current post
      const sessionData = JSON.parse(window.sessionStorage.getItem('page_visited') as string) as
        | Record<string, boolean>
        | undefined;

      firstTimeVisit = !sessionData?.[slug];

      // If no session found, store a new one and update page views
      if (firstTimeVisit) {
        const updatedSessionData = {
          ...(sessionData || {}),
          [slug]: true,
        };

        window.sessionStorage.setItem('page_visited', JSON.stringify(updatedSessionData));

        await fetch(`/api/views/${slug}`, {
          method: 'POST',
        });
      }
    }
  }, [slug]);

  // Update views
  useEffect(() => {
    // Only count views if not in Dev/Preview Mode,
    // and user is in the first visit on window session
    if (!DEV && !preview) {
      updatePageViews();
    }
  }, [slug, preview, updatePageViews]);

  const ImageRenderer = (props) => {
    const {
      node: { asset, alt },
    } = props;
    return (
      <div className="post-image">
        <Image alt={alt || title} src={asset.url} objectFit="cover" height={500} width={800} />
        {alt && <small className="post-image-desc">{alt}</small>}
      </div>
    );
  };

  const parsedImageUrl = sanityImageUrl(mainImage).url() || '';

  return (
    <>
      <SeoContainer
        title={`${title} – Rahmat Panji`}
        description={`${subtitle} | ${categories.map((c) => c + ' ')}`}
        image={parsedImageUrl}
        date={publishedAt}
        type="article"
        author={author}
        tag={categories[0]}
      />

      <ProjectDetailStyled>
        <section className="post">
          {preview && <PreviewAlert />}

          <div className="meta">
            <div className="category">
              {categories?.map((category, index) => (
                <small className={`category-text ${index === categories.length - 1 && 'no-border'}`} key={category}>
                  {category}
                </small>
              ))}
            </div>

            <small>{formatDate(publishedAt)}</small>
          </div>

          <header className="title">
            <h1>{title} </h1>
          </header>

          <p className="subtitle">{subtitle}</p>

          <div className="meta">
            <small className="meta-author">By: {author} </small>

            <small className="meta-views">
              <PageViews slug={slug} />
            </small>
          </div>

          <figure className="image">
            <Image alt={title} src={parsedImageUrl} height={500} width={800} />
          </figure>

          <article className="body">
            <BlockContent blocks={body} serializers={{ types: { image: ImageRenderer } }} />
          </article>
        </section>
      </ProjectDetailStyled>
    </>
  );
}

// Style
const ProjectDetailStyled = styled.section`
  .post {
    margin-bottom: 3rem;

    .title {
      padding-top: 0.25rem;
    }

    .subtitle {
      /* padding: 1rem 0; */
      margin-bottom: 1.5rem;
    }

    .meta {
      color: var(--color-meta);
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
    }

    .image {
      position: relative;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    .body {
      p {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      ul,
      ol {
        padding: 1rem 2rem;
        list-style: initial;

        li {
          padding: 0.2rem 0;
        }
      }

      .post-image {
        position: relative;
        text-align: center;

        div {
          border-radius: 3px;
          overflow: hidden;
        }

        .post-image-desc {
          color: var(--color-meta);
        }
      }
    }

    .category {
      .category-text {
        display: inline-block;
        padding-right: 5px;
        margin-right: 5px;
        border-right: 1px solid var(--borderColor);
      }

      .no-border {
        border: 0;
      }
    }
  }

  small {
    font-size: 14px;
  }

  h2 {
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
  }
`;
