import { from, map, of, switchMap } from "rxjs";

import prisma from "@/libs/prisma";

export const getDictItemList = async () => {
  try {
    return await prisma.dictionaryEntry.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDictListByDictionaryId = async (dictionary_id: number) => {
  try {
    return await prisma.dictionaryEntry.findMany({
      where: {
        dictionary_id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const readAllDictItems$ = () => {
  return from(prisma.dictionaryEntry.findMany());
};

export const getDictItemsListById$ = async (id: number) => {
  return from(
    prisma.dictionaryEntry.findMany({
      where: {
        dictionary_id: id,
      },
    }),
  );
};

export const readDictItemCount$ = (data: any) => {
  return from(prisma.dictionaryEntry.count());
};

export const readDictItemList$ = (data: any) => {
  return of(data)
    .pipe(
      map((data) => ({
        skip: data.pageSize * (data.page - 1),
        take: data.pageSize,
      })),
    )
    .pipe(
      switchMap(({ skip, take }) =>
        from(
          prisma.dictionaryEntry.findMany({
            where: {
              dictionary_id: data.id,
            },
            skip,
            take,
          }),
        ),
      ),
    );
};
