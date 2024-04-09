import type { Prisma } from "@prisma/client";
import type { TPage } from "~/types";

// enum
import { SortOrder } from "~/types";

// service
import prisma from "~/server/services/common/prisma";
import { from } from "rxjs";

/**
 * create storage info
 * @param data  Prisma.StorageCreateInput
 * @returns
 */
export const createStorage = async (data: Prisma.StorageCreateInput) => {
  try {
    const res = await prisma.storage.create({
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * create storage info
 * @param data  Prisma.StorageCreateInput
 * @returns
 */
export const createStorage$ = (data: Prisma.StorageCreateInput) => {
  return from(
    prisma.storage.create({
      data,
    }),
  );
};

/**
 * 获取 storage 的数量
 * @returns Number
 */
export const storageCount$ = () => {
  return from(prisma.storage.count());
};

/**
 * 获取分页获取登录信息的列表
 * @param param0 TPage
 * @returns
 */
export const getStorageList = async (data: TPage) => {
  const { page = 1, pageSize = 10, name = "" } = data;
  try {
    return await prisma.storage.findMany({
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
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 获取分页获取登录信息的列表
 * @param param0 TPage
 * @returns
 */
export const getStorageList$ = (data: TPage) => {
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
