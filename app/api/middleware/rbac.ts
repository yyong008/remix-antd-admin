import { createMiddleware } from "hono/factory";

import type { HonoEnv } from "../types";
import { getD1Db } from "~/api/helpers/d1";
import { createUserPermsDAL } from "~/dals/system/UserPermsDAL";
import { fail } from "~/utils/response";

/** Loads `sys_menu.permission` codes for the current user into `c.var.permissions`. */
export const rbacContextMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const userId = c.get("userId");
  if (!userId) {
    await next();
    return;
  }
  const db = getD1Db(c);
  const permsDAL = createUserPermsDAL(db);
  const permissions = await permsDAL.getUserPerms(userId);
  c.set("permissions", permissions);
  await next();
});

/**
 * Requires at least one of the given permission codes (OR). Use after `authMiddleware` and `rbacContextMiddleware`.
 */
export function requirePermission(...codes: [string, ...string[]]) {
  return createMiddleware<HonoEnv>(async (c, next) => {
    const permissions = c.get("permissions") ?? [];
    const ok = codes.some((code) => permissions.includes(code));
    if (!ok) {
      return c.json(fail("Forbidden", 403), 403);
    }
    await next();
  });
}
