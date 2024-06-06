import * as blogTagServices from "~/services/blog/blog-tags";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
// import * as schemas from "~/schema";
import * as serverUtils from "~/utils/server";
import * as sessionServices from "~/lib/session";

// import { blogTagPermissions } from "~/server/permission";
import { switchMap } from "rxjs";

export class AdminBlogTagLoader {
  @ds.checkLogin()
  // @ds.permission(blogTagPermissions.READ_LIST)
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = sessionServices
      .getUserId$(request)
      .pipe(
        switchMap((userId) => blogTagServices.getBlogTagByUserId$(userId!)),
      );

    return serverUtils.resp$(result$);
  }
}

export const loader = new AdminBlogTagLoader().loader;
