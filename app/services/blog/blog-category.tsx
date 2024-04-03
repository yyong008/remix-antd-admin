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

export const getBlogCategory = async (userId: number) => {
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

export const getBlogListById = async (
  userId: number,
  category?: number,
  tag?: number,
) => {
  const where: any = {
    userId,
  };
  if (category) {
    where.categoryId = category;
  }
  if (tag) {
    where.tagId = tag;
  }
  try {
    return await prisma.blog.findMany({
      where,
      select: {
        id: true,
        title: true,
        content: true,
        author: true,
        viewCount: true,
        publishedAt: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: {
          select: {
            id: true,
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
