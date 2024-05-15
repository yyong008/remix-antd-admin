import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
// import * as schemas from "~/schema";
import * as serverUtils from "~/server/utils";

import { forkJoin, of, switchMap } from "rxjs";

// import { blogPermissions } from "~/server/permission";
import { getBlogCategoryById$ } from "~/server/services/blog/blog-category";
import { getBlogTagById$ } from "~/server/services/blog/blog-tags";
import { getBlogsListByIds$ } from "~/server/services/blog/blog";
import { getSearchParams } from "~/server/utils";
import { getUserId$ } from "~/server/services/common/session";

interface BlogLoaderInterface {
  loader(laoderArgs: rrn.ActionFunctionArgs): any;
}

class BlogLoader implements BlogLoaderInterface {
  @ds.checkLogin()
  // @ds.permission(blogPermissions.READ_LIST)
  // @ds.validate(schemas.GetBlogSchema)
  async loader({ request }: rrn.LoaderFunctionArgs) {
    const result$ = forkJoin({
      userId: getUserId$(request),
      category: of(Number(getSearchParams(request, "category"))),
      tag: of(Number(getSearchParams(request, "tag"))),
    }).pipe(
      switchMap((data) => {
        return forkJoin({
          dataSource: getBlogsListByIds$(data.userId!, data.category, data.tag),
          category: getBlogCategoryById$(data.category),
          tag: getBlogTagById$(data.tag),
        });
      }),
    );

    return serverUtils.resp$(result$);
  }
}

export const loader = new BlogLoader().loader;
