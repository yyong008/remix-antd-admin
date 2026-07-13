import * as changelog from "@workspace/database/repositories/docs/changelog";
import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { getSearchParamsPage, getSearchParamsPageSize } from "../../utils/server";
import { rfj, rsj } from "../../utils/server/response-json";
import { getD1Db } from "../../helpers/d1";

export const docsRouter = new Hono<HonoEnv>();

docsRouter.get("/changelog", async (c) => {
  try {
    const db = getD1Db(c);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await changelog.getCount(db);
    const list = await changelog.getList(db, { page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

docsRouter.get("/changelog/:id", async (c) => {
  try {
    const db = getD1Db(c);
    const id = c.req.param("id");
    if (!id) {
      return rfj({}, "Invalid Changelog Id", { status: 400 });
    }
    const result = await changelog.getById(db, id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

docsRouter.post("/changelog", async (c) => {
  try {
    const db = getD1Db(c);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await changelog.create(db, { ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

docsRouter.put("/changelog/:id", async (c) => {
  try {
    const db = getD1Db(c);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const id = Number(c.req.param("id"));
    const dto = await c.req.json();
    const result = await changelog.update(db, { ...dto, id, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

docsRouter.delete("/changelog", async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await changelog.deleteByIds(db, dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
