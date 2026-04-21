import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "~/api/middleware/rbac";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { createSignInLogDAL } from "~/dals/sign-in/SignInLogDAL";
import { createUserDAL } from "~/dals/system/user";
import { createUserPermsDAL } from "~/dals/system/UserPermsDAL";
import { rfj, rsj } from "~/utils/server/response-json";
import { getD1Db } from "~/api/helpers/d1";

export const userRouter = new Hono<HonoEnv>();

userRouter.get("/", requirePermission("system:user:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const userDAL = createUserDAL(db);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const name = getSearchParams(req, "name");
    const total = await userDAL.getCount();
    const list = await userDAL.getList({
      page,
      pageSize,
      name: name ?? "",
    });

    return rsj({ total, list });
  } catch (error) {
    console.error("Error in GET /api/admin/system/user", error);
    return rfj(error as Error);
  }
});

userRouter.get("/info", async (c) => {
  try {
    const db = getD1Db(c);
    const userDAL = createUserDAL(db);
    const userPermsDAL = createUserPermsDAL(db);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const profile = await userDAL.getById(userId);
    /** Auth session exists but no `user` row yet — still return a stable shape for the client. */
    const userInfo =
      profile ??
      ({
        id: userId,
        avatar: null,
        email: "",
        name: c.get("username") ?? "",
        nickname: null,
        locale: null,
        theme: "light",
        phone: null,
        remark: null,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        department: null,
      } as NonNullable<Awaited<ReturnType<ReturnType<typeof createUserDAL>["getById"]>>>);
    const { menu, menuTree, permissions, roles } = await userPermsDAL.getSessionAccess(userId);
    return rsj({ menu, menuTree, permissions, roles, userInfo });
  } catch (error) {
    console.error("Error in GET /api/admin/system/user/info", error);
    return rfj(error as Error);
  }
});

userRouter.get("/:id", requirePermission("system:user:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const userDAL = createUserDAL(db);
    const userPermsDAL = createUserPermsDAL(db);
    const userId = c.req.param("id");
    if (!userId) {
      return rfj({}, "Invalid User Id", { status: 400 });
    }
    const { menu, menuTree, permissions, roles } = await userPermsDAL.getSessionAccess(userId);
    const userInfo = await userDAL.getById(userId);
    return rsj({ menu, menuTree, permissions, roles, userInfo });
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.post("/", requirePermission("system:user:create"), async (c) => {
  try {
    const db = getD1Db(c);
    const userDAL = createUserDAL(db);
    const dto = await c.req.json();
    const result = await userDAL.create(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.put("/:id", requirePermission("system:user:update"), async (c) => {
  try {
    const db = getD1Db(c);
    const userDAL = createUserDAL(db);
    const dto = await c.req.json();
    const id = c.req.param("id");
    const result = await userDAL.update({ ...dto, id });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.delete("/", requirePermission("system:user:delete"), async (c) => {
  try {
    const db = getD1Db(c);
    const userDAL = createUserDAL(db);
    const dto = await c.req.json();
    const ids = (dto.ids ?? []).map((id: any) => String(id));
    const result = await userDAL.deleteByIds(ids);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const db = getD1Db(c);
    const signInLogDAL = createSignInLogDAL(db);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const existing = await signInLogDAL.getLatestById(userId);
    if (existing) {
      return rsj({ alreadySigned: true, record: existing }, "今日已签到");
    }
    const result = await signInLogDAL.create({
      userId,
      signType: 1,
      signTime: new Date(),
    });
    return rsj(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("POST /api/admin/system/user/signin", error);
    return rfj({ detail: msg }, msg);
  }
});
