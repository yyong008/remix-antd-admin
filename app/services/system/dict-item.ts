import prisma from "~/services/common/db.server";

/**
 * 获取所有字典条目列表
 * @returns 字典条目列表
 */
export const getDictItemList = async () => {
  try {
    return await prisma.dictionaryEntry.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 返回字典类型对应的字典条目列表
 * @param typeId 字典类型 id
 * @returns 字典类型 id 对应的列表
 */
export const getDictListByTypeId = async (typeId: number) => {
  try {
    return await prisma.dictionaryEntry.findMany({
      where: {
        typeId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
