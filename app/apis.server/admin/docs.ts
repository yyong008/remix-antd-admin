import { ReactRouterApi } from "../ReactRouterApi";
import { changelogDAL } from "~/dals/docs/ChangelogDAL";
import { feedBackDAL } from "~/dals/docs/FeedbackDAL";
import { joseJwt } from "~/libs/jose";
import { urlSearchParams } from "~/utils/server/search";

export const docsRouter = new ReactRouterApi();

///////////////////////////////////////// docs changelog /////////////////////////////////////////////////////////////////

docsRouter.get("/changelog/:id", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const id = Number(args.params.id);
    const result = await changelogDAL.getById(id);
    return c.js(result ?? {});
  } catch (error) {
    return c.jf(error as Error);
  }
});

docsRouter.get("/changelog", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      page,
      pageSize,
      userId: payload.userId,
    };
    const result = await changelogDAL.getList(data);
    return result;
  } catch (error) {
    return c.jf(error as Error);
  }
});

docsRouter.post("/changelog", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: payload.userId,
    };
    const result = await changelogDAL.create(data);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

docsRouter.put("/changelog/:id", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: payload.userId,
    };

    const result = await changelogDAL.update(data);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

docsRouter.delete("/changelog", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const { ids } = await args.request.json();
    const result = await changelogDAL.deleteByIds(ids);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

docsRouter.delete("/changelog/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

///////////////////////////////////////// docs feedback /////////////////////////////////////////////////////////////////

docsRouter.get("/feedback/:id", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const id = Number(args.params.id);
    const result = await feedBackDAL.getById(id);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

docsRouter.get("/feedback", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);
    const payload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      page,
      pageSize,
      userId: payload.userId,
    };

    const total = await feedBackDAL.getCount();
    const list = await feedBackDAL.getList(data);
    return c.js({
      list,
      total,
    });
  } catch (error) {
    return c.jf(error as Error);
  }
});

docsRouter.post("/feedback", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const pyload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      ...dto,
      userId: pyload.userId,
    };
    const result = await feedBackDAL.create(data);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

docsRouter.put("/feedback/:id", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const pyload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: pyload.userId,
    };
    const result = await feedBackDAL.update(data);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

docsRouter.delete("/feedback", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const { ids } = await args.request.json();

    const result = await feedBackDAL.deleteByIds(ids);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

docsRouter.delete("/feedback/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});
