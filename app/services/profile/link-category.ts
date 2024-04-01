// import type { Prisma } from "@prisma/client";

import prisma from "~/services/common/db.server";

export const createLinkCategory = async (data: any) => {
  try {
    return await prisma.linkCategory.create({
      data,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLinkCategoryListByUserId = async (userId: number) => {
  try {
    return await prisma.linkCategory.findMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
