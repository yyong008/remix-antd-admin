import { ReactRouterApi } from "../../ReactRouterApi";
import { userInfoService } from "@/services/admin/userInfo";

export const userRouter = new ReactRouterApi();

userRouter.get("/user/info", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const data = await userInfoService.getUserInfo(args);
    return c.js(data!);
  } catch (error) {
    return c.error(error as Error);
  }
});

userRouter.get("/user/signin", (c) => {
  //
});
