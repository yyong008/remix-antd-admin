import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { dictItemDAL } from "~/dals/system/DictItemDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const dictItemRouter = new Hono<HonoEnv>();

dictItemRouter.get("/dict-item/:dictionaryId", async (c) => {
  try {
    const dictionaryId = Number(c.req.param("dictionaryId"));
    if (!dictionaryId) {
      return rfj({}, "Invalid Dictionary Id", { status: 400 });
    }
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await dictItemDAL.getCount(dictionaryId);
    const list = await dictItemDAL.getList({
      dictionary_id: dictionaryId,
      page,
      pageSize,
    });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

dictItemRouter.post("/dict-item/:dictionaryId", async (c) => {
  try {
    const dictionaryId = Number(c.req.param("dictionaryId"));
    if (!dictionaryId) {
      return rfj({}, "Invalid Dictionary Id", { status: 400 });
    }
    const dto = await c.req.json();
    const result = await dictItemDAL.create({
      ...dto,
      dictionary_id: dictionaryId,
    });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

dictItemRouter.put("/dict-item/:dictionaryId", async (c) => {
  try {
    const dictionaryId = Number(c.req.param("dictionaryId"));
    if (!dictionaryId) {
      return rfj({}, "Invalid Dictionary Id", { status: 400 });
    }
    const dto = await c.req.json();
    const result = await dictItemDAL.update({
      ...dto,
      dictionary_id: dictionaryId,
    });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

dictItemRouter.delete("/dict-item/:dictionaryId", async (c) => {
  try {
    const dictionaryId = Number(c.req.param("dictionaryId"));
    if (!dictionaryId) {
      return rfj({}, "Invalid Dictionary Id", { status: 400 });
    }
    const dto = await c.req.json();
    const result = await dictItemDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
