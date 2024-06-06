import * as blogCategoryServices from "~/services/blog/blog-category";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/utils/server";
import * as sessionServices from "~/lib/session";

// import { blogCategoryPermissions } from "~/server/permission";
import { switchMap } from "rxjs";

class BlogCategoryLoader {
  @ds.checkLogin()
  // @ds.permission(blogCategoryPermissions.READ_LIST)
  // @ds.validate(schemas.GetBlogCategorySchema)
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = sessionServices
      .getUserId$(request)
      .pipe(
        switchMap((userId) =>
          blogCategoryServices.getBlogCategoryByUserId$(userId!),
        ),
      );
    return serverUtils.resp$(result$);
  }
}

export const loader = new BlogCategoryLoader().loader;
