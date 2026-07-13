import * as profileAccount from "@workspace/database/repositories/profile/profile-account";
import * as profileLinkCategory from "@workspace/database/repositories/profile/profile-link-category";
import * as profileLink from "@workspace/database/repositories/profile/profile-link";
import * as user from "@workspace/database/repositories/system/user";
import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { requirePermission } from "../../middleware/rbac";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "../../utils/server";
import { rfj, rsj } from "../../utils/server/response-json";
import { getD1Db } from "../../helpers/d1";

function rfjFromCatch(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return rfj(null, message);
}

export const profileRouter = new Hono<HonoEnv>();

profileRouter.get("/profile/account", requirePermission("profile:account:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const result = await profileAccount.getById(db, userId);
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
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await user.update(db, {
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
      const userId = c.get("userId");
      if (!userId) {
        return rfj({}, "No Authorization No User", { status: 401 });
      }
      const req = c.req.raw;
      const page = getSearchParamsPage(req);
      const pageSize = getSearchParamsPageSize(req);
      const total = await profileLinkCategory.getCountByUserId(db, userId);
      const list = await profileLinkCategory.getList(db, {
        where: { userId },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: "desc" } as any,
      });
      const linkCounts = await profileLink.getLinkCountsByCategoryForUser(db, userId);
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
      const userId = c.get("userId");
      if (!userId) {
        return rfj({}, "No Authorization No User", { status: 401 });
      }
      const dto = await c.req.json();
      const result = await profileLinkCategory.create(db, { ...dto, userId });
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
      const dto = await c.req.json();
      const result = await profileLinkCategory.update(db, dto);
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
      const dto = await c.req.json();
      const result = await profileLinkCategory.deleteByIds(db, dto.ids ?? []);
      return rsj(result ?? {});
    } catch (error) {
      return rfjFromCatch(error);
    }
  },
);

profileRouter.get("/profile/link", requirePermission("profile:link:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const categoryId = (getSearchParams(req, "category") ?? "").trim();
    const total = await profileLink.getCount(db, userId, categoryId || undefined);
    const list = await profileLink.getList(db, {
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
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await profileLink.create(db, { ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfjFromCatch(error);
  }
});

profileRouter.put("/profile/link", requirePermission("profile:link:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    if (!dto.id) {
      return rfj({}, "Invalid Link Id", { status: 400 });
    }
    const result = await profileLink.update(db, dto);
    return rsj(result);
  } catch (error) {
    return rfjFromCatch(error);
  }
});

profileRouter.delete("/profile/link", requirePermission("profile:link:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await profileLink.deleteByIds(db, dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfjFromCatch(error);
  }
});
