import { Hono, Context } from "hono";
import { loginService } from "~/services/admin-auth/login";
import { refreshTokenTool } from "~/services/admin-auth/refresh";
import { registerService } from "~/services/admin-auth/register";

export const authRouter = new Hono();

authRouter.use(async (c: Context, next: Function) => {
  console.log("authRouter", c.req.url);
  await next();
});

authRouter.post("/login", async (c) => {
  try {
    const req = c.req.raw;
    const data = await loginService.loginAction(req);
    return c.json({
      data,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      code: 1,
      message: (error as Error).message ?? "登录失败",
    });
  }
});

authRouter.post("/register", async (c) => {
  try {
    const req = c.req.raw;
    const data = await registerService.register(req);
    return c.json({
      data,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "注册失败",
      code: 1,
    });
  }
});

authRouter.post("/refresh_token", async (c) => {
  try {
    const req = c.req.raw;
    const data = await refreshTokenTool.createTokens(req);
    return c.json({
      data,
      message: "success",
      code: 0,
    });
  } catch (error) {
      return c.json({
      data: null,
      message: (error as Error).message ?? "刷新失败",
      code: 1,
    });
  }
});
