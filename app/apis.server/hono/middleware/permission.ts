import { Context } from "hono";
import { userPermsDAL } from "~/dals/system/UserPermsDAL";

export function permission(permission: string) {
  return async (c: Context, next: Function) => {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({
        message: "Unauthorized",
        code: 1,
        data: {},
      }, 401);
    }
    // 使用 id 用户角色
    const userPerms = await userPermsDAL.getUserPerms(userId);
    // 使用 角色 菜单权限
    if (!userPerms.includes(permission)) {
      return c.json({
        message: "No Permission",
        code: 1,
        data: {},
      });
    }
    await next();
  };
}