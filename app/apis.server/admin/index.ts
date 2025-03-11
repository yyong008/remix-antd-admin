import { Context, Hono } from "hono";
import { blogRouter } from "./blog";
import { dashboardRouter } from "./dashboard";
import { docsRouter } from "./docs";
import { newsRouter } from "./news";
import { profileRouter } from "./profile";
import { systemRouter } from "./system";
import { auth } from "../hono/middleware/auth";

export const adminRouter = new Hono();

adminRouter.use(auth());

adminRouter.route("/", blogRouter);
adminRouter.route("/dashboard", dashboardRouter);
adminRouter.route("/", docsRouter);
adminRouter.route("/", newsRouter);
adminRouter.route("/", profileRouter);
adminRouter.route("/system", systemRouter);
