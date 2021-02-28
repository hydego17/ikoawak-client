import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';
import { urlFor, getSingleProject, getPaginatedProjects } from 'lib/api';

import { formatDate } from 'lib/date';
import { getSinglePost, getFeaturedPosts } from 'lib/post';
import { TPost, TPosts } from 'types/post';
import PreviewAlert from 'components/PreviewAlert';

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

  console.log(post);

  const { author, title, body, categories, publishedAt, mainImage } = post;

  return (
    <>
      <ProjectDetailStyled>
        <section className="post">
          <header className="title">
            <h1>{title} </h1>
          </header>
          <div className="meta">
            <small>{formatDate(publishedAt)}</small>
            <small>{author} </small>
          </div>

          <hr />

          <picture className="image">
            <img src={urlFor(mainImage).url()} alt={title} />
          </picture>

          {preview && <PreviewAlert />}

          <article className="body">
            <BlockContent blocks={body} />
          </article>

          <section className="category">
            <small>Category: </small>
            {categories.map(category => (
              <small key={category}>{category}</small>
            ))}
          </section>
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
  padding: 0 0.5rem;

  .post {
    margin-bottom: 3rem;

    .title {
      padding-bottom: 1rem;
    }

    .meta {
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
      margin-top: 1rem;
      padding: 1rem 0;

      p {
        line-height: 1.65;
        font-size: 1rem;
        padding: 0.5rem 0;
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
      color: var(--post-category);
      margin-top: 1.5rem;
    }
  }

  small {
    font-size: 14px;
  }

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
  }
`;
