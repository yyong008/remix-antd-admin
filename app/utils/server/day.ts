import dayjs from "dayjs";

/**
 * 格式字符串
 * @param time 格式化时间
 * @param format 格式语法
 * @returns
 */
export function formatDate(time: string, format = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(time).format(format);
}

export class DateUtils {
  /**
   * 格式字符串
   * @param time 格式化时间
   * @param format 格式语法
   * @returns
   */
  public formatDate(time: string, format = "YYYY-MM-DD HH:mm:ss") {
    return dayjs(time).format(format);
  }
}

export const dateUtils = new DateUtils();
