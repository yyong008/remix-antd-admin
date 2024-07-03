// enum
import { SortOrder } from "~/types";
// import type { Prisma, User } from "@prisma/client";
import type { TPage } from "~/types";
import { from } from "rxjs";
// services
import prisma from "~/libs/prisma";

/**
 * 根据 id 查询用户信息
 * @param id {Number} 查询用户的 id
 * @returns 返回用户 info
 */
export const getUserInfoById = async (id: number) => {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserInfoById$ = async (id: number) => {
  return from(
    prisma.user.findUnique({
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
    }),
  );
};

/**
 * 获取 user 数据
 * @returns user count
 */
export const getUserCount = async () => {
  try {
    return await prisma.user.count();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserList = async ({
  page = 1,
  pageSize = 10,
  name = "",
}: TPage) => {
  try {
    return await prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
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
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const createUser = async (data: any) => {
  let user: any;
  try {
    await prisma.$transaction(async (tx) => {
      // 创建用户
      user = await tx.user.create({
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
      if (!user.id) {
        throw new Error(`create user fail`);
      }
      // 用户-角色关联
      await Promise.all(
        data.roles?.map(async (roleId: number) => {
          await tx.userRole.create({
            data: {
              role: { connect: { id: roleId } }, // 关联角色
              user: { connect: { id: user.id } }, // 关联用户
            },
          });
        }),
      );
      return user;
    });
  } catch (error) {
    console.error(error);
    return null;
  }
  return user;
};

export const deleteUserByIds = async (ids: number[]) => {
  try {
    return await prisma.$transaction(async (tx) => {
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
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUserById = async (id: number, data: any) => {
  let user: any = null;
  try {
    await prisma.$transaction(async (tx) => {
      const u = await tx.user.findUnique({
        where: {
          id,
        },
      });

      if (!u) {
        throw new Error(`create user fail`);
      }
      user = await tx.user.update({
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
              id: data.dept,
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
        data.roles.map(async (roleId) => {
          await tx.userRole.create({
            data: {
              role: { connect: { id: roleId } }, // 关联角色
              user: { connect: { id: user.id } }, // 关联用户
            },
          });
        }),
      );
      return user;
    });
  } catch (error) {
    console.error(error);
  }
  return user;
};
