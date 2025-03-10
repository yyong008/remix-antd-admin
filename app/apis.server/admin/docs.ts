import { Context, Hono } from "hono";
import { changelogDAL } from "~/dals/docs/ChangelogDAL";
import { feedBackDAL } from "~/dals/docs/FeedbackDAL";
import { joseJwt } from "~/libs/jose";
import { urlSearchParams } from "~/utils/server/search";

export const docsRouter = new Hono();

///////////////////////////////////////// docs changelog /////////////////////////////////////////////////////////////////

docsRouter.get("/changelog/:id", async (c) => {
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
});

docsRouter.get("/changelog", async (c: Context) => {
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
    const result = await changelogDAL.getList(data);
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

docsRouter.post("/changelog", async (c) => {
  try {
    const req = c.req.raw;
    const dto = await req.json();
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const data = {
      ...dto,
      userId: payload.userId,
    };
    const result = await changelogDAL.create(data);
    return c.json(result);
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

docsRouter.put("/changelog/:id", async (c) => {
  try {
    const req = c.req.raw;
    const dto = await req.json();
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const data = {
      ...dto,
      userId: payload.userId,
    };

    const result = await changelogDAL.update(data);
    return c.json(result);
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

docsRouter.delete("/changelog", async (c) => {
  try {
    const req = c.req.raw;
    const { ids } = await req.json();
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
});

docsRouter.delete("/changelog/:id", async (c) => {
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
});

///////////////////////////////////////// docs feedback /////////////////////////////////////////////////////////////////

docsRouter.get("/feedback/:id", async (c) => {
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
      list,
      total,
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
    return c.json(result);
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
