import { ReactRouterApi } from "../../ReactRouterApi";
import { userInfoService } from "@/services/admin/userInfo";

export const userRouter = new ReactRouterApi();

userRouter.get("/user", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

userRouter.get("/user/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

userRouter.post("/user", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

userRouter.put("/user/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

userRouter.delete("/user", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

userRouter.delete("/user/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * userinfo
 */
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
userRouter.get("/user/signin", (c) => {
  //
});
