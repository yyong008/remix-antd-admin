import { Hono } from "hono";
import { handle } from "./hono/adapter";

import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { commonRouter } from "./common";

const app = new Hono();

// app.use(createOperateMiddleware);

// 因为国际化 `:lang` 存在，同一个服务提供多个路由，api 可能被匹配为 lang，添加版本号区分即可
app.route("/api/v1", commonRouter);
app.route("/api/v1/auth", authRouter);
app.route("/api/v1/admin", adminRouter);

export const loader = handle(app);
export const action = handle(app);

