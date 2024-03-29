/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />
import type packageJSON from '../package.json';

declare module 'js-export-excel';
declare module 'lax.js';

interface ImportMetaEnv {
  readonly SESSION_SECRET: string
  readonly DATABASE_URL: string
  readonly IS_VERCEL: boolean
  readonly NODE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  const __APP_INFO__: {
    pkg: typeof packageJSON;
    lastBuildTime: string;
  };
}

