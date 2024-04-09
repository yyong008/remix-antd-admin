// types
import type { Observable } from "rxjs";

// rxjs
import { from } from "rxjs";

// prisma
import prisma from "~/server/services/common/prisma";

/**
 * 创建博客标签
 * @param data
 * @returns
 */
export const createBlogTag$ = (data: any) => {
  return from(
    prisma.blogTag.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    }),
  );
};

/**
 * 查找所有标签
 * @returns
 */
export const getAllBlogTag$ = (): Observable<any[]> => {
  return from(prisma.blogTag.findMany());
};

/**
 * 根据 userId 查找博客分类
 * @param userId
 * @returns
 */
export const getBlogTagByUserId$ = (userId: number): Observable<any[]> => {
  return from(
    prisma.blogTag.findMany({
      where: {
        userId,
      },
    }),
  );
};

/**
 * 根据用户 Id 获取博客和分类列表
 * @param userId
 * @returns
 */
export const getBlogCategoryTag$ = (userId: number): Observable<any[]> => {
  return from(
    prisma.blogTag.findMany({
      where: {
        userId,
      },
    }),
  );
};
