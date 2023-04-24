import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";

// auth
import { auth } from "~/utils/auth.server";

export const action = async ({ request, params }: ActionArgs) => {
  await auth.logout(request, { redirectTo: "/" + params.lang + "/user/login" });
};

export const loader = async ({ params }: LoaderArgs) => {
  return redirect("/" + params.lang + "/user/login");
};
