/**
 * Local seed: which **top-level menu keys** each role receives (entire subtree included).
 *
 * - **superadmin** (`LOCAL_ROLE_IDS.superadmin`): all menus in `menuSeeds` — see `rbac/sql/generate.ts`, not here.
 * - **admin**: business modules + **System** (user/role/menu/dept/dict/config/monitor… + button permissions).
 * - **user**: minimal portal (dashboard, profile, about).
 *
 * Edit the sets below, then `pnpm db:generate:seed-sql` (regenerates `rbac/sql/seed.sql`).
 * (Equivalent: `pnpm -F @workspace/seed run generate:seed-sql`.)
 */
export const ADMIN_MENU_ROOT_KEYS = new Set([
  "dashboard",
  "ai",
  "news",
  "blog",
  "profile",
  "tools",
  "about",
  "system",
  "docs",
]);

export const USER_MENU_ROOT_KEYS = new Set(["dashboard", "profile", "about"]);
