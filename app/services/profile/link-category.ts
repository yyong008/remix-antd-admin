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

export const getLinkCategoryList = async () => {
  try {
    return await prisma.linkCategory.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};
