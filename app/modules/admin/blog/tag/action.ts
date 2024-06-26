// services
import * as blogTagServices from "~/services/blog/blog-tags";
// decorators
import * as ds from "~/decorators";
// type
import type * as rrn from "@remix-run/node";
// schemas
import * as schemas from "~/schema";
// utils
import * as serverUtils from "~/utils/server";
import * as sessionServices from "~/lib/session";

// remix
import { forkJoin, from, switchMap } from "rxjs";

// permissions
import { blogTagPermissions } from "~/constants/permission";

interface BlogTagActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<BlogTagActionInterface, "action">;

class BlogTagAction implements BlogTagActionInterface {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  @ds.authorize()
  @ds.permission(blogTagPermissions.CREATE)
  @ds.validate(schemas.CreateBlogTagSchema)
  async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: sessionServices.getUserId$(request),
    }).pipe(switchMap((data) => blogTagServices.createBlogTag$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.authorize()
  @ds.permission(blogTagPermissions.UPDATE)
  @ds.validate(schemas.UpdateBlogTagSchema)
  async PUT({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: from(request.json()),
      userId: sessionServices.getUserId$(request),
    }).pipe(
      switchMap(({ data, userId }) =>
        blogTagServices.updateBlogTag$({
          ...data,
          userId,
        }),
      ),
    );

    return serverUtils.resp$(result$);
  }

  @ds.authorize()
  @ds.permission(blogTagPermissions.DELETE)
  @ds.validate(schemas.DeleteBlogTagSchema)
  async DELETE({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }) => blogTagServices.deleteBlogTagByIds$(ids)),
    );

    return serverUtils.resp$(result$);
  }
}

export const action = new BlogTagAction().action;
