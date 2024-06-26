import { defaultLang } from "~/config";
import { redirect } from "@remix-run/node";

export function loader() {
  return redirect("/" + defaultLang);
}
