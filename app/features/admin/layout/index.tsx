import type { Route } from "./+types/index";
import { href, redirect } from "react-router";
import { createAuth } from "~/libs/auth/server";
import { runtimeEnvContext } from "~/runtime-context";
import { Route as AdminLayout } from "./route";

const authMiddleware: Route.MiddlewareFunction = async ({ request, context, params }) => {
  const env = context.get(runtimeEnvContext);
  const session = await createAuth(env).api.getSession({
    headers: request.headers,
  });
  if (!session?.user?.id) {
    throw redirect(href("/:locale?/auth/login", { locale: params.locale }));
  }
};

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export default function Layout() {
  return (
    <>
      <AdminLayout />
    </>
  );
}
