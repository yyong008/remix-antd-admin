import prisma from "~/services/common/db.server";

export const createBlogTag = async (data: any) => {
  try {
    return await prisma.blogTag.create({
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

export const getFindBlogTag = async () => {
  try {
    return await prisma.blogTag.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBlogCategoryTag = async (userId: number) => {
  try {
    return await prisma.blogTag.findMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
