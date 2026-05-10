import { hc } from "hono/client";
import type { AppType } from "@workspace/api";
import { getApiUrl } from "~/utils/url";

export function getApiClient() {
  return hc<AppType>(getApiUrl(), {
    init: {
      credentials: "include",
    },
  });
}
