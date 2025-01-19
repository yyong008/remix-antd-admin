import { ReactRouterApi } from "../../ReactRouterApi";
import { configRouter } from "./config";
import { deptRouter } from "./dept";
import { dictItemRouter } from "./dict-item";
import { dictRouter } from "./dict";
import { menuRoleRouter } from "./menu-role";
import { menuRouter } from "./menu";
import { monitorLoginLogRouter } from "./monitor.loginlog";
import { monitorOperateRouter } from "./monitor.operate";
import { monitorServeRouter } from "./monitor.serve";
import { roleRouter } from "./role";
import { toolMailRouter } from "./tool.mail";
import { toolStorageRouter } from "./tool.storage";
import { userRouter } from "./user";

export const systemRouter = new ReactRouterApi();

systemRouter.route("/", configRouter);
systemRouter.route("/", deptRouter);
systemRouter.route("/", dictItemRouter);
systemRouter.route("/", dictRouter);
systemRouter.route("/", menuRoleRouter);
systemRouter.route("/", menuRouter);
systemRouter.route("/", roleRouter);
systemRouter.route("/", toolMailRouter);
systemRouter.route("/", toolStorageRouter);
systemRouter.route("/", userRouter);

systemRouter.route("/", monitorLoginLogRouter);
systemRouter.route("/", monitorOperateRouter);
systemRouter.route("/", monitorServeRouter);
