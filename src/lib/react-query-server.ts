import { dehydrate, QueryClient, type FetchQueryOptions } from '@tanstack/react-query';

export const getServerQueryClient = () => new QueryClient();

export async function prefetchQueries(fetchPromises: FetchQueryOptions[]) {
  const serverQueryClient = getServerQueryClient();

  if (!!fetchPromises.length) {
    await Promise.all([
      ...fetchPromises.map((p) => {
        return serverQueryClient.prefetchQuery(p);
      }),
    ]);
  }

  const dehydratedState = dehydrate(serverQueryClient);

  return dehydratedState;
}
