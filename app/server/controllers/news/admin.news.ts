// types
import type * as rrn from "@remix-run/node";

// services
import * as newsServices from "~/server/services/news/news";

// decorators
import * as ds from "~/server/decorators";

// utils
import * as utils from "~/server/utils";

// rxjs
import { from, switchMap } from "rxjs";

export class AdminNewsController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    // 新闻列表
    const result$ = newsServices.getNewsListByCategoryId$(Number(params.id));
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async post({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => newsServices.createNews$(data)),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async put({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => newsServices.updateNews$(data)),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async delete({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => newsServices.deleteNewsByIds$(data)),
    );
    return utils.resp$(result$);
  }
}
