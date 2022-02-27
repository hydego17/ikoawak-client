import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * Default domain url for this app for SEO url.
 *
 * @note don't user `CLIENT_URL` or `VERCEL_URL` from process.env
 * as we want crawler to find only this url.
 */
const DOMAIN = 'https://ikoawak.me';

type SeoContainerProps = {
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  type?: string;
  author?: string;
  tag?: string;
};

/**
 * Component to display SEO related tags.
 * It will be the default for all pages.
 */
export default function SeoContainer(props: SeoContainerProps) {
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
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta name="robots" content="follow, index" />
        <link rel="canonical" href={`${DOMAIN}${router.asPath}`} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Rahmat Panji" />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={`${DOMAIN}${router.asPath}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rhmtpanji" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />

        {/* Article meta */}
        {meta.author && <meta property="article:author" content={meta.author} />}
        {meta.tag && <meta property="article:tag" content={meta.tag} />}
        {meta.date && <meta property="article:published_time" content={meta.date} />}
      </Head>
    </>
  );
}
