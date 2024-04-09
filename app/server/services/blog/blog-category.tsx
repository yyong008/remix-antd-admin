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
 * 查找所有博客分类
 * @returns
 */
export const getFindBlogCategory$ = (): Observable<number | Error> => {
  return from(prisma.blogCategory.findMany()).pipe(
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
  return from([userId]).pipe(
    map((userId) => ({ userId })),
    switchMap((where) => prisma.blogCategory.findMany({ where })),
    catchError((e) => {
      console.log(e);
      return of(e);
    }),
  );
};

/**
 * 根据所有分类（管理员使用）TODO: 判断是否为管理员： 管理员 id 列表： [角色是：1、2]
 * @param userId
 * @returns
 */
export const getBlogCategory$ = () => {
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
