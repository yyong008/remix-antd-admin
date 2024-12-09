import prisma from "@/libs/prisma";

export class ProfileAccountDAL {
  /**
   * 根据 用户 id 获取用户信息
   * @param id
   * @returns
   */
  async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}

export const profileAccountDAL = new ProfileAccountDAL();
