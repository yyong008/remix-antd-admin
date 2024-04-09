// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/react";
import { lastValueFrom } from "rxjs";
import { checkLogin } from "~/server/decorators/check-auth.decorator";

// services
import { getUserId$ } from "~/server/services/common/session";
import { createNews, getNewsById } from "~/server/services/news/news";
import { getFindNewsCategory } from "~/server/services/news/news-category";

export class AdminNewsEditWithIdController {
  @checkLogin()
  static async loader({ params }: LoaderFunctionArgs) {
    const { id } = params;
    return json({
      code: 0,
      data: {
        TINYMCE_KEY: process.env.TINYMCE_KEY,
        newsCategory: await getFindNewsCategory(),
        news: await getNewsById(Number(id)),
      },
      message: "success",
    });
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    const data = await request.json();
    const userId = await lastValueFrom(getUserId$(request));
    const news = await createNews({
      ...data,
      userId,
      categoryId: data.newsId,
      publishedAt: data.date,
    });
    return json({
      code: 0,
      message: "success",
      data: news,
    });
  }
}
