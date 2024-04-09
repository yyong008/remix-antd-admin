// type
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// json
import { json } from "@remix-run/node";

// services
import { checkLogin } from "~/server/decorators/check-auth.decorator";

// services
import { getAllBlogTag$ } from "~/server/services/blog/blog-tags";
import { createBlog$, updateBlog$ } from "~/server/services/blog/blog";
import { auth$, getUserId$ } from "~/server/services/common/session";
import { getFindBlogCategory$ } from "~/server/services/blog/blog-category";

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
        blogTag: await lastValueFrom(getAllBlogTag$()),
      },
    });
  }

  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const [userId, redirectToLogin] = await lastValueFrom(
      auth$({ request, params } as any),
    );

    if (!userId) {
      return redirectToLogin();
    }
    const { method } = request;

    if (method === "POST") {
      const data = await request.json();
      const userId = await lastValueFrom(getUserId$(request));
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
      const userId = await lastValueFrom(getUserId$(request));
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
