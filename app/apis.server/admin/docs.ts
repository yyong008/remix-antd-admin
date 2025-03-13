import { Context, Hono } from "hono";
import { z } from "zod";
import { changelogDAL } from "~/dals/docs/ChangelogDAL";
import { feedBackDAL } from "~/dals/docs/FeedbackDAL";
import { joseJwt } from "~/libs/jose";
import { changelogSchema } from "~/schemas/docs";
import { urlSearchParams } from "~/utils/server/search";
import { zValidator } from "@hono/zod-validator";
import { permission } from "~/apis.server/hono/middleware/permission";
import { docsPermissions } from "~/constants/permission";

export const docsRouter = new Hono();

///////////////////////////////////////// docs changelog /////////////////////////////////////////////////////////////////
docsRouter.get(
  "/changelog/:id",
  zValidator("param", z.object({ id: z.number() })),
  permission(docsPermissions.changelog.READ),
  async (c) => {
    try {
      const id = Number(c.req.param("id"));
      const result = await changelogDAL.getById(id);
      return c.json({
        data: result ?? {},
        message: "success",
        code: 0,
      });
    } catch (error) {
      return c.json({
        data: null,
        message: (error as Error).message ?? "获取失败",
        code: 1,
      });
    }
  },
);

docsRouter.get(
  "/changelog",
  zValidator("query", changelogSchema.list),
  permission(docsPermissions.changelog.READ_LIST),
  async (c: Context) => {
    try {
      const query = c.req.queries();
      const page = Number(query.page ?? 1);
      const pageSize = Number(query.pageSize ?? 10);
      const userId = c.get("userId");
      const params = {
        page,
        pageSize,
        userId: userId,
      };
      const list = await changelogDAL.getList(params);
      const total = await changelogDAL.getCountByUserId(userId);
      const data = {
        list,
        total,
      };
      return c.json({
        data,
        message: "success",
        code: 0,
      });
    } catch (error) {
      return c.json({
        data: null,
        message: (error as Error).message ?? "获取失败",
        code: 1,
      });
    }
  },
);

docsRouter.post(
  "/changelog",
  zValidator("json", changelogSchema.create),
  permission(docsPermissions.changelog.CREATE),
  async (c: Context) => {
    try {
      const dto = await c.req.json();
      const userId = c.get("userId");
      const data = {
        ...dto,
        userId,
      };
      const result = await changelogDAL.create(data);
      return c.json({
        data: result,
        message: "success",
        code: 0,
      });
    } catch (error) {
      return c.json({
        data: null,
        message: (error as Error).message ?? "获取失败",
        code: 1,
      });
    }
  },
);

docsRouter.put(
  "/changelog/:id",
  zValidator("json", changelogSchema.update),
  permission(docsPermissions.changelog.UPDATE),
  async (c: Context) => {
    try {
      const dto = await c.req.json();
      const userId = c.get("userId");
      const data = {
        ...dto,
        userId
      };

      const result = await changelogDAL.update(data);
      return c.json({
        data: result,
        message: "success",
        code: 0,
      });
    } catch (error) {
      return c.json({
        data: null,
        message: (error as Error).message ?? "获取失败",
        code: 1,
      });
    }
  },
);

docsRouter.delete(
  "/changelog",
  zValidator("json", z.object({ ids: z.array(z.number()) })),
  permission(docsPermissions.changelog.DELETE),
  async (c) => {
    try {
      const { ids } = await c.req.json();
      const result = await changelogDAL.deleteByIds(ids);
      return c.json({
        data: result,
        message: "success",
        code: 0,
      });
    } catch (error) {
      return c.json({
        data: null,
        message: (error as Error).message ?? "获取失败",
        code: 1,
      });
    }
  },
);

docsRouter.delete(
  "/changelog/:id",
  zValidator("param", z.object({ id: z.number() })),
  permission(docsPermissions.changelog.DELETE),
  async (c) => {
    try {
      const id = Number(c.req.param("id"));
      const result = await changelogDAL.deleteByIds([id]);
      return c.json(result);
    } catch (error) {
      return c.json({
        data: null,
        message: (error as Error).message ?? "获取失败",
        code: 1,
      });
    }
  },
);

///////////////////////////////////////// docs feedback /////////////////////////////////////////////////////////////////

docsRouter.get(
  "/feedback/:id",
  permission(docsPermissions.feedback.READ),
  async (c) => {
    try {
      const id = Number(c.req.param("id"));
      const result = await feedBackDAL.getById(id);
      return c.json(result);
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

docsRouter.get("/feedback", async (c) => {
  try {
    const req = c.req.raw;
    const page = urlSearchParams.getPage(req);
    const pageSize = urlSearchParams.getPageSize(req);
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });

    const data = {
      page,
      pageSize,
      userId: payload.userId,
    };

    const total = await feedBackDAL.getCount();
    const list = await feedBackDAL.getList(data);
    return c.json({
      data: {
        list,
        total,
      },
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

docsRouter.post("/feedback", async (c) => {
  try {
    const req = c.req.raw;
    const dto = await req.json();
    const pyload = await joseJwt.getTokenUserIdByArgs({ request: req });

    const data = {
      ...dto,
      userId: pyload.userId,
    };
    const result = await feedBackDAL.create(data);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

docsRouter.put("/feedback/:id", async (c) => {
  try {
    const req = c.req.raw;
    const dto = await req.json();
    const pyload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const data = {
      ...dto,
      userId: pyload.userId,
    };
    const result = await feedBackDAL.update(data);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

docsRouter.delete("/feedback", async (c) => {
  try {
    const req = c.req.raw;
    const { ids } = await req.json();

    const result = await feedBackDAL.deleteByIds(ids);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

docsRouter.delete("/feedback/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const result = await feedBackDAL.deleteByIds([id]);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});
