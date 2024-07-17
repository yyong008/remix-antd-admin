import type { Prisma } from "@prisma/client";
import { SortOrder } from "~/types";
import type { TPage } from "~/types";
import { from } from "rxjs";
import prisma from "@/libs/prisma";

export const createToolsStorage$ = (data: Prisma.StorageCreateInput) => {
  return from(
    prisma.storage.create({
      data,
    }),
  );
};

export const deleteToolsStorageByIds$ = (ids: number[]) => {
  return from(
    prisma.storage.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};

export const readToolsStorageCount$ = () => {
  return from(prisma.storage.count());
};

export const readToolsStorageById$ = (id: number) => {
  return from(
    prisma.storage.findUnique({
      where: { id },
    }),
  );
};

export const readToolsStorageList$ = (data: TPage) => {
  const { page = 1, pageSize = 10, name = "" } = data;
  return from(
    prisma.storage.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: SortOrder.DESCENDING,
      },
    }),
  );
};
