import prisma from "@/libs/prisma";

export class DeptDAL {
  /**
   * 获取部门总数
   * @returns
   */
  async getCount() {
    return await prisma.department.count();
  }

  /**
   * 根据id获取部门
   * @param id
   * @returns
   */
  async getById(id: number) {
    return await prisma.department.findUnique({ where: { id } });
  }

  /**
   * 获取所有的部门
   * @returns
   */
  async getAll() {
    return await prisma.department.findMany();
  }

  /**
   * 获取分页的部门列表
   * @param data
   * @returns
   */
  async getList(data: any) {
    const { skip, take } = {
      skip: data.pageSize * (data.page - 1),
      take: data.pageSize,
    };
    return await prisma.department.findMany({
      skip,
      take,
    });
  }

  /**
   * 创建部门
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.department.create({
      data,
    });
  }

  /**
   * 更新部门
   * @param param0
   * @returns
   */
  async update({ id, ...data }: any) {
    return await prisma.department.update({
      where: { id },
      data,
    });
  }

  /**
   * 删除部门
   * @param param0
   * @returns
   */
  async deleteByIds({ ids }: any) {
    return await prisma.department.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const deptDAL = new DeptDAL();
