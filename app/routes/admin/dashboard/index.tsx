import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { Route as DashboardImpl } from "~/features/admin/modules/dashboard/route";
import { createAuth } from "~/libs/auth/server";
import { runtimeEnvContext } from "~/runtime-context";
export { meta } from "~/features/admin/modules/dashboard/index";

export const handle = { breadcrumb: "首页" };

export async function loader({
  request,
  context,
}: LoaderFunctionArgs & {
  context: {
    cloudflare?: {
      env: {
        DB: D1Database;
        TURNSTILE_ENABLED?: string;
        TURNSTILE_SECRET_KEY?: string;
        NODE_ENV?: string;
      };
    };
  };
}) {
  const env = context.get(runtimeEnvContext);
  const auth = createAuth(env);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user.id) {
    throw redirect("/auth/login");
  }
  return { ok: true };
}

export default function Page() {
  return <DashboardImpl />;
}
