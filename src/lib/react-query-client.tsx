import React from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';

interface ReactQueryProviderProps {
  dehydratedState: unknown;
  children: React.ReactNode;
}

export default function ReactQueryProvider({ children, dehydratedState }: ReactQueryProviderProps) {
  // Create global queryClient instance
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000, // 30 seconds
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  );
}
