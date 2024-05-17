import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";
import { getNewsById$ } from "~/server/services/news/news";

class Loader {
  async loader({ params }: LoaderFunctionArgs) {
    return json({
      code: 0,
      message: "success",
      news: await lastValueFrom(getNewsById$(Number(params.id!))),
    });
  }
}

export const loader = new Loader().loader;
