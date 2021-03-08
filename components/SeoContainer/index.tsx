import { FC, ReactNode } from 'react';
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
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://ikoawak.me${router.asPath}`}
        />
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
    </>
  );
};

export default SeoContainer;
