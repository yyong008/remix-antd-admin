import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { requirePermission } from "~/api/middleware/rbac";
import { createProfileAccountDAL } from "~/dals/profile/ProfileAccountDAL";
import { createProfileLinkCategoryDAL } from "~/dals/profile/ProfileLinkCategoryDAL";
import { createProfileLinkDAL } from "~/dals/profile/ProfileLinkDAL";
import { createUserDAL } from "~/dals/system/user";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";
import { getD1Db } from "~/api/helpers/d1";

function rfjFromCatch(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return rfj(null, message);
}

export const profileRouter = new Hono<HonoEnv>();

profileRouter.get("/profile/account", requirePermission("profile:account:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const profileAccountDAL = createProfileAccountDAL(db);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const result = await profileAccountDAL.getById(userId);
    return rsj(result ?? {});
  } catch (error) {
    return rfjFromCatch(error);
  }
});

profileRouter.post("/profile/account", requirePermission("profile:account:read"), async () => {
  return rfj({}, "Unsupport", { status: 501 });
});

profileRouter.put("/profile/account", requirePermission("profile:account:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const userDAL = createUserDAL(db);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await userDAL.update({
      id: userId,
      avatar: dto.avatar,
    });
    return rsj(result);
  } catch (error) {
    return rfjFromCatch(error);
  }
});

profileRouter.delete("/profile/account", requirePermission("profile:account:read"), async () => {
  return rfj({}, "Unsupport", { status: 501 });
});

profileRouter.get(
  "/profile/link/category",
  requirePermission("profile:link-category:read", "profile:link:read"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const profileLinkCategoryDAL = createProfileLinkCategoryDAL(db);
      const profileLinkDAL = createProfileLinkDAL(db);
      const userId = c.get("userId");
      if (!userId) {
        return rfj({}, "No Authorization No User", { status: 401 });
      }
      const req = c.req.raw;
      const page = getSearchParamsPage(req);
      const pageSize = getSearchParamsPageSize(req);
      const total = await profileLinkCategoryDAL.getCountByUserId(userId);
      const list = await profileLinkCategoryDAL.getList({
        where: { userId },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: "desc" } as any,
      });
      const linkCounts = await profileLinkDAL.getLinkCountsByCategoryForUser(userId);
      const listWithCounts = list.map((row: { id: string }) => ({
        ...row,
        linkCount: linkCounts[row.id] ?? 0,
      }));
      return rsj({ total, list: listWithCounts });
    } catch (error) {
      return rfjFromCatch(error);
    }
  },
);

profileRouter.post(
  "/profile/link/category",
  requirePermission("profile:link-category:read", "profile:link:read"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const profileLinkCategoryDAL = createProfileLinkCategoryDAL(db);
      const userId = c.get("userId");
      if (!userId) {
        return rfj({}, "No Authorization No User", { status: 401 });
      }
      const dto = await c.req.json();
      const result = await profileLinkCategoryDAL.create({ ...dto, userId });
      return rsj(result);
    } catch (error) {
      return rfjFromCatch(error);
    }
  },
);

profileRouter.put(
  "/profile/link/category",
  requirePermission("profile:link-category:read", "profile:link:read"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const profileLinkCategoryDAL = createProfileLinkCategoryDAL(db);
      const dto = await c.req.json();
      const result = await profileLinkCategoryDAL.update(dto);
      return rsj(result);
    } catch (error) {
      return rfjFromCatch(error);
    }
  },
);

profileRouter.delete(
  "/profile/link/category",
  requirePermission("profile:link-category:read", "profile:link:read"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const profileLinkCategoryDAL = createProfileLinkCategoryDAL(db);
      const dto = await c.req.json();
      const result = await profileLinkCategoryDAL.deleteByIds(dto.ids ?? []);
      return rsj(result ?? {});
    } catch (error) {
      return rfjFromCatch(error);
    }
  },
);

profileRouter.get("/profile/link", requirePermission("profile:link:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const profileLinkDAL = createProfileLinkDAL(db);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const categoryId = (getSearchParams(req, "category") ?? "").trim();
    const total = await profileLinkDAL.getCount(userId, categoryId || undefined);
    const list = await profileLinkDAL.getList({
      where: {
        userId,
        ...(categoryId ? { categoryId } : {}),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return rsj({ total, list });
  } catch (error) {
    return rfjFromCatch(error);
  }
});

profileRouter.post("/profile/link", requirePermission("profile:link:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const profileLinkDAL = createProfileLinkDAL(db);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await profileLinkDAL.create({ ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfjFromCatch(error);
  }
});

profileRouter.put("/profile/link", requirePermission("profile:link:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const profileLinkDAL = createProfileLinkDAL(db);
    const dto = await c.req.json();
    if (!dto.id) {
      return rfj({}, "Invalid Link Id", { status: 400 });
    }
    const result = await profileLinkDAL.update(dto);
    return rsj(result);
  } catch (error) {
    return rfjFromCatch(error);
  }
});

profileRouter.delete("/profile/link", requirePermission("profile:link:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const profileLinkDAL = createProfileLinkDAL(db);
    const dto = await c.req.json();
    const result = await profileLinkDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfjFromCatch(error);
  }
});
