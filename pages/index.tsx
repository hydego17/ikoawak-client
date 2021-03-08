import { InferGetStaticPropsType } from 'next';
import BlockContent from '@sanity/block-content-to-react';
import styled from '@emotion/styled';

import { getHomePageContent } from 'lib/page';
import { getFeaturedPosts } from 'lib/post';

import SeoContainer from 'components/SeoContainer';
import { TPosts } from 'types/post';
import { THomePage } from 'types/page';

import Post from 'components/Post';

export default function Home({
  content,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SeoContainer>
        <HomeStyled>
          <section className="intro">
            <h1 className="page-title">{content.title}</h1>

            <article>
              <BlockContent blocks={content.description} />
            </article>
          </section>
          {/* {preview && <PreviewAlert />}
        {content} */}

          <h2>Latest posts</h2>
          <article className="projects-list">
            {posts.map(post => (
              <Post key={post.slug} post={post} />
            ))}
          </article>
        </HomeStyled>
      </SeoContainer>
    </>
  );
}

export const getStaticProps = async () => {
  const result: THomePage = await getHomePageContent();
  const posts: TPosts = await getFeaturedPosts();
  // Pass data to the page via props
  return {
    props: {
      content: result,
      posts,
    },
    revalidate: 1,
  };
};

const HomeStyled = styled.section`
  min-height: 100vh;

  .intro {
    margin-bottom: 4rem;
  }

  article {
    p {
      padding-bottom: 1rem;
    }
  }

  .projects-list {
    /* min-height: 30vh; */
  }

  h2 {
    font-size: clamp(1.45rem, 5vw, 1.6rem);
  }
`;
