// i18n
import i18n from "~/libs/i18n/i18next.server";

/**
 * 根据 params.lang 获取翻译函数
 * @param params
 * @returns
 */
export const createT$ = (params: any) => {
	return i18n.getFixedT(params.lang);
};
