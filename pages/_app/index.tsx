import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import Layout from 'components/Layout';

import 'styles/main.css';
import GlobalStyles from 'styles/globals';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
