import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { roleDAL } from "~/dals/system/RoleDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const roleRouter = new Hono<HonoEnv>();

roleRouter.get("/role", async (c) => {
	try {
		const req = c.req.raw;
		const page = getSearchParamsPage(req);
		const pageSize = getSearchParamsPageSize(req);
		const total = await roleDAL.getCount();
		const list = await roleDAL.getList({ page, pageSize });
		return rsj({ total, list });
	} catch (error) {
		return rfj(error as Error);
	}
});

roleRouter.post("/role", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await roleDAL.create(dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

roleRouter.put("/role", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await roleDAL.update(dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

roleRouter.delete("/role", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await roleDAL.deleteByIds(dto.ids ?? []);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});
