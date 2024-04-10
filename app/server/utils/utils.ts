import dayjs from "dayjs";

/**
 * noop 空函数
 */
export function noop() {}

/**
 * identity 返回值
 * @param value {any}
 * @returns
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * 格式字符串
 * @param time 格式化时间
 * @param format 格式语法
 * @returns
 */
export function formatDate(time: string, format = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(time).format(format);
}

/**
 * 根据 name 生成 antd 文件列表 fileList
 * @param name
 * @returns
 */
export function genFileListByName(name: string) {
  if (!name) {
    return [];
  }
  return [
    {
      uid: "uid",
      name,
      status: "done",
      url: name,
      response: {
        data: {
          name,
        },
      },
    },
  ];
}

export function extname(str: string) {
  var slug = str.split(/\/|\\/).slice(-1)[0];
  var idx = slug.lastIndexOf(".");
  if (idx <= 0) return "";
  var ext = slug.slice(idx);
  return ext;
}

export function getSearchParams(request: Request, name: string) {
  const r = new URL(request.url).searchParams.get(name);
  return r;
}