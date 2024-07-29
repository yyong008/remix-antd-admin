import { SortOrder } from "~/types";
import type { TPage } from "~/types";
import { from } from "rxjs";
import prisma from "@/libs/prisma";

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

export const readUserAllCount$ = () => from(prisma.user.count());

export const readUserInfoById$ = (id: number) =>
  from(
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

export const readUserList$ = ({
  page = 1,
  pageSize = 10,
  name = "",
}: TPage) => {
  return from(
    prisma.user.findMany({
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
    }),
  );
};

export const createUser$ = async (data: any) => {
  return from(
    prisma.$transaction(async (tx) => {
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
      if (!user.id) {
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
    }),
  );
};

export const deleteUserByIds$ = (ids: number[]) =>
  from(
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
    }),
  );

export const updateUserById$ = ({ id, ...data }: any) =>
  from(
    prisma.$transaction(async (tx) => {
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
      console.log(data.roles);
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
    }),
  );
