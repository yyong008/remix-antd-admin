import { from, map, of, switchMap } from "rxjs";

import type { Observable } from "rxjs";
import dayjs from "dayjs";
import prisma from "@/libs/prisma";

export const getNewsCount$ = async () => {
  return from(prisma.news.count());
};

export const getNewsByPage$ = (data: any) => {
  return of(data)
    .pipe(
      map((data) => ({
        skip: data.pageSize * (data.page - 1),
        take: data.pageSize,
        newsId: data.category,
      })),
    )
    .pipe(
      switchMap(({ skip, take, newsId }) =>
        from(
          prisma.news.findMany({
            where: {
              newsId,
            },
            skip,
            take,
          }),
        ),
      ),
    );
};

export const createNews$ = (data: any): Observable<any> => {
  return from(
    prisma.news.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        userId: data.userId,
        news: {
          connect: {
            id: data.newsId,
          },
        },
      },
    }),
  );
};

export const updateNews$ = (data: any): Observable<any> => {
  return from(
    prisma.news.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        newsId: data.categoryId,
        userId: data.userId,
      },
    }),
  );
};

export const deleteNewsByIds$ = (ids: number[]): Observable<any> => {
  return from(
    prisma.news.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};

export const getNewsListByCategoryId$ = (
  categoryId: number,
): Observable<any[]> => {
  return from(
    prisma.news.findMany({
      where: {
        newsId: categoryId, // TODO: newsId is categoryId
      },
    }),
  );
};

export const getNewsById$ = (id: number): Observable<any> => {
  return from(
    prisma.news.findUnique({
      where: {
        id,
      },
    }),
  );
};

export const getNews$ = (): Observable<any[]> => {
  return from(prisma.news.findMany());
};
