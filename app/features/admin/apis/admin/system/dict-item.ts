import api from "~/libs/axios";

/**
 * 创建字典项
 * @param dictionaryId
 * @param data
 * @returns
 */
export async function createSystemDictItem(dictionaryId: string, data: any) {
  try {
    return await api.post(`/admin/system/dict-item/${dictionaryId}`, data);
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
    return await api.put(`/admin/system/dict-item/${dictionaryId}`, data);
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
    return await api.delete(`/admin/system/dict-item/${dictionaryId}`, {
      data: { ids },
    });
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
    return await api.get(`/admin/system/dict-item/${dictionaryId}`);
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
    return await api.get(`/admin/system/dict-item/${dictionaryId}`, { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
