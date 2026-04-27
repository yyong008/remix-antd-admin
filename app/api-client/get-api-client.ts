import { hc } from "hono/client";
import { AppType } from "~/api";
import { getBaseUrl } from "~/utils/url";

export function getApiClient() {
  return hc<AppType>(getBaseUrl());
}
