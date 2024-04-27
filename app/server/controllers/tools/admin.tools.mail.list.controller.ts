// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// server
import * as toolsMailServices from "~/server/services/tools/mail";

// rxjs
import { forkJoin, from, map, switchMap } from "rxjs";

// utils
import * as utils from "~/server/utils";

export class AdminToolsMailTemplateListController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request }: rrn.LoaderFunctionArgs) {
    const result$ = forkJoin({
      page: utils.getSearchParams$(request, "page"),
      pageSize: utils.getSearchParams$(request, "pageSize"),
    }).pipe(
      map((data) => ({
        page: Number(data.page ?? 1),
        pageSize: Number(data.pageSize ?? 10),
      })),
      switchMap((data) =>
        forkJoin({
          total: toolsMailServices.count$(),
          list: toolsMailServices.getEmailTemplatePage$(data),
        }),
      ),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => toolsMailServices.createEmailTemplate$(data)),
    );

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async put({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => toolsMailServices.updateEmailTemplate$(data)),
    );

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async delete({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        toolsMailServices.deleteEmailTemplateByIds$(ids),
      ),
    );

    return utils.resp$(result$);
  }
}
