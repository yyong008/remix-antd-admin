// remix
import { json } from "@remix-run/react";

// rxjs
import { lastValueFrom } from "rxjs";

// services
import { createNews } from "~/server/services/news/news";
import { getUserId$ } from "~/server/services/common/session";
import { getFindNewsCategory } from "~/server/services/news/news-category";

// decorator
import { checkLogin } from "~/server/decorators/check-auth.decorator";

export class AdminNewsEditController {
  @checkLogin()
  static async action({ request }: any) {
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
}
