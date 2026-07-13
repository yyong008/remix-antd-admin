/// <reference types="@cloudflare/workers-types" />

// Runtime bindings exposed by the Cloudflare Worker (see apps/api/wrangler.jsonc).
// Declared via global augmentation so bare `Env` and `c.env.*` both resolve.
declare global {
  namespace Cloudflare {
    interface Env {
      DB: D1Database;
      DEMO_MODE?: string;
    }
  }
}

// Per-request variables populated by middleware (authMiddleware, rbacContextMiddleware, etc.).
export type HonoVariables = {
  userId: string;
  username: string | null;
  permissions: string[];
};

export type HonoEnv = {
  Bindings: Cloudflare.Env;
  Variables: HonoVariables;
};
