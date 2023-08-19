import '@/styles/globals.css';
import '@/styles/nprogress.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import { ReactQueryProvider } from '@/lib/react-query-client';
import { DayjsProvider } from '@/lib/dayjs';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import Layout from '@/components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
      <DayjsProvider />

      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <TailwindIndicator />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
