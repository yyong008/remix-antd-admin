import prisma from "~/services/common/db.server";

export const findByUserName = async (name: string) => {
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
};
