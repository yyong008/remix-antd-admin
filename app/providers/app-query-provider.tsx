import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type QueryProviderProps = {
  children: React.ReactNode;
};

export function AppQueryProvider({ children }: QueryProviderProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
