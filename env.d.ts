/// <reference types="@remix-run/node" />
import type packageJSON from "../package.json";

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  /** Set to `"true"` to require Turnstile on login/signup; omit or `false` for local dev. */
  readonly VITE_TURNSTILE_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  const __APP_INFO__: {
    pkg: typeof packageJSON;
    lastBuildTime: string;
  };
}
