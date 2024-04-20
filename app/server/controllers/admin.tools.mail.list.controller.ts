// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// server
import {
  count$,
  createEmailTemplate$,
  getEmailTemplatePage$,
  // sendMail,
  updateEmailTemplate$,
} from "~/server/services/tools/mail";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

// rxjs
import { forkJoin, from, lastValueFrom, map, switchMap } from "rxjs";
import { respFailJson, respSuccessJson } from "../utils/response.json";
// import { validate } from "../decorators/validate-schema";
import { deleteBlogCategoryById$ } from "../services/blog/blog-category";
import { getSearchParams$ } from "../utils/utils";

export class AdminToolsMailTemplateListController {
  @checkLogin()
  static async loader({ request }: LoaderFunctionArgs) {
    const result$ = forkJoin({
      page: getSearchParams$(request, "page"),
      pageSize: getSearchParams$(request, "pageSize"),
    }).pipe(
      map((data) => ({
        page: Number(data.page ?? 1),
        pageSize: Number(data.pageSize ?? 10),
      })),
      switchMap((data) =>
        forkJoin({
          total: count$(),
          list: getEmailTemplatePage$(data),
        }),
      ),
    );
    const { total, list } = await lastValueFrom(result$);
    return respSuccessJson({ total, list });
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    switch (request.method) {
      case "POST":
        return AdminToolsMailTemplateListController.createMailTemplate({
          request,
        } as ActionFunctionArgs);
      case "PUT":
        return AdminToolsMailTemplateListController.updateEmailTemplate({
          request,
        } as ActionFunctionArgs);
      case "DELETE":
        return AdminToolsMailTemplateListController.deleteEmailTemplate({
          request,
        } as ActionFunctionArgs);
      default:
        break;
    }
  }

  // @validate()
  // TODO
  static async createMailTemplate({ request }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => createEmailTemplate$(data)),
    );

    const res = await lastValueFrom(result$);

    return res ? respSuccessJson(res) : respFailJson({});
  }
  // @validate()
  // TODO
  static async updateEmailTemplate({ request }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => updateEmailTemplate$(data)),
    );

    const res = await lastValueFrom(result$);

    return res ? respSuccessJson(res) : respFailJson({});
  }
  // @validate()
  // TODO
  static async deleteEmailTemplate({ request }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => deleteBlogCategoryById$(data)),
    );

    const res = await lastValueFrom(result$);

    return res ? respSuccessJson(res) : respFailJson({});
  }
}
