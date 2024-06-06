// i18n
import i18n from "~/i18n/i18next.server";

// rxjs
import { from } from "rxjs";

/**
 * 根据 params.lang 获取翻译函数
 * @param params
 * @returns
 */
export const createT$ = (params: any) => {
  return from(i18n.getFixedT(params.lang));
};
