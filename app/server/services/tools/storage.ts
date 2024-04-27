import type { Prisma } from "@prisma/client";
import type { TPage } from "~/types";
import type { Observable } from "rxjs";
// enum
import { SortOrder } from "~/types";

// service
import prisma from "~/server/services/common/prisma";
import { from } from "rxjs";

export interface IStorage {
  createStorage(data: Prisma.StorageCreateInput): any;
  getStorageList(data: TPage): any;
}

export interface IStorage {
  createStorage$(data: Prisma.StorageCreateInput): Observable<any>;
  deleteByIds$(ids: number[]): Observable<any>;
  storageCount$(): Observable<any>;
  getStorageList$(data: TPage): Observable<any>;
}

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
 * delete storage
 * @param ids  Prisma.StorageCreateInput
 * @returns
 */
export const deleteStorageByIds$ = (ids: number[]) => {
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
