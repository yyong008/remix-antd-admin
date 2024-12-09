import prisma from "@/libs/prisma";

export class LoginDAL {
  /**
   * 根据用户名查找用户
   * @param name
   * @returns
   */
  async findByUserName(name: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          name,
        },
        select: {
          id: true,
          name: true,
          password: true,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export const loginDAL = new LoginDAL();
