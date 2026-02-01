import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { storageDAL } from "~/dals/tools/StorageDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const systemStorageRouter = new Hono<HonoEnv>();

systemStorageRouter.get("/storage", async (c) => {
	try {
		const req = c.req.raw;
		const page = getSearchParamsPage(req);
		const pageSize = getSearchParamsPageSize(req);
		const total = await storageDAL.getCount();
		const list = await storageDAL.getList({
			where: {},
			skip: (page - 1) * pageSize,
			take: pageSize,
			orderBy: { id: "desc" } as any,
		});
		return rsj({ total, list });
	} catch (error) {
		return rfj(error as Error);
	}
});

systemStorageRouter.get("/storage/:id", async (c) => {
	try {
		const id = Number(c.req.param("id"));
		if (!id) {
			return rfj({}, "Invalid Storage Id", { status: 400 });
		}
		const result = await storageDAL.getById(id);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});

systemStorageRouter.post("/storage", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await storageDAL.create(dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

systemStorageRouter.put("/storage", async (c) => {
	try {
		const dto = await c.req.json();
		if (!dto.id) {
			return rfj({}, "Invalid Storage Id", { status: 400 });
		}
		const result = await storageDAL.update(dto.id, dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

systemStorageRouter.delete("/storage", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await storageDAL.deleteByIds(dto.ids ?? []);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});
