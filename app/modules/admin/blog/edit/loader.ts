import * as blogServices from "~/services/blog";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/utils/server";
import * as sessionServices from "~/lib/session";

import { forkJoin, from, of, switchMap } from "rxjs";

// import { blogPermissions } from "~/server/permission";

class AdminBlogEditLoader {
  @ds.checkLogin()
  // @ds.permission(blogPermissions.CREATE)
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(sessionServices.getUserId$(request)).pipe(
      switchMap((userId) => {
        const obj: any = {
          TINYMCE_KEY: of(process.env.TINYMCE_KEY!),
          blogCategory: blogServices.getAllBlogCategory$(),
          blogTag: blogServices.getBlogTagByUserId$(userId!),
        };
        if (params && params.id) {
          obj["blogData"] = blogServices.getBlogById$(Number(params.id));
        }

        return forkJoin(obj);
      }),
    );

    return serverUtils.resp$(result$);
  }
}

export const loader = new AdminBlogEditLoader().loader;
