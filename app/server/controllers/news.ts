import { json } from "@remix-run/node";

//
import { lastValueFrom } from "rxjs";

// services
import { getNews$ } from "~/server/services/news/news";

export class NewsController {
  static async loader() {
    return json({
      code: 0,
      message: "success",
      news: await lastValueFrom(getNews$()),
    });
  }
}
