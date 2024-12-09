import type { TRegister } from "~/schema/login.schema";

import prisma from "@/libs/prisma";

class RegisterDAL {
  registerRole = [3];

  /**
   * 注册
   * @param data
   * @returns
   */
  async register(data: Exclude<TRegister, "passwordRe">) {
    return prisma.$transaction(async (tx) => {
      let user: any;
      const roles = this.registerRole; // 注册接口创建时默认的角色
      // 创建用户
      user = await tx.user.create({
        data: {
          // avatar: data.avatar,
          name: data.username,
          password: data.password,
          // nickname: data.nickname,
          // email: data.email,
          // lang: data.lang,
          // theme: data.theme,
          // remark: data.remark,
          // department: {
          //   connect: {
          //     id: data.departmentId as number,
          //   },
          // },
          // phone: data.phone,
          // status: data.status,
        },
      });
      // 错误-回滚
      if (!user.id) {
        throw new Error(`create user fail`);
      }
      // 用户-角色关联
      await Promise.all(
        roles?.map(async (roleId: number) => {
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
}

export const registerDAL = new RegisterDAL();
