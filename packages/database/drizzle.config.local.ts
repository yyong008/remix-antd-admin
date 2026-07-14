import path from "node:path";
import { defineConfig } from "drizzle-kit";
import { existsSync, readdirSync } from "node:fs";

const D1_DIR = path.join(
  "../../.wrangler/apps/api/",
  ".wrangler/state/v3/d1/miniflare-D1DatabaseObject",
);

/** Miniflare keeps `metadata.sqlite` in the same folder; that file is not the D1 app database. */
const isD1UserDbFile = (name: string) => name.endsWith(".sqlite") && name !== "metadata.sqlite";

export const getD1LocalUrl = (): string => {
  if (!existsSync(D1_DIR)) {
    console.warn(
      "[drizzle] Local D1 dir missing. Run `pnpm dev` or `pnpm db:migrate:local` once so Wrangler creates `.wrangler/state/...`, or set DRIZZLE_MIGRATE_URL.",
    );
    return "";
  }

  const candidates = readdirSync(D1_DIR).filter(isD1UserDbFile).sort();
  const sqliteFile = candidates[0];
  if (!sqliteFile) {
    console.warn(
      "[drizzle] No D1 `*.sqlite` found (only internal metadata?). Run `pnpm dev` / `pnpm db:migrate:local` once, or set DRIZZLE_MIGRATE_URL=file:./path/to.db",
    );
  }
  return sqliteFile ? `file:${path.join(D1_DIR, sqliteFile)}` : "";
};

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./src/migrations",
  dialect: "sqlite",
  dbCredentials: {
    /** Prefer explicit file URL; do not reuse a non-SQLite `DATABASE_URL` here. */
    url: getD1LocalUrl(),
  },
});
