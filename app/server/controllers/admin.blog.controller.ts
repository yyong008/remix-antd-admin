// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

import {
  createBlogCategory,
  getBlogListById,
} from "~/server/services/blog/blog-category";
import { auth, getUserId } from "~/server/services/common/session";

import { URLSearchParams } from "url";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// remix:action
export const action: LoaderFunction = async ({ request, params }) => {
  const [userId, redirectToLogin] = await auth({ request, params } as any);

  if (!userId) {
    return redirectToLogin();
  }
  const method = request.method;

  if (method === "POST") {
    const data = await request.json();
    // 校验数据

    // 写入数据
    const linkCategory = await createBlogCategory({
      ...data,
      userId: await getUserId(request),
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
  const [userId, redirectToLogin] = await auth({ request, params } as any);

  if (!userId) {
    return redirectToLogin();
  }
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  return json({
    dataSource: await getBlogListById(
      userId!,
      Number(searchParams.get("category")),
      Number(searchParams.get("tag")),
    ),
  });
};
