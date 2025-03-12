import { Hono } from "hono";

import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { commonRouter } from "./common/common";
import { devLogger } from "./hono/middleware/dev.logger";

export const app = new Hono().basePath("/api/v1"); // 因为国际化 `:lang` 存在，同一个服务提供多个路由，api 可能被匹配为 lang，添加版本号区分即可

app.use(devLogger());

app.route("/", commonRouter);
app.route("/auth", authRouter);
app.route("/admin", adminRouter);
