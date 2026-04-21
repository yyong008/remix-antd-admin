import { Hono } from "hono";

import type { HonoEnv } from "../types";
import { authRouter } from "./auth";
import { adminRouter } from "./admin";
import { aiRouter } from "./ai";
import { blogRouter } from "./blog";

export const v1Router = new Hono<HonoEnv>();

v1Router.route("/admin", adminRouter);
v1Router.route("/ai", aiRouter);
v1Router.route("/blog", blogRouter);
v1Router.route("/", authRouter);
