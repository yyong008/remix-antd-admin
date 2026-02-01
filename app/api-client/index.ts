import { createApiClient } from "./client";

export { AppQueryProvider } from "./query-provider";

export function getApiClient() {
  return createApiClient({
    baseUrl: "/",
    getToken: () => {
      if (typeof window === "undefined") return null;
      return localStorage.getItem("token");
    },
  });
}
