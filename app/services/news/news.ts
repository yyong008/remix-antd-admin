import dayjs from "dayjs";
import prisma from "~/services/common/db.server";

export const createNews = async (data) => {
  try {
    return await prisma.news.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        newsId: data.categoryId, // mod
        userId: data.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateNews = async (data) => {
  try {
    return await prisma.news.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        newsId: data.categoryId, // mod
        userId: data.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFindNews = async () => {
  try {
    return await prisma.news.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNewsListByCategoryId = async (categoryId: number) => {
  try {
    return await prisma.news.findMany({
      where: {
        newsId: categoryId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNewsById = async (id: number) => {
  try {
    return await prisma.news.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNews = async () => {
  try {
    return await prisma.news.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};
