import { hc } from "hono/client";
import { AppType } from "~/api";

export function getApiClient() {
  return hc<AppType>(import.meta.env.VITE_API_URL);
}
