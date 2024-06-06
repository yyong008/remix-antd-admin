import { from, of, switchMap } from "rxjs";

// types
import type { Observable } from "rxjs";
import dayjs from "dayjs";
import prisma from "~/lib/prisma";

export interface IBlog {
  createBlog$(data: any): Observable<any>;
  updateBlog$(data: any): Observable<any>;
  deleteManyBlogByIds$(ids: number[]): Observable<any>;
  deleteManyBlogByIds$(ids: number[]): Observable<any>;
  getAllBlog$(): Observable<any>;
  getBlogsListByCategoryId$(categoryId: number): Observable<any>;
  getBlogsListByIds$(
    userId: number,
    categoryId: number,
    tagId: number,
  ): Observable<any>;
  getBlogById$(id: number): Observable<any>;
}

/**
 * 创建博客
 * @param data
 * @returns
 */
export const createBlog$ = (data: any) => {
  return of({
    ...data,
    publishedAt: dayjs(data.publishedAt).toISOString(),
  }).pipe(
    switchMap((data) =>
      from(
        prisma.blog.create({
          data,
        }),
      ),
    ),
  );
};

/**
 * 更新博客
 * @param data
 * @returns
 */
export const updateBlog$ = (data: any) => {
  return of({
    ...data,
    publishedAt: dayjs(data.publishedAt).toISOString(),
  }).pipe(
    switchMap((data) =>
      from(
        prisma.blog.update({
          where: {
            id: data.id,
          },
          data,
        }),
      ),
    ),
  );
};

/**
 * 更新博客
 * @param data
 * @returns
 */
export const deleteManyBlogByIds$ = (ids: number[]) => {
  return from(
    prisma.blog.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};

/**
 * 查询所有博客（不限制 userId）
 * @returns
 */
export const getAllBlog$ = () => {
  return from(prisma.blog.findMany());
};

/**
 * 根据 categoryId 获取博客列表
 * @param categoryId
 * @returns
 */
export const getBlogsListByCategoryId$ = (categoryId: number) => {
  return from(
    prisma.blog.findMany({
      where: {
        categoryId,
      },
    }),
  );
};

/**
 * 根据 categoryId、tagId, userId 获取博客列表
 * @param categoryId
 * @param tagId
 * @param userId
 * @returns
 */
export const getBlogsListByIds$ = (
  userId: number,
  categoryId: number,
  tagId: number,
) => {
  const where: any = {
    userId,
  };

  if (tagId) where.tagId = tagId;
  if (categoryId) where.categoryId = categoryId;

  return from(
    prisma.blog.findMany({
      where,
    }),
  );
};

/**
 * 根据 id 获取列表
 * @param id
 * @returns
 */
export const getBlogById$ = (id: number) => {
  return from(
    prisma.blog.findUnique({
      where: {
        id,
      },
    }),
  );
};
