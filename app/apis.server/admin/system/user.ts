import {
  bcryptUtil,
  getSearchParams,
  getSearchParamsPage,
  getSearchParamsPageSize,
} from "~/utils/server";

import { Hono } from "hono";
import { joseJwt } from "~/libs/jose";
import { signInLog } from "~/dals/sign-in/SignInLogDAL";
import { userDAL } from "~/dals/system/UserDAL";
import { userInfoService } from "@/services/admin/userInfo";
import { userPermsDAL } from "~/dals/system/UserPermsDAL";

export const userRouter = new Hono();

userRouter.get("/user", async (c) => {
  try {
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const name = getSearchParams(req, "name");
    const total = await userDAL.getCount();
    const list = await userDAL.getList({
      page,
      pageSize,
      name: name ? name : undefined,
    });

    return c.json({
      data: {
        total,
        list,
      },
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

userRouter.get("/user/:id", async (c) => {
  try {
    const req = c.req.raw;
    const { userId } = await joseJwt.getTokenUserIdByArgs({ request: req });
    if (!userId) {
      return c.json({});
    }
    const menu = await userPermsDAL.getFlatMenuByUserId(userId!);
    const userInfo = await userDAL.getById(userId!);

    const result = {
      menu,
      userInfo,
    };
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

userRouter.post("/user", async (c) => {
  try {
    const req = c.req.raw;
    const args = await req.json();
    if (args.password) {
      args.password = bcryptUtil.hashPassword(args.password);
    }
    const result = await userDAL.create(args);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

userRouter.put("/user/:id", async (c) => {
  try {
    const args = await c.req.json();
    const result = await userDAL.update(args);
    return c.json(result);
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

userRouter.delete("/user", async (c) => {
  try {
    const req = c.req.raw;
    const dto = await req.json();
    const result = await userDAL.deleteByIds(dto.ids);
    return c.json({
      data: result ?? {},
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

// userRouter.delete("/user/:id", async (c) => {
//   try {
//   } catch (error) {
//     return c.jf(error as Error);
//   }
// });

userRouter.get("/user/info", async (c) => {
  try {
    const req = c.req.raw;
    const data = await userInfoService.getUserInfo(req);
    return c.json({
      data: data ?? {},
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 用户签到
 */
userRouter.post("/user/signin", async (c) => {
  try {
    const req = c.req.raw;
    const data = (await joseJwt.getTokenUserIdByArgs({ request: req })) as any;
    const result = await signInLog.create({
      userId: data.userId,
      signType: 1,
      signTime: new Date(),
    });
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});
