import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { changeLogDAL } from "~/dals/docs/ChangelogDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const docsRouter = new Hono<HonoEnv>();

docsRouter.get("/changelog", async (c) => {
	try {
		const req = c.req.raw;
		const page = getSearchParamsPage(req);
		const pageSize = getSearchParamsPageSize(req);
		const total = await changeLogDAL.getCount();
		const list = await changeLogDAL.getList({ page, pageSize });
		return rsj({ total, list });
	} catch (error) {
		return rfj(error as Error);
	}
});

docsRouter.get("/changelog/:id", async (c) => {
	try {
		const id = Number(c.req.param("id"));
		if (!id) {
			return rfj({}, "Invalid Changelog Id", { status: 400 });
		}
		const result = await changeLogDAL.getById(id);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});

docsRouter.post("/changelog", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const dto = await c.req.json();
		const result = await changeLogDAL.create({ ...dto, userId });
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

docsRouter.put("/changelog/:id", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const id = Number(c.req.param("id"));
		const dto = await c.req.json();
		const result = await changeLogDAL.update({ ...dto, id, userId });
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

docsRouter.delete("/changelog", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await changeLogDAL.deleteByIds(dto.ids ?? []);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});
