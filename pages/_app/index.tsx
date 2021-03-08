import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import Layout from 'components/Layout';

import 'styles/main.css';
import GlobalStyles from 'styles/globalStyle';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} key={router.route} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
