import { getApiClient } from "~/api-client";

/**
 * 创建字典项
 * @param dictionaryId
 * @param data
 * @returns
 */
export async function createSystemDictItem(dictionaryId: string, data: any) {
  try {
    const res = await getApiClient().api.admin.system["dict-item"][":dictionaryId"].$post({
      param: { dictionaryId },
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新字典项
 * @param dictionaryId
 * @param data
 * @returns
 */
export async function updateSystemDictItemById(
  dictionaryId: string,
  data: any,
) {
  try {
    const res = await getApiClient().api.admin.system["dict-item"][":dictionaryId"].$put({
      param: { dictionaryId },
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除字典项
 * @param dictionaryId
 * @param ids
 * @returns
 */
export async function deleteSystemDictItemByIds(
  dictionaryId: string,
  ids: string[],
) {
  try {
    const res = await getApiClient().api.admin.system["dict-item"][":dictionaryId"].$delete({
      param: { dictionaryId },
      json: { ids },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取字典项详情
 * @param dictionaryId
 * @returns
 */
export async function readSystemDictItem(dictionaryId: string) {
  try {
    const res = await getApiClient().api.admin.system["dict-item"][":dictionaryId"].$get({
      param: { dictionaryId },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取字典项列表
 * @param dictionaryId
 * @param params
 * @returns
 */
export async function readSystemDictItemList(
  dictionaryId: string,
  params: { page: number; pageSize: number },
) {
  try {
    const res = await getApiClient().api.admin.system["dict-item"][":dictionaryId"].$get({
      param: { dictionaryId },
      query: {
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
      },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
