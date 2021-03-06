import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import BlockContent from '@sanity/block-content-to-react';
import styled from '@emotion/styled';

import { urlFor } from 'lib/api';
import { getAboutPageContent } from 'lib/page';
import { TAboutPage } from 'types/page';

export default function About({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const SEO = {
    title: `${content.title} – Rahmat Panji`,
    description: `${content.title} | Rahmat Panji`,
    canonical: 'https://ikoawak.me/about',
    openGraph: {
      title: `${content.title} – Rahmat Panji`,
      url: 'https://ikoawak.me/about',
      description: `${content.title} | Rahmat Panji`,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
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
