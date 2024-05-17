import { type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import {
  commitSession,
  destroySession,
  getSession,
} from "~/server/services/common/session";
import { defaultLang } from "~/config/lang";

class Loader {
  async loader({ request, params }: LoaderFunctionArgs) {
    const lang = params.lang || defaultLang;
    const session = await getSession(request.headers.get("Cookie"));

    if (session.has("userId")) {
      return redirect("/" + lang + "/admin/dashboard", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }

    const data = { error: session.get("error") };

    return json(data, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

export const loader = new Loader().loader;
