import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';

import { urlFor } from 'lib/api';
import { formatDate } from 'lib/date';
import { getSinglePost, getFeaturedPosts } from 'lib/post';
import PreviewAlert from 'components/PreviewAlert';
import { TPost, TPosts } from 'types/post';

export default function PostDetail({
  post,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // Check fallback status
  //   if (!router.isFallback && !post?.slug) {
  //     return <ErrorPage statusCode="404" />;
  //   }

  if (router.isFallback) {
    return <h2> Loading... </h2>;
  }

  const {
    author,
    title,
    subtitle,
    body,
    categories,
    publishedAt,
    mainImage,
    slug,
  } = post;

  const SEO = {
    title: `${title} | Rahmat Panji`,
    description: `${subtitle} | ${categories.map(c => c + ' ')}| Rahmat Panji`,
    canonical: `https://ikoawak.me/post/${slug}`,
    openGraph: {
      url: `https://ikoawak.me/post/${slug}`,
      title: `${title} | Rahmat Panji`,
      description: `${subtitle} | ${categories.map(c => c)}| Rahmat Panji`,
      type: 'article',
      article: {
        publishedTime: `${publishedAt}`,
        authors: [`${author}`],
        tags: [...categories],
      },
    },
    images: [
      {
        url: urlFor(mainImage).url(),
        width: 850,
        height: 650,
        alt: title,
      },
    ],
    site_name: 'ikoawak',
  };

  return (
    <>
      <NextSeo {...SEO} />
      <ProjectDetailStyled>
        <section className="post">
          <div className="meta">
            <div className="category">
              {categories?.map((category, index) => (
                <small
                  className={`category-text ${
                    index === categories.length - 1 && 'no-border'
                  }`}
                  key={category}
                >
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
          </div>

          <hr />

          <picture className="image">
            <img src={urlFor(mainImage).url()} alt={title} />
          </picture>

          {preview && <PreviewAlert />}

          <article className="body">
            <BlockContent blocks={body} />
          </article>
        </section>
      </ProjectDetailStyled>
    </>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const post: TPost = await getSinglePost(params.slug, preview);

  return { props: { post, preview }, revalidate: 1 };
}

export async function getStaticPaths() {
  // Get all slugs from projects and provide it to paths
  const posts: TPosts = await getFeaturedPosts();

  const paths = posts?.map(p => ({ params: { slug: p.slug } }));

  return { paths, fallback: true };
}

// Style
const ProjectDetailStyled = styled.section`
  .post {
    margin-bottom: 3rem;

    .title {
      padding-top: 0.25rem;

      h1 {
        font-size: 1.65rem;
        line-height: 2.25rem;
        letter-spacing: -0.01em;
      }
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
      img {
        width: 100%;
      }
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

  p {
    line-height: 1.75;
    font-size: 1rem;
  }

  small {
    font-size: 14px;
  }

  h2 {
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
  }
`;
