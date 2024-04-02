/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SESSION_SECRET: string
  readonly DATABASE_URL: string
  readonly IS_VERCEL: boolean
  readonly NODE_ENV: string
  readonly TINYMCE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
