// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { combineLatest, from, map, of, switchMap } from "rxjs";

// decorators
import { checkLogin } from "~/server/decorators/check-auth.decorator";
import { permission } from "~/server/decorators/check-perm";
import { validate } from "~/server/decorators/validate-schema";

// schemas
import { CreateBlogCategorySchema } from "~/schema/blog.schema";

// services
import {
  getBlogCategory$,
  createBlogCategory$,
} from "~/server/services/blog/blog-category";
import { getUserId$ } from "~/server/services/common/session";

// utils
import * as respUtils from "~/server/utils/response.json";

const perms: any = {
  GET: "blog:category:get",
  POST: "blog:category:create",
  PUT: "blog:category:update",
  DELETE: "blog:category:delete",
};

export class BlogCategoryController {
  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const method = request.method;

    switch (method) {
      case "POST":
        BlogCategoryController.post({
          request,
          params,
        } as ActionFunctionArgs);
        break;
      case "PUT":
        BlogCategoryController.put({
          request,
          params,
        } as ActionFunctionArgs);
        break;
      case "DELETE":
        BlogCategoryController.delete({
          request,
          params,
        } as ActionFunctionArgs);
        break;
      default:
        respUtils.respUnSupportJson();
        break;
    }
  }

  @permission(perms)
  @checkLogin()
  static async loader({ request }: LoaderFunctionArgs) {
    from(getUserId$(request))
      .pipe(switchMap((userId) => getBlogCategory$(userId!)))
      .subscribe({
        next(v) {
          return respUtils.respSuccessJson({
            dataSource: v,
          });
        },
      });
  }

  @permission(perms)
  @validate(CreateBlogCategorySchema)
  static async post({ request }: ActionFunctionArgs) {
    combineLatest([from(request.json()), from(getUserId$(request))])
      .pipe(
        map((d) => ({ ...d[0].data, userId: d[1] })),
        switchMap((data) => createBlogCategory$(data)),
        switchMap((linkCategory) => respUtils.respByData(linkCategory)),
      )
      .subscribe({
        next(v) {
          return v?.();
        },
        error(e) {
          e?.();
        },
      });
  }

  @permission(perms)
  @validate(CreateBlogCategorySchema)
  static async put({ request }: ActionFunctionArgs) {
    combineLatest([from(request.json()), from(getUserId$(request))])
      .pipe(
        map((d) => ({ ...d[0].data, userId: d[1] })),
        switchMap((data) => createBlogCategory$(data)),
        switchMap((linkCategory) => respUtils.respByData(linkCategory)),
      )
      .subscribe({
        next(v) {
          return v?.();
        },
        error(e) {
          e?.();
        },
      });
  }

  @permission(perms)
  @validate(CreateBlogCategorySchema)
  static async delete({ request, params }: ActionFunctionArgs) {
    from(request.json())
      .pipe(
        switchMap((data) =>
          combineLatest([of(data), from(getUserId$(request))]),
        ),
      )
      .pipe(
        switchMap((d) =>
          from(
            createBlogCategory$({
              ...d[0].data,
              userId: d[1],
            }),
          ).pipe(
            switchMap((linkCategory) => respUtils.respByData(linkCategory)),
          ),
        ),
      )
      .subscribe({
        next(v) {
          return v?.();
        },
      });
  }
}