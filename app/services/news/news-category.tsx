import prisma from "~/services/common/db.server";

export const createNewsCategory = async (data: any) => {
  try {
    return await prisma.newsCategory.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFindNewsCategory = async () => {
  try {
    return await prisma.newsCategory.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNewsCategoryListById = async (userId: number) => {
  try {
    return await prisma.newsCategory.findMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
