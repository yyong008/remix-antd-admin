import type { Observable } from "rxjs";
import { catchError, from, map, of, switchMap } from "rxjs";
import prisma from "~/services/common/db.server";

export const createBlogCategory = async (data: any) => {
  try {
    return await prisma.blogCategory.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createBlogCategory$ = async (data: any) => {
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

export const getFindBlogCategory = async () => {
  try {
    return await prisma.blogCategory.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFindBlogCategory$ = (): Observable<number | Error> => {
  return from(prisma.blogCategory.findMany()).pipe(
    catchError((e) => {
      console.error(e);
      return of(e);
    }),
  );
};

export const getBlogCategory = async (userId: number) => {
  try {
    return await prisma.blogCategory.findMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBlogCategory$ = async (userId: number) => {
  return from([userId]).pipe(
    map((userId) => ({ userId })),
    switchMap((where) => prisma.blogCategory.findMany({ where })),
    catchError((e) => {
      console.log(e);
      return of(e);
    }),
  );
};

export const getBlogListById = async (
  userId: number,
  category?: number,
  tag?: number,
) => {
  const where: any = {
    userId,
  };
  if (category) {
    where.categoryId = category;
  }
  if (tag) {
    where.tagId = tag;
  }
  try {
    return await prisma.blog.findMany({
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
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const getBlogCategory$ = async (userId: number) => {
//   return from([userId]).pipe(
//     map((userId) => ({ userId })),
//     switchMap((where) => prisma.blogCategory.findMany({ where })),
//     catchError((e) => {
//       console.log(e);
//       return of(e);
//     }),
//   );
// };

export const getBlogListById$ = async (
  userId: number,
  category?: number,
  tag?: number,
) => {
  return from([]).pipe(
    map(() => {
      const where: any = {
        userId,
      };
      if (category) {
        where.categoryId = category;
      }
      if (tag) {
        where.tagId = tag;
      }
      return where;
    }),
    switchMap((where) =>
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
    ),
    catchError((e) => {
      console.log(e);
      return of(e);
    }),
  );
};
