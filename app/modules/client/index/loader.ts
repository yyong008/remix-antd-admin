import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { defaultLang } from "~/config";

class Loader {
  async loader({ params }: LoaderFunctionArgs) {
    const { lang = defaultLang } = params;
    if (!params.lang) {
      return redirect(`/${lang}/`);
    }
    return null;
  }
}

export const loader = new Loader().loader;
