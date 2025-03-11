import { Hono } from "hono";

import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { commonRouter } from "./common/common";
import { devLogger } from "./hono/middleware/dev.logger";

export const app = new Hono();

app.use(devLogger());
// app.use(createOperateMiddleware);

// 因为国际化 `:lang` 存在，同一个服务提供多个路由，api 可能被匹配为 lang，添加版本号区分即可
app.route("/api/v1", commonRouter);
app.route("/api/v1/auth", authRouter);
app.route("/api/v1/admin", adminRouter);
