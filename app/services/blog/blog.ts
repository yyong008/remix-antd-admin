import dayjs from "dayjs";
import prisma from "~/services/common/db.server";

export const createBlog = async (data) => {
  try {
    return await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        categoryId: data.categoryId, // mod
        tagId: data.tagId,
        userId: data.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateBlog = async (data) => {
  try {
    return await prisma.blog.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        categoryId: data.categoryId, // mod
        tagId: data.tagId,
        userId: data.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFindBlog = async () => {
  try {
    return await prisma.blog.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBlogsListByCategoryId = async (categoryId: number) => {
  try {
    return await prisma.blog.findMany({
      where: {
        categoryId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBlogsListByTagId = async (tagId: number) => {
  try {
    return await prisma.blog.findMany({
      where: {
        tagId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBlogById = async (id: number) => {
  try {
    return await prisma.blog.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBlogs = async () => {
  try {
    return await prisma.blog.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};
