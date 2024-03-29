import prisma from "~/services/common/db.server";

/**
 * 返回字典列表
 * @returns 字典列表
 */
export const getDictList = async () => {
  try {
    return await prisma.dictionary.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};
