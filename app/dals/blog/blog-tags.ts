import type { Observable } from "rxjs";
import { from } from "rxjs";
import prisma from "~/libs/prisma";

export const getBlogTagCount$ = () => {
  return from(prisma.blogTag.count());
};

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

export const deleteBlogTag$ = (id: number) => {
  return from(
    prisma.blogTag.delete({
      where: {
        id,
      },
    }),
  );
};

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

export const getAllBlogTag$ = (): Observable<any[]> => {
  return from(prisma.blogTag.findMany());
};

export const getBlogTagByUserId$ = (userId: number): Observable<any[]> => {
  return from(
    prisma.blogTag.findMany({
      where: {
        userId,
      },
    }),
  );
};

export const getBlogTagById$ = (id: number) => {
  return from(prisma.blogTag.findUnique({ where: { id } }));
};

export const getBlogCategoryTag$ = (userId: number): Observable<any[]> => {
  return from(
    prisma.blogTag.findMany({
      where: {
        userId,
      },
    }),
  );
};
