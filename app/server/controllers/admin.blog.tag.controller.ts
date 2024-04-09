// types
import type { LoaderFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

// services
import {
  createBlogTag$,
  getBlogCategoryTag$,
} from "~/server/services/blog/blog-tags";
import { auth$, getUserId$ } from "~/server/services/common/session";

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
