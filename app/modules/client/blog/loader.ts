import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

import { getAllBlog$ } from "~/services/blog/blog";

class Loader {
  async loader({ params }: LoaderFunctionArgs) {
    return json({
      code: 0,
      message: "success",
      news: await lastValueFrom(getAllBlog$()),
    });
  }
}

export const loader = new Loader().loader;
