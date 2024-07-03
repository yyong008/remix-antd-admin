import { from, map, of, switchMap } from "rxjs";

import prisma from "@/libs/prisma";

type BlogCategoryData = {
  name: string;
  description: string;
  userId: number;
};

export const createBlogCategory$ = (data: any) => {
  return of(data).pipe(
    switchMap((data: any) => prisma.blogCategory.create({ data })),
  );
};

export const getBlogCategoryCount$ = () => {
  return from(prisma.blogCategory.count());
};

export const updateBlogCategory$ = (
  data: BlogCategoryData & { id: number },
) => {
  return of(data).pipe(
    map((data: any) => ({
      id: data.id,
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    })),
    switchMap(({ id, data }) =>
      prisma.blogCategory.update({
        where: {
          id: id,
        },
        data,
      }),
    ),
  );
};

export const deleteBlogCategoryByIds$ = (ids: number[]) => {
  return from(
    prisma.blogCategory.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};

export const getBlogCategoryByUserId$ = (userId: number) => {
  return of({ userId }).pipe(
    switchMap((where) => prisma.blogCategory.findMany({ where })),
  );
};

export const getBlogCategoryById$ = (id: number) => {
  return from(prisma.blogCategory.findUnique({ where: { id } }));
};

export const getAllBlogCategory$ = () => {
  return from(prisma.blogCategory.findMany());
};

export const getBlogListById$ = (
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
