import type { Observable } from "rxjs";

import { catchError, from, map, of, switchMap } from "rxjs";
import prisma from "~/server/services/common/prisma";

/**
 * 创建博客分类
 * @param data
 * @returns
 */
export const createBlogCategory$ = (data: any) => {
  return from(data).pipe(
    map((data: any) => ({
      name: data.name,
      description: data.description,
      userId: data.userId,
    })),
    switchMap((data) => prisma.blogCategory.create({ data })),
    catchError((e) => {
      console.error(e);
      return of(e);
    }),
  );
};

/**
 * 更新博客分类
 * @param data
 * @returns
 */
export const updateBlogCategory$ = (data: any) => {
  return of(data).pipe(
    map((data: any) => ({
      ...data.data,
      name: data.data.name,
      description: data.data.description,
      userId: data.userId,
    })),
    switchMap((data) =>
      prisma.blogCategory.update({
        where: {
          id: data.id,
        },
        data,
      }),
    ),
    // catchError((e) => {
    //   console.error(e);
    //   return of(e);
    // }),
  );
};

/**
 * 删除指定id博客分类
 * @returns
 */
export const deleteBlogCategoryById$ = (
  id: number,
): Observable<number | Error> => {
  return from(prisma.blogCategory.delete({ where: { id } })).pipe(
    catchError((e) => {
      console.error(e);
      return of(e);
    }),
  );
};

/**
 * 根据 userId 获取博客分类
 * @param userId
 * @returns
 */
export const getBlogCategoryByUserId$ = (userId: number) => {
  return of({ userId }).pipe(
    switchMap((where) => prisma.blogCategory.findMany({ where })),
    catchError((e) => {
      console.log(e);
      return of(e);
    }),
  );
};

/**
 * 根据 id 获取博客分类
 * @param userId
 * @returns
 */
export const getBlogCategoryById$ = (id: number) => {
  return from(prisma.blogCategory.findUnique({ where: { id } }));
};

/**
 * 根据所有分类（管理员使用）TODO: 判断是否为管理员： 管理员 id 列表： [角色是：1、2]
 * @param userId
 * @returns
 */
export const getAllBlogCategory$ = () => {
  return from(prisma.blogCategory.findMany());
};

/**
 * 更具用户 userId, categoryId, tagId 获取博客内容（）
 * @param userId
 * @param categoryId
 * @param tagId
 * @returns
 */
export const getBlogListById$ = (
  // TODO: 迁移
  userId: number,
  categoryId?: number,
  tagId?: number,
) => {
  const where: any = {
    userId,
  };
  if (categoryId) where.categoryId = categoryId;
  if (tagId) where.tagId = tagId;

  return from(
    prisma.blog.findMany({
      where,
      select: {
        id: true,
        title: true,
        content: true,
        author: true,
        viewCount: true,
        publishedAt: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
  );
};
