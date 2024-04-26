// types
import type * as rrn from "@remix-run/node";

import { getUserId$ } from "~/server/services/common/session";
import * as newsCategoryServices from "~/server/services/news/news-category";
import * as newsServices from "~/server/services/news/news";

// decorators
import * as ds from "~/server/decorators";

// utils
import * as utils from "~/server/utils";

// rxjs
import { forkJoin, from, switchMap } from "rxjs";

export class AdminNewsEditController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    return utils.resp({
      TINYMCE_KEY: process.env.TINYMCE_KEY,
      newsCategory: await newsCategoryServices.getFindNewsCategory(),
      news: params.id ? await newsServices.getNewsById(Number(params.id)) : {},
    });
  }

  @ds.checkLogin()
  static async post({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: from(request.json()),
      userId: getUserId$(request),
    }).pipe(
      switchMap(({ data, userId }) =>
        from({
          ...data,
          userId,
          categoryId: data.newsId,
          publishedAt: data.date,
        }),
      ),
    );
    return utils.resp$(result$);
  }
}
