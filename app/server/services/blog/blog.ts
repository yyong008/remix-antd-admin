import dayjs from "dayjs";
import { from, map, of, switchMap } from "rxjs";
import prisma from "~/server/services/common/prisma";

/**
 * 创建博客
 * @param data
 * @returns
 */
export const createBlog$ = (data: any) => {
  return of(data)
    .pipe(
      map((d) => {
        return {
          ...d,
          publishedAt: dayjs(data.publishedAt).toISOString(),
        };
      }),
    )
    .pipe(
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
  return of(data)
    .pipe(
      map((d) => {
        return {
          ...d,
          publishedAt: dayjs(data.publishedAt).toISOString(),
        };
      }),
    )
    .pipe(
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
  categoryId: number,
  tagId: number,
  userId: number,
) => {
  return from(
    prisma.blog.findMany({
      where: {
        userId,
        tagId,
        categoryId,
      },
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
