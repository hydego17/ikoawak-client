import { InferGetStaticPropsType } from 'next';
import BlockContent from '@sanity/block-content-to-react';
import styled from '@emotion/styled';
import Image from 'next/image';

import { urlFor } from 'lib/api';
import { getAboutPageContent } from 'lib/page';
import { TAboutPage } from 'types/page';

import SeoContainer from 'components/SeoContainer';

export default function About({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SeoContainer
        title={`About – Rahmat Panji`}
        description={`${content.subtitle} | Rahmat Panji`}
        image={urlFor(content.image).saturation(-100).url()}
        type="Website"
      />
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
          <Image
            src={urlFor(content.image).saturation(-100).url()}
            alt="Rahmat Panji"
            layout="fill"
          />
        </figure>
        <small>
          <b>Selamat Membaca!</b>
        </small>
      </AboutStyled>
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
    position: relative;
    width: 100%;
    min-height: 225px;
    height: calc(100px + 25vw);
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
`;
