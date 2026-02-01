type IPagination = {
	page?: number;
	pageSize?: number;
	name?: string;
	role?: string;
};

/**
 * 获取分页相关参数
 * @param request 请求对象
 * @returns 分页 {IPagination}
 */
export function getPaginationByRequest(request: Request): IPagination {
	let { searchParams } = new URL(request.url);
	let page = Number(searchParams.get("page") ?? 1);
	let pageSize = Number(searchParams.get("pageSize") ?? 10);
	let name = searchParams.get("name") ?? "";
	let role = searchParams.get("role") ?? "";

	return { page, pageSize, name, role };
}

/**
 * 获取分页相关参数
 * @param request 请求对象
 * @returns 分页 {IPagination}
 */
export function getPaginationByRequest$(request: Request): IPagination {
	let { searchParams } = new URL(request.url);
	let page = Number(searchParams.get("page") ?? 1);
	let pageSize = Number(searchParams.get("pageSize") ?? 10);
	let name = searchParams.get("name") ?? "";

	return { page, pageSize, name };
}
