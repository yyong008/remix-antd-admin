import * as blogServices from "@/dals/blog";

import { forkJoin, from, lastValueFrom, map, of, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "@/libs/jose";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import { getBlogCategoryById$ } from "@/dals/blog/blog-category";
import { getBlogTagById$ } from "@/dals/blog/blog-tags";
import { getBlogsListByIds$ } from "@/dals/blog/blog";
import { getSearchParams } from "@/utils/server";

// read services
export async function readService(args: LoaderFunctionArgs) {
  const result$ = of(Number(args.params.id)).pipe(
    switchMap((id) => blogServices.getBlogById$(id)),
  );

  const result = await lastValueFrom(result$);
  return result;
}

// read list service
export async function readListService(args: LoaderFunctionArgs) {
  const { request } = args;
  const result$ = forkJoin({
    payload: getTokenUserIdByArgs(args),
    category: of(Number(getSearchParams(request, "category"))),
    tag: of(Number(getSearchParams(request, "tag"))),
  })
    .pipe(
      map((data) => ({
        category: data.category,
        tag: data.tag,
        userId: data.payload.userId,
      })),
    )
    .pipe(
      switchMap((data) => {
        return forkJoin({
          dataSource: getBlogsListByIds$(data.userId!, data.category, data.tag),
          category: getBlogCategoryById$(data.category),
          tag: getBlogTagById$(data.tag),
        });
      }),
    );

  return lastValueFrom(result$);
}

// create blog service
export async function createBlogService(args: ActionFunctionArgs) {
  const result$ = forkJoin({
    dto: args.request.json(),
    payload: getTokenUserIdByArgs(args),
  })
    .pipe(
      map((data) => ({
        ...data.dto,
        userId: data.payload.userId,
      })),
    )
    .pipe(switchMap((data) => blogServices.createBlog$(data)));

  return lastValueFrom(result$);
}

// delete blog service
export async function deleteBlogService({ request }: ActionFunctionArgs) {
  const result$ = from(request.json()).pipe(
    switchMap(({ ids }) => blogServices.deleteManyBlogByIds$(ids)),
  );

  return lastValueFrom(result$);
}

// update blog service
export async function updateBlogService({ request }: ActionFunctionArgs) {
  const result$ = from(request.json()).pipe(
    switchMap(({ data, userId }) =>
      blogServices.updateBlog$({
        ...data,
        userId,
      }),
    ),
  );

  return lastValueFrom(result$);
}
