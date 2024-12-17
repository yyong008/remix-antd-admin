import { SortOrder } from "~/types";
import type { TPage } from "~/types";
import prisma from "@/libs/prisma";

export class UserDAL {
  /**
   * 根据 id 查询用户
   * @param id 用户id
   * @returns
   */
  async getById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        avatar: true,
        name: true,
        nickname: true,
        lang: true,
        theme: true,
        phone: true,
        remark: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        department: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  /**
   * 获取用户数量
   * @returns
   */
  async getCount() {
    return await prisma.user.count();
  }

  /**
   * 获取用户列表
   * @param param0
   * @returns
   */
  async getList({ page = 1, pageSize = 10, name = "" }: TPage) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return await prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip,
      take,
      select: {
        id: true,
        avatar: true,
        email: true,
        name: true,
        nickname: true,
        password: false,
        lang: true,
        theme: true,
        phone: true,
        remark: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        UserRole: {
          include: {
            roles: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: SortOrder.DESCENDING,
      },
    });
  }

  /**
   * 创建用户
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          avatar: data.avatar,
          name: data.name,
          password: data.password,
          nickname: data.nickname,
          email: data.email,
          lang: data.lang,
          theme: data.theme,
          remark: data.remark,
          department: {
            connect: {
              id: data.departmentId as number,
            },
          },
          phone: data.phone,
          status: data.status,
        },
      });
      // 错误-回滚
      if (!user || !user.id) {
        throw new Error(`create user fail`);
      }
      // 用户-角色关联
      await Promise.all(
        data.roles?.map(async (roleId: number) => {
          await tx.userRole.create({
            data: {
              roles: { connect: { id: roleId } }, // 关联角色
              users: { connect: { id: user.id } }, // 关联用户
            },
          });
        }),
      );
      return user;
    });
  }

  /**
   * 更新用户
   * @param param0
   * @returns
   */
  async update({ id, ...data }: any) {
    return await prisma.$transaction(async (tx) => {
      const u = await tx.user.findUnique({
        where: {
          id,
        },
      });

      if (!u) {
        throw new Error(`create user fail`);
      }
      let user = await tx.user.update({
        where: { id },
        data: {
          avatar: data.avatar,
          name: data.name,
          password: data.password,
          nickname: data.nickname,
          email: data.email,
          lang: data.lang,
          theme: data.theme,
          remark: data.remark,
          department: {
            connect: {
              id: data.departmentId,
            },
          },
          phone: data.phone,
          status: data.status,
        },
      });

      if (!user.id) {
        throw new Error(`create user fail`);
      }

      const d = await tx.userRole.deleteMany({
        where: { userId: id },
      });

      if (!d) {
        throw new Error(`del userRole fail`);
      }
      await Promise.all(
        data.roles.map(async (roleId: number) => {
          await tx.userRole.create({
            data: {
              roles: { connect: { id: roleId } }, // 关联角色
              users: { connect: { id: user.id } }, // 关联用户
            },
          });
        }),
      );
      return user;
    });
  }

  /**
   * 根据ids删除用户
   * @param ids
   */
  async deleteByIds(ids: number[]) {
    prisma.$transaction(async (tx) => {
      const users = await prisma.userRole.deleteMany({
        where: {
          userId: {
            in: ids,
          },
        },
      });

      if (!users) {
        throw new Error(`删除关联 userRole 表数据失败`);
      }
      const user = await prisma.user.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return user;
    });
  }
}

export const userDAL = new UserDAL();
