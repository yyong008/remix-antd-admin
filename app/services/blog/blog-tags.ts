// types
import type { Observable } from "rxjs";
// rxjs
import { from } from "rxjs";
// prisma
import prisma from "~/lib/prisma";

export interface IBlogTag {
  createBlogTag$(data: any): Observable<any[]>;
  updateBlogTag$(data: any): Observable<any[]>;
  deleteBlogTag$(id: number): Observable<any[]>;
  getAllBlogTag$(): Observable<any[]>;
  getBlogTagByUserId$(userId: number): Observable<any[]>;
  getBlogTagById$(id: number): Observable<any[]>;
  getBlogCategoryTag$(userId: number): Observable<any[]>;
}

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
 * 更新博客标签
 * @param data
 * @returns
 */
export const updateBlogTag$ = (data: any) => {
  return from(
    prisma.blogTag.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    }),
  );
};

/**
 * 删除博客标签
 * @param data
 * @returns
 */
export const deleteBlogTag$ = (id: number) => {
  return from(
    prisma.blogTag.delete({
      where: {
        id,
      },
    }),
  );
};

/**
 * 删除博客标签
 * @param data
 * @returns
 */
export const deleteBlogTagByIds$ = (ids: number[]) => {
  return from(
    prisma.blogTag.deleteMany({
      where: {
        id: {
          in: ids,
        },
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
 * 根据 userId 查找博客标签
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
 * 根据 id 获取博客biaoqian
 * @param id
 * @returns
 */
export const getBlogTagById$ = (id: number) => {
  return from(prisma.blogTag.findUnique({ where: { id } }));
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
