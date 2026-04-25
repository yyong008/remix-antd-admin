import { app } from "./hono/index";

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<Env>;
