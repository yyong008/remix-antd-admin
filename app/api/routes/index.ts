import { Hono } from "hono";

import type { HonoEnv } from "../types";
import { authMiddleware } from "../middleware/auth";
import { authRouter } from "../auth";
import { adminRouter } from "./admin";

export const v1Router = new Hono<HonoEnv>();

v1Router.use("/admin/*", authMiddleware);
v1Router.route("/admin", adminRouter);
v1Router.route("/auth", authRouter);
