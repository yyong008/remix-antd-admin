import { handle } from "./hono/adapter";

import { app } from "./app";

export const loader = handle(app);
export const action = handle(app);
