import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import 'styles/main.css';
import GlobalStyles from 'styles/globalStyle';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <GlobalStyles />
        <Component {...pageProps} key={router.route} />
      </ThemeProvider>
    </>
  );
}
