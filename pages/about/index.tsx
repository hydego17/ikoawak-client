import { InferGetStaticPropsType } from 'next';
import BlockContent from '@sanity/block-content-to-react';
import styled from '@emotion/styled';

import { urlFor } from 'lib/api';
import { getAboutPageContent } from 'lib/page';
import Layout from 'components/Layout';
import { TAboutPage } from 'types/page';

export default function About({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Layout
        title={`About – Rahmat Panji`}
        description={`${content.subtitle} | Rahmat Panji`}
        image={urlFor(content.image).url()}
        type="Website"
      >
        <AboutStyled>
          <header>
            <h1 className="page-title">{content.title}</h1>
            <p>{content.subtitle}</p>
          </header>
          <hr />

          <article>
            <BlockContent blocks={content.description} />
          </article>

          <figure>
            <img
              src={urlFor(content.image).width(150).height(150).url()}
              alt="me"
            />
            <p>Selamat Membaca!</p>
          </figure>
        </AboutStyled>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const result: TAboutPage = await getAboutPageContent();
  // Pass data to the page via props
  return {
    props: {
      content: result,
    },
    revalidate: 1,
  };
}

const AboutStyled = styled.section`
  min-height: 100vh;

  header {
    padding-bottom: 1rem;
  }

  article {
    p {
      padding-bottom: 1rem;
    }
  }

  figure {
    /* padding: 1rem; */
    margin-top: 2rem;

    p {
      margin-top: 2rem;
    }
  }
`;
