import { NextSeo } from 'next-seo';
import BlockContent from '@sanity/block-content-to-react';
import styled from '@emotion/styled';

import { urlFor } from 'lib/api';
import { getAboutPageContent } from 'lib/page';

export default function About({ content }) {
  
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

  console.log(content);

  return (
    <>
      <NextSeo {...SEO} />
      <AboutStyled>
        <header>
          <h1>{content.title}</h1>
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
  const result = await getAboutPageContent();
  // Pass data to the page via props
  return {
    props: {
      content: result,
    },
  };
}

const AboutStyled = styled.section`
  min-height: 100vh;

  header {
    h1 {
      font-size: clamp(1.75rem, 2.5vw, 2rem);
      padding-bottom: 0.5rem;
    }
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
