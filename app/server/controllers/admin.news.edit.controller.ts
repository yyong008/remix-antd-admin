import type { ActionFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/react";

import { getUserId$ } from "~/server/services/common/session";
import { createNews } from "~/server/services/news/news";
import { getFindNewsCategory } from "~/server/services/news/news-category";

// decorators
import { checkLogin } from "../decorators/check-auth.decorator";

// rxjs
import { lastValueFrom } from "rxjs";

export const action = async ({ params, request }: any) => {};

export const loader = async () => {};

export class AdminNewsEditController {
  @checkLogin()
  static async loader() {
    return json({
      code: 0,
      data: {
        TINYMCE_KEY: process.env.TINYMCE_KEY,
        newsCategory: await getFindNewsCategory(),
      },
      message: "success",
    });
  }

  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const data = await request.json();
    const userId = await lastValueFrom(getUserId$(request));
    const news = await createNews({
      ...data,
      userId,
      categoryId: data.newsId,
      publishedAt: data.date,
    });
    console.log(news);
    return json({});
  }
}
