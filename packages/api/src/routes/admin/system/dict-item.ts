import * as dictItem from "@workspace/database/repositories/system/dict-item";
import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "../../../middleware/rbac";
import { getSearchParamsPage, getSearchParamsPageSize } from "../../../utils/server";
import { rfj, rsj } from "../../../utils/server/response-json";
import { getD1Db } from "../../../helpers/d1";

export const dictItemRouter = new Hono<HonoEnv>();

dictItemRouter.get("/dict-item/:dictionaryId", requirePermission("system:dict:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const dictionaryId = c.req.param("dictionaryId");
    if (!dictionaryId) {
      return rfj({}, "Invalid Dictionary Id", { status: 400 });
    }
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await dictItem.getCount(db, dictionaryId);
    const list = await dictItem.getList(db, {
      dictionary_id: dictionaryId,
      page,
      pageSize,
    });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

dictItemRouter.post(
  "/dict-item/:dictionaryId",
  requirePermission("system:dict:create"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const dictionaryId = c.req.param("dictionaryId");
      if (!dictionaryId) {
        return rfj({}, "Invalid Dictionary Id", { status: 400 });
      }
      const dto = await c.req.json();
      const result = await dictItem.create(db, {
        ...dto,
        dictionary_id: dictionaryId,
      });
      return rsj(result);
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

dictItemRouter.put(
  "/dict-item/:dictionaryId",
  requirePermission("system:dict:update"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const dictionaryId = c.req.param("dictionaryId");
      if (!dictionaryId) {
        return rfj({}, "Invalid Dictionary Id", { status: 400 });
      }
      const dto = await c.req.json();
      const result = await dictItem.update(db, {
        ...dto,
        dictionary_id: dictionaryId,
      });
      return rsj(result);
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

dictItemRouter.delete(
  "/dict-item/:dictionaryId",
  requirePermission("system:dict:delete"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const dictionaryId = c.req.param("dictionaryId");
      if (!dictionaryId) {
        return rfj({}, "Invalid Dictionary Id", { status: 400 });
      }
      const dto = await c.req.json();
      const result = await dictItem.deleteByIds(db, dto.ids ?? []);
      return rsj(result ?? {});
    } catch (error) {
      return rfj(error as Error);
    }
  },
);
