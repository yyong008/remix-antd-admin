import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";

export const action = async ({ request, params }: ActionArgs) => {
  return redirect("/" + params.lang + "/user/login");
};

export const loader = async ({ params }: LoaderArgs) => {
  return redirect("/" + params.lang + "/user/login");
};
