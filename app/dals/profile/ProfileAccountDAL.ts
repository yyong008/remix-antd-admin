import prisma from "@/libs/prisma";

export class ProfileAccountDAL {
  /**
   * 根据 用户 id 获取用户信息
   * @param id
   * @returns
   */
  async getAccountById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true
      },
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return user;
  }

  async updateAccountById(id: number, dto: any) {
    const user = await prisma.user.update({
      where: { id },
      data: dto,
    });
    return user;
  }
}

export const profileAccountDAL = new ProfileAccountDAL();
