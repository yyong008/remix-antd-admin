// i18n
import i18n from "~/i18n/i18next.server";

/**
 * 根据 params.lang 获取翻译函数
 * @param params
 * @returns
 */
export const createT = async (params: any) => {
  const { lang } = params;
  let t = await i18n.getFixedT(lang!);
  return t;
};
