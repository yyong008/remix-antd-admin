import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { blogRouter } from "./blog";
import { dashboardRouter } from "./dashboard";
import { docsRouter } from "./docs";
import { feedbackRouter } from "./feedback";
import { newsRouter } from "./news";
import { toolsRouter } from "./tools";
import { profileRouter } from "./profile";
import { systemRouter } from "./system";
import { authMiddleware } from "../../middleware/auth";
import { demoModeMiddleware } from "../../middleware/demo";

export const adminRouter = new Hono<HonoEnv>();

adminRouter.use("*", authMiddleware);
adminRouter.use("*", demoModeMiddleware);

adminRouter.route("/dashboard", dashboardRouter);
adminRouter.route("/blog", blogRouter);
adminRouter.route("/news", newsRouter);
adminRouter.route("/docs", docsRouter);
adminRouter.route("/feedback", feedbackRouter);
adminRouter.route("/tools", toolsRouter);
adminRouter.route("/", profileRouter);
adminRouter.route("/system", systemRouter);
