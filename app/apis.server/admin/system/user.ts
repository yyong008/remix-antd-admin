import {
  bcryptUtil,
  getSearchParams,
  getSearchParamsPage,
  getSearchParamsPageSize,
} from "~/utils/server";

import { ReactRouterApi } from "../../ReactRouterApi";
import { joseJwt } from "~/libs/jose";
import { signInLog } from "~/dals/sign-in/SignInLogDAL";
import { userDAL } from "~/dals/system/UserDAL";
import { userInfoService } from "@/services/admin/userInfo";
import { userPermsDAL } from "~/dals/system/UserPermsDAL";

export const userRouter = new ReactRouterApi();

userRouter.get("/user", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const page = getSearchParamsPage(args.request);
    const pageSize = getSearchParamsPageSize(args.request);
    const name = getSearchParams(args.request, "name");
    const total = await userDAL.getCount();
    const list = await userDAL.getList({
      page,
      pageSize,
      name: name ? name : undefined,
    });

    return c.js({
      total,
      list,
    });
  } catch (error) {
    return c.jf(error as Error);
  }
});

userRouter.get("/user/:id", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const { userId } = await joseJwt.getTokenUserIdByArgs(args);
    if (!userId) {
      return c.jf({});
    }
    const menu = await userPermsDAL.getFlatMenuByUserId(userId!);
    const userInfo = await userDAL.getById(userId!);

    const result = {
      menu,
      userInfo,
    };
    c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

userRouter.post("/user", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    if (dto.password) {
      dto.password = bcryptUtil.hashPassword(dto.password);
    }
    const result = await userDAL.create(dto);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

userRouter.put("/user/:id", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const result = await userDAL.update(dto);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

userRouter.delete("/user", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const result = await userDAL.deleteByIds(dto.ids);
    return c.js(result ?? {});
  } catch (error) {
    return c.jf(error as Error);
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
    const args = c.reactRouterArgs;
    const data = await userInfoService.getUserInfo(args);
    return c.js(data!);
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * 用户签到
 */
userRouter.post("/user/signin", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const data = (await joseJwt.getTokenUserIdByArgs(args)) as any;
    const result = await signInLog.create({
      userId: data.userId,
      signType: 1,
      signTime: new Date(),
    });
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});
