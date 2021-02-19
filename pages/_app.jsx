import Head from "next/head";
import SEO from "next-seo.config";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import Layout from "components/Layout";
import GlobalStyles from "styles/globalStyle";

import "styles/main.css";

function MyApp({ Component, pageProps, router }) {
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

export default MyApp;
