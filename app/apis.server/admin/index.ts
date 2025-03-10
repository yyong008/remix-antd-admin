import { Context, Hono } from "hono";
// import { authMiddleware } from "../ReactRouterApi/middleware/auth.middleware";
import { blogRouter } from "./blog";
import { dashboardRouter } from "./dashboard";
import { docsRouter } from "./docs";
import { newsRouter } from "./news";
import { profileRouter } from "./profile";
import { systemRouter } from "./system";

export const adminRouter = new Hono();

// adminRouter.use(authMiddleware);
adminRouter.use(async (c: Context, next: Function) => {
  console.log("c", c.req.url);
  await next();
});

adminRouter.route("/", blogRouter);
adminRouter.route("/dashboard", dashboardRouter);
adminRouter.route("/", docsRouter);
adminRouter.route("/", newsRouter);
adminRouter.route("/", profileRouter);
adminRouter.route("/system", systemRouter);
