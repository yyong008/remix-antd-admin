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

/** Augments wrangler-generated `Cloudflare.Env` (worker-configuration.d.ts). */
declare namespace Cloudflare {
  interface Env {
    TURNSTILE_ENABLED?: string;
    TURNSTILE_SECRET_KEY?: string;
    NODE_ENV?: string;
    /** R2 bucket binding for uploads (wrangler `r2_buckets` → binding name `STORAGE`). */
    STORAGE?: R2Bucket;
  }
}

declare global {
  const __APP_INFO__: {
    pkg: typeof packageJSON;
    lastBuildTime: string;
  };
}
