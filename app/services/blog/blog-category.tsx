import prisma from "~/services/common/db.server";

export const createBlogCategory = async (data: any) => {
  try {
    return await prisma.blogCategory.create({
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

export const getFindBlogCategory = async () => {
  try {
    return await prisma.blogCategory.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBlogCategoryListById = async (userId: number) => {
  try {
    return await prisma.blogCategory.findMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
