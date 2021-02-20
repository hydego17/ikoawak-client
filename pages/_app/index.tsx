import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';

import SEO from '../../next-seo.config';
import Layout from 'components/Layout';

import 'styles/main.css';
import GlobalStyles from 'styles/globalStyle';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <meta charSet="utf-8" />
      </Head>
      <ThemeProvider>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} key={router.route} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
