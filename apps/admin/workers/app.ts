import { createRequestHandler, RouterContextProvider } from "react-router";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    const context = new RouterContextProvider();
    Object.assign(context, {
      cloudflare: { env, context: ctx },
    });

    return requestHandler(request, context);
  },
} satisfies ExportedHandler<Env>;
