import { storageCommonConfig } from "../common/storage";

export const storageClientConfig = {
  ...storageCommonConfig,
  /** Prefer same-origin URLs from the API (`/api/storage/object?key=…`) when rendering stored files. */
  publicBaseUrl: typeof window !== "undefined" ? window.location.origin : "",
};
