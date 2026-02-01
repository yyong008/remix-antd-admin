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
 * 格式字符串(时间戳不能当做字符串使用)
 * @param time 格式化时间
 * @param format 格式语法
 * @returns
 */
export function formatDate(
	time: string | number | Date | dayjs.Dayjs | null | undefined,
	format = "YYYY-MM-DD HH:mm:ss",
) {
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

/**
 * 获取文件后缀名
 * @param str
 * @returns
 */
export function extname(str: string) {
	var slug = str.split(/\/|\\/).slice(-1)[0];
	var idx = slug.lastIndexOf(".");
	if (idx <= 0) return "";
	var ext = slug.slice(idx);
	return ext;
}

/**
 * 是否为外部链接
 * @param link
 * @returns
 */
export function isExternalLink(str: string) {
	const linkRegex = /^(?:https?:\/\/)?[\w.-]+\.[a-z]{2,}(?:\/[\w\\.-]*)*\/?$/i;
	return linkRegex.test(str);
}
/**
 * 移除 html tag
 * @param str
 * @returns
 */
export function removeHtmlTag(str: string) {
	return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
}
