import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import {
  bcryptUtil,
  getSearchParams,
  getSearchParamsPage,
  getSearchParamsPageSize,
} from "~/utils/server";
import { signInLog } from "~/dals/sign-in/SignInLogDAL";
import { userDAL } from "~/dals/system/UserDAL";
import { userPermsDAL } from "~/dals/system/UserPermsDAL";
import { rfj, rsj } from "~/utils/server/response-json";

export const userRouter = new Hono<HonoEnv>();

userRouter.get("/", async (c) => {
  try {
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const name = getSearchParams(req, "name");
    const total = await userDAL.getCount();
    const list = await userDAL.getList({
      page,
      pageSize,
      name: name ?? "",
    });

    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.get("/info", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const menu = await userPermsDAL.getFlatMenuByUserId(userId);
    const userInfo = await userDAL.getById(userId);
    return rsj({ menu, userInfo });
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.get("/:id", async (c) => {
  try {
    const userId = Number(c.req.param("id"));
    if (!userId) {
      return rfj({}, "Invalid User Id", { status: 400 });
    }
    const menu = await userPermsDAL.getFlatMenuByUserId(userId);
    const userInfo = await userDAL.getById(userId);
    return rsj({ menu, userInfo });
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.post("/", async (c) => {
  try {
    const dto = await c.req.json();
    if (dto.password) {
      dto.password = bcryptUtil.hashPassword(dto.password);
    }
    const result = await userDAL.create(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.put("/:id", async (c) => {
  try {
    const dto = await c.req.json();
    const id = Number(c.req.param("id"));
    const result = await userDAL.update({ ...dto, id });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.delete("/", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await userDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const result = await signInLog.create({
      userId,
      signType: 1,
      signTime: new Date(),
    });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});
