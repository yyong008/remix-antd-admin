import {
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}

let clientQueryClientSingleton: QueryClient;
export function getQueryClient() {
  if (typeof window === "undefined") {
    return createQueryClient();
  }

  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = createQueryClient();
  }

  return clientQueryClientSingleton;
}

export function AppQueryProvider({ children }: { children: React.ReactNode }) {
  const client = getQueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
