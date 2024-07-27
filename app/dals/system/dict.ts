import { from, map, of, switchMap } from "rxjs";

import prisma from "@/libs/prisma";

export const readDictCount$ = () => {
  return from(prisma.dictionary.count());
};

export const readDictList$ = (data: any) => {
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
          prisma.dictionary.findMany({
            skip,
            take,
          }),
        ),
      ),
    );
};
