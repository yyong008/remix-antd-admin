// types
import type * as rrn from "@remix-run/node";

// services
import * as newsCategoryServices from "~/server/services/news/news-category";

// decorators
import * as ds from "~/server/decorators";

// rxjs
import { from, switchMap } from "rxjs";

// utils
import * as utils from "~/server/utils";

export class AdminNewsCategoryController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ params }: rrn.LoaderFunctionArgs) {
    return utils.resp$(newsCategoryServices.getAllNewsCategory$());
  }

  @ds.checkLogin()
  static async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => newsCategoryServices.createNewsCategory$(data)),
    );

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async put({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => newsCategoryServices.updateNewsCategory$(data)),
    );

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async delete({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        newsCategoryServices.deleteNewsCategoryByIds$(ids),
      ),
    );

    return utils.resp$(result$);
  }
}
