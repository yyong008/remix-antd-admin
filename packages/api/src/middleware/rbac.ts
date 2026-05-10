import { createMiddleware } from "hono/factory";

import type { HonoEnv } from "../types";
import { getD1Db } from "../helpers/d1";
import { createUserPermsDAL } from "@workspace/database/dals/system/UserPermsDAL";
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

export function requirePermission(...codes: [string, ...string[]]) {
  return createMiddleware<HonoEnv>(async (c, next) => {
    const permissions = c.get("permissions") ?? [];
    const ok = codes.some((code) => permissions.includes(code));
    if (!ok) {
      return c.json({ code: 1, message: "fail", data: {} }, 403);
    }
    await next();
  });
}
