import { type LoaderFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

import { getBlogById$ } from "~/server/services/blog/blog";

class Loader {
  async loader({ params }: LoaderFunctionArgs) {
    return json({
      code: 0,
      message: "success",
      blog: (await lastValueFrom(getBlogById$(Number(params.id!))))!,
    });
  }
}

export const loader = new Loader().loader;
