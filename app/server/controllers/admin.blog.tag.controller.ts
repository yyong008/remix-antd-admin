// types
import type {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

// services
import {
  createBlogTag$,
  updateBlogTag$,
  getBlogCategoryTag$,
  getBlogTagByUserId$,
} from "~/server/services/blog/blog-tags";
import { deleteManyBlogByIds$ } from "../services/blog/blog";
import { auth$, getUserId$ } from "~/server/services/common/session";

// decorator
import { permission } from "../decorators/check-perm";
import { validate } from "../decorators/validate-schema";
import { checkLogin } from "../decorators/check-auth.decorator";

// json
import * as rp from "~/server/utils";

// schemas
import {
  CreateBlogTagSchema,
  DeleteBlogTagSchema,
  UpdateBlogTagSchema,
} from "~/schema/blog.schema";

// remix:action
export const action: LoaderFunction = async ({ request, params }) => {
  const [userId, redirectToLogin] = await lastValueFrom(
    auth$({ request, params } as any),
  );

  if (!userId) {
    return redirectToLogin();
  }
  const method = request.method;

  if (method === "POST") {
    const data = await request.json();
    const userId = await getUserId$(request);
    const linkCategory = await createBlogTag$({
      ...data,
      userId,
    });

    if (linkCategory === null) {
      return json({
        code: 0,
        message: "创建失败",
        data: {},
      });
    }

    return json({
      code: 0,
      message: "创建成功",
      data: linkCategory,
    });
  } else if (method === "PUT") {
    return json({
      code: 0,
      message: "暂不支持",
      data: {},
    });
  } else if (method === "DELETE") {
    return json({
      code: 0,
      message: "暂不支持",
      data: {},
    });
  }
};

// remix:loader
export const loader: LoaderFunction = async ({ request, params }) => {
  const [userId, redirectToLogin] = await lastValueFrom(
    auth$({ request, params } as any),
  );

  if (!userId) {
    return redirectToLogin();
  }
  // const { id } = params;
  // const userId = await getUserId(request);
  return json({
    dataSource: await lastValueFrom(getBlogCategoryTag$(userId!)),
  });
  // return json({
  //   dataSource: []
  // })
};

const perms = {
  READ_LIST: "blog:tag:list",
  READ: "blog:tag:read",
  CREATE: "blog:tag:create",
  UPDATE: "blog:tag:update",
  DELETE: "blog:tag:delete",
};

export class AdminBlogTagController {
  @checkLogin()
  @permission(perms.READ_LIST)
  static async loader({ request, params }: LoaderFunctionArgs) {
    const result$ = getUserId$(request).pipe(
      switchMap((userId) => getBlogTagByUserId$(userId!)),
    );
    const dataSource = await lastValueFrom(result$);

    return dataSource
      ? rp.respSuccessJson({
          dataSource,
        })
      : rp.respFailJson({});
  }

  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    switch (request.method) {
      case "POST":
        return AdminBlogTagController.post({
          request,
          params,
        } as ActionFunctionArgs);
      case "PUT":
        return AdminBlogTagController.put({
          request,
          params,
        } as ActionFunctionArgs);
      case "DELETE":
        return AdminBlogTagController.delete({
          request,
          params,
        } as ActionFunctionArgs);
      default:
        break;
    }
  }

  @permission(perms.CREATE)
  @validate(CreateBlogTagSchema)
  static async post({ request }: ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap((data) => createBlogTag$(data)));

    const blogCategory = await lastValueFrom(result$);

    return blogCategory === null
      ? rp.respFailJson({}, "创建失败")
      : rp.respSuccessJson(blogCategory, "创建成功");
  }

  @permission(perms.UPDATE)
  @validate(UpdateBlogTagSchema)
  static async put({ request }: ActionFunctionArgs) {
    const result$ = forkJoin({
      data: from(request.json()),
      userId: getUserId$(request),
    }).pipe(
      switchMap(({ data, userId }) =>
        updateBlogTag$({
          ...data,
          userId,
        }),
      ),
    );

    const blogCategory = await lastValueFrom(result$);
    return blogCategory === null
      ? rp.respFailJson({}, "更新失败")
      : rp.respSuccessJson(blogCategory, "更新成功");
  }

  @permission(perms.DELETE)
  @validate(DeleteBlogTagSchema)
  static async delete({ request, params }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }) => deleteManyBlogByIds$(ids)),
    );

    const blogCategory = await lastValueFrom(result$);

    return blogCategory === null
      ? rp.respFailJson({}, "删除失败")
      : rp.respSuccessJson(blogCategory, "删除成功");
  }
}
