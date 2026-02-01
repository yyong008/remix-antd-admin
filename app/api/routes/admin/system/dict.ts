import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { dictDAL } from "~/dals/system/DictDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const dictRouter = new Hono<HonoEnv>();

dictRouter.get("/dict", async (c) => {
	try {
		const req = c.req.raw;
		const page = getSearchParamsPage(req);
		const pageSize = getSearchParamsPageSize(req);
		const total = await dictDAL.getCount();
		const list = await dictDAL.getList({ page, pageSize });
		return rsj({ total, list });
	} catch (error) {
		return rfj(error as Error);
	}
});

dictRouter.post("/dict", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await dictDAL.create(dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

dictRouter.put("/dict", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await dictDAL.update(dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

dictRouter.delete("/dict", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await dictDAL.deleteByIds(dto.ids ?? []);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});
