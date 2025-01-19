import { defaultLang } from "@/config";
import { redirect } from "react-router";

export function loader() {
  return redirect("/" + defaultLang);
}
