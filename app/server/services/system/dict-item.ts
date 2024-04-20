import prisma from "~/server/services/common/prisma";

export interface IDictItem {
  getDictItemList(): any[];
  getDictListByDictionaryId(dictionary_id: number): any;
}

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
 * @param dictionary_id 字典类型 id
 * @returns 字典类型 id 对应的列表
 */
export const getDictListByDictionaryId = async (dictionary_id: number) => {
  try {
    return await prisma.dictionaryEntry.findMany({
      where: {
        dictionary_id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
