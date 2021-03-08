import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type SeoContainerProps = {
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  type?: string;
  author?: string;
  tag?: string;
};

const SeoContainer: FC<SeoContainerProps> = props => {
  const { ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: 'Rahmat Panji - Catatan Perjalanan',
    description: `Penulis - Tulisan dan ganjalan terhadap semua temuan dalam perjalanan kehidupan.`,
    type: 'website',
    ...customMeta,
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.description} />

        <meta name="robots" content="follow, index" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <link rel="canonical" href={`https://ikoawak.me${router.asPath}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Rahmat Panji" />
        <meta property="og:image" content={meta.image} />
        <meta
          property="og:url"
          content={`https://ikoawak.me${router.asPath}`}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rhmtpanji" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />

        {/* Article meta */}
        {meta.author && (
          <meta property="article:author" content={meta.author} />
        )}
        {meta.tag && <meta property="article:tag" content={meta.tag} />}
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
    </>
  );
};

export default SeoContainer;
