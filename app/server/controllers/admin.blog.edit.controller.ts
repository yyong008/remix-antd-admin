// type
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/react";

// services
import { auth$, getUserId$ } from "~/server/services/common/session";
import { getBlogTagByUserId$ } from "~/server/services/blog/blog-tags";
import { createBlog$, updateBlog$ } from "~/server/services/blog/blog";
import { getFindBlogCategory$ } from "~/server/services/blog/blog-category";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

// utils
import { lastValueFrom } from "rxjs";

export class AdminBlogEditController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const [userId, redirectToLogin] = await lastValueFrom(
      auth$({ request, params } as any),
    );

    if (!userId) {
      return redirectToLogin();
    }
    return json({
      code: 0,
      message: "success",
      data: {
        TINYMCE_KEY: process.env.TINYMCE_KEY,
        blogCategory: await lastValueFrom(getFindBlogCategory$()),
        blogTag: await lastValueFrom(getBlogTagByUserId$(userId)),
      },
    });
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    const { method } = request;

    if (method === "POST") {
      const data = await request.json();
      const blog = await lastValueFrom(
        createBlog$({
          ...data,
          userId,
          publishedAt: data.date,
        }),
      );

      return json({
        code: 0,
        data: blog,
        message: "success",
      });
    } else if (method === "PUT") {
      const data = await request.json();
      const blog = await lastValueFrom(
        updateBlog$({
          ...data,
          userId,
          publishedAt: data.date,
        }),
      );

      return json({
        code: 0,
        data: blog,
        message: "success",
      });
    }
  }
}
