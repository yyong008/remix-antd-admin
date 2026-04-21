import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { configRouter } from "./config";
import { deptRouter } from "./dept";
import { dictItemRouter } from "./dict-item";
import { dictRouter } from "./dict";
import { menuRouter } from "./menu";
import { monitorLoginLogRouter } from "./monitor.loginlog";
import { monitorOperateRouter } from "./monitor.operate";
import { monitorServeRouter } from "./monitor.serve";
import { roleRouter } from "./role";
import { toolsMailTplRouter } from "./tools.mail-tpl";
import { userRouter } from "./user";

export const systemRouter = new Hono<HonoEnv>();

systemRouter.route("/user", userRouter);
systemRouter.route("/", configRouter);
systemRouter.route("/", deptRouter);
systemRouter.route("/", dictItemRouter);
systemRouter.route("/", dictRouter);
systemRouter.route("/", menuRouter);
systemRouter.route("/", roleRouter);
systemRouter.route("/", toolsMailTplRouter);
systemRouter.route("/", monitorLoginLogRouter);
systemRouter.route("/", monitorOperateRouter);
systemRouter.route("/", monitorServeRouter);
