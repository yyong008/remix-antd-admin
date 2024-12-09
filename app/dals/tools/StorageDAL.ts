import type { Prisma } from "@prisma/client";
import prisma from "@/libs/prisma";

export class StorageDAL {
  /**
   * 获取数量
   * @param where
   * @returns
   */
  public async getCount() {
    return await prisma.storage.count();
  }

  /**
   * 获取存储
   * @param id
   * @returns
   */
  public async getById(id: number) {
    return await prisma.storage.findUnique({ where: { id } });
  }

  /**
   * 获取列表
   * @param param0
   * @returns
   */
  public async getList({
    where,
    skip = 0,
    take = 10,
    orderBy,
  }: {
    where: Prisma.StorageWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.StorageOrderByWithRelationInput;
  }) {
    return await prisma.storage.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  /**
   * 创建存储
   * @param data
   * @returns
   */
  public async create(data: Prisma.StorageCreateInput) {
    return await prisma.storage.create({ data });
  }

  /**
   * 更新存储
   * @param id
   * @param data
   * @returns
   */
  public async update(id: number, data: Prisma.StorageUpdateInput) {
    return await prisma.storage.update({ where: { id }, data });
  }

  /**
   * 根据 ids 删除存储
   * @param ids
   * @returns
   */
  public async deleteByIds(ids: number[]) {
    return await prisma.storage.deleteMany({ where: { id: { in: ids } } });
  }
}

export const storageDAL = new StorageDAL();
