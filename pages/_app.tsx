import '@/styles/main.css';
import '@/styles/nprogress.css';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import { ReactQueryProvider } from '@/providers';
import Layout from '@/components/Layout';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
      <ThemeProvider defaultTheme="system">
        <Layout>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
