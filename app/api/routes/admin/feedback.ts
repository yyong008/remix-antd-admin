import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { feedbackDAL } from "~/dals/docs/FeedbackDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const feedbackRouter = new Hono<HonoEnv>();

feedbackRouter.get("/", async (c) => {
	try {
		const req = c.req.raw;
		const page = getSearchParamsPage(req);
		const pageSize = getSearchParamsPageSize(req);
		const total = await feedbackDAL.getCount();
		const list = await feedbackDAL.getList({ page, pageSize });
		return rsj({ total, list });
	} catch (error) {
		return rfj(error as Error);
	}
});

feedbackRouter.get("/:id", async (c) => {
	try {
		const id = Number(c.req.param("id"));
		if (!id) {
			return rfj({}, "Invalid Feedback Id", { status: 400 });
		}
		const result = await feedbackDAL.getById(id);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});

feedbackRouter.post("/", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const dto = await c.req.json();
		const result = await feedbackDAL.create({ ...dto, userId });
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

feedbackRouter.put("/:id", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const id = Number(c.req.param("id"));
		const dto = await c.req.json();
		const result = await feedbackDAL.update({ ...dto, id, userId });
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

feedbackRouter.delete("/", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await feedbackDAL.deleteByIds(dto.ids ?? []);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});
