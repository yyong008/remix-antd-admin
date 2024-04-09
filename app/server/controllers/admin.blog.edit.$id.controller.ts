// type
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/react";

// services
import { getUserId$ } from "~/server/services/common/session";
import { getFindNewsCategory } from "~/server/services/news/news-category";
import { getBlogById$, updateBlog$ } from "~/server/services/blog/blog";
import { getFindBlogCategory$ } from "~/server/services/blog/blog-category";
import { getAllBlogTag$ } from "~/server/services/blog/blog-tags";

// utils
import { from, lastValueFrom, map, switchMap } from "rxjs";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminBlogEditWithIdController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const { id } = params;

    if (id) {
      return json({
        code: 0,
        data: {
          TINYMCE_KEY: process.env.TINYMCE_KEY,
          blogData: await lastValueFrom(getBlogById$(Number(id))),
          categoies: await lastValueFrom(getFindBlogCategory$()),
          tags: await lastValueFrom(getAllBlogTag$()),
        },
        message: "success",
      });
    }

    return json({
      code: 0,
      data: {
        TINYMCE_KEY: process.env.TINYMCE_KEY,
        blogData: {},
        categoies: await getFindNewsCategory(),
        tags: await lastValueFrom(getAllBlogTag$()),
      },
      message: "success",
    });
  }

  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    const method = request.method;

    function validate(data: any) {
      try {
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    }

    if (method === "PUT") {
      from(request.json()).pipe(
        map(() => validate(data)),
        map((data) => ({
          ...data,
          userId,
          categoryId: data.newsId,
          publishedAt: data.date,
        })),
        switchMap((data) => updateBlog$(data)),
      );

      // const data = await lastValueFrom(update$);
      const data = await request.json();
      await lastValueFrom(
        updateBlog$({
          ...data,
          userId,
          categoryId: data.newsId,
          publishedAt: data.date,
        }),
      );
      return json({
        code: 0,
        message: "success",
        data: {},
      });
    } else {
      return json({
        code: 1,
        message: "fail",
        data: {},
      });
    }
  }
}
