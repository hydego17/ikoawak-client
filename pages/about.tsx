import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';
import styled from '@emotion/styled';

import { sanityImageUrl } from '@/lib/sanity';
import { getAboutPageContent } from '@/data/pages';
import type { InferNextProps } from '@/types/infer-next-props-type';

import SeoContainer from '@/components/SeoContainer';

export const getStaticProps = async () => {
  // Get about page content from server
  const aboutPageContent = await getAboutPageContent();

  // Pass data to the page via props
  return {
    props: {
      content: aboutPageContent,
    },
    revalidate: 60,
  };
};

export default function About({ content }: InferNextProps<typeof getStaticProps>) {
  const parsedImageUrl = sanityImageUrl(content.image).saturation(-100).url() || '';

  return (
    <>
      <SeoContainer
        title={`About – Rahmat Panji`}
        description={`${content.subtitle} | Rahmat Panji`}
        image={parsedImageUrl}
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
          <Image src={parsedImageUrl} alt="Rahmat Panji" layout="fill" />
        </figure>
        <small>
          <b>Selamat Membaca!</b>
        </small>
      </AboutStyled>
    </>
  );
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
