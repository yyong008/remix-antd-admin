import * as signInLog from "@workspace/database/repositories/sign-in/sign-in-log";
import * as signIn from "@workspace/database/repositories/sign-in/sign-in";
import * as user from "@workspace/database/repositories/system/user";
import * as userPerms from "@workspace/database/repositories/system/user-perms";
import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "../../../middleware/rbac";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "../../../utils/server";
import { rfj, rsj } from "../../../utils/server/response-json";
import { getD1Db } from "../../../helpers/d1";

export const userRouter = new Hono<HonoEnv>();

userRouter.get("/", requirePermission("system:user:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const name = getSearchParams(req, "name");
    const total = await user.getCount(db);
    const list = await user.getList(db, {
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
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const profile = await user.getById(db, userId);
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
      } as NonNullable<Awaited<ReturnType<typeof user.getById>>>);
    const { menu, menuTree, permissions, roles } = await userPerms.getSessionAccess(db, userId);
    return rsj({ menu, menuTree, permissions, roles, userInfo });
  } catch (error) {
    console.error("Error in GET /api/admin/system/user/info", error);
    return rfj(error as Error);
  }
});

userRouter.get("/:id", requirePermission("system:user:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const userId = c.req.param("id");
    if (!userId) {
      return rfj({}, "Invalid User Id", { status: 400 });
    }
    const { menu, menuTree, permissions, roles } = await userPerms.getSessionAccess(db, userId);
    const userInfo = await user.getById(db, userId);
    return rsj({ menu, menuTree, permissions, roles, userInfo });
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.post("/", requirePermission("system:user:create"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await user.create(db, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.put("/:id", requirePermission("system:user:update"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const id = c.req.param("id");
    const result = await user.update(db, { ...dto, id });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.delete("/", requirePermission("system:user:delete"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const ids = (dto.ids ?? []).map((id: any) => String(id));
    const result = await user.deleteByIds(db, ids);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const db = getD1Db(c);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const existing = await signInLog.getLatestById(db, userId);
    if (existing) {
      return rsj({ alreadySigned: true, record: existing }, "今日已签到");
    }
    const result = await signInLog.create(db, {
      userId,
      signType: 1,
      signTime: new Date(),
    });

    const userSign = await signIn.getUserSignById(db, userId);
    const yesterdaySign = await signIn.getYesterdaySignLog(db, userId);

    if (userSign) {
      const newContinuity = yesterdaySign
        ? userSign.continuitySignedNums + 1
        : 1;
      await signIn.updateUserSign(db, userId, {
        signedNums: userSign.signedNums + 1,
        continuitySignedNums: newContinuity,
      });
    } else {
      await signIn.createUserSign(db, userId);
    }

    return rsj(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("POST /api/admin/system/user/signin", error);
    return rfj({ detail: msg }, msg);
  }
});
