import { ReactNode, FC, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Header from './Header';
import Footer from './Footer';

import Transition from 'components/Transition';

type LayoutProps = {
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  type?: string;
  author?: string;
  tag?: string;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = props => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const { children, ...customMeta } = props;

  const meta = {
    title: 'Rahmat Panji - Catatan Perjalanan',
    description: `Penulis - Tulisan dan ganjalan terhadap semua temuan dalam perjalanan kehidupan.`,
    type: 'website',
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://ikoawak.me${router.asPath}`}
        />
        <meta name="robots" content="follow, index" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <meta charSet="utf-8" />
        <link rel="canonical" href={`https://ikoawak.me${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Rahmat Panji" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rhmtpanji" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />

        {meta.author && (
          <meta property="article:author" content={meta.author} />
        )}
        {meta.tag && <meta property="article:tag" content={meta.tag} />}
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <Header />
      <Transition location={router.pathname}>
        <LayoutStyled className="container">{children}</LayoutStyled>
      </Transition>
      <Footer />
    </>
  );
};

const LayoutStyled = styled.div`
  min-height: 75vh;
  display: flex;
  flex-direction: column;
`;

export default Layout;
