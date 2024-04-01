import prisma from "~/services/common/db.server";

export const createLink = async (data) => {
  try {
    return await prisma.link.create({
      data: {
        description: data.description,
        name: data.name,
        url: data.url,
        categoryId: data.categoryId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLinkAll = async () => {
  try {
    return await prisma.link.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLinkListById = async (categoryId: number) => {
  try {
    return await prisma.link.findMany({
      where: {
        categoryId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
