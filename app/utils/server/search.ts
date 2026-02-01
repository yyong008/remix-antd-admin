/**
 * 获取 Node.js URL search params
 * @param request
 * @param name
 * @returns
 */
export function getSearchParams(request: Request, name: string) {
	const r = new URL(request.url).searchParams.get(name);
	return r;
}

export function getSearchParamsPage(request: Request) {
	return Number(getSearchParams(request, "page") ?? 1);
}

export function getSearchParamsPageSize(request: Request) {
	return Number(getSearchParams(request, "pageSize") ?? 10);
}

class UrlSearchParams {
	/**
	 * 获取 Node.js URL search params
	 * @param request
	 * @param name
	 * @returns
	 */
	getSearchParams(request: Request, name: string) {
		const r = new URL(request.url).searchParams.get(name);
		return r;
	}

	/**
	 * 获取 url page 参数
	 * @param request
	 * @returns
	 */
	getPage(request: Request) {
		return Number(getSearchParams(request, "page") ?? 1);
	}

	/**
	 * 获取 url pageSize 参数
	 * @param request
	 * @returns
	 */
	getPageSize(request: Request) {
		return Number(getSearchParams(request, "pageSize") ?? 10);
	}

	/**
	 * 获取 url name 参数
	 * @param request
	 * @returns
	 * */
	getName(request: Request) {
		return getSearchParams(request, "name");
	}

	/**
	 * 获取排序参数
	 * @param request
	 * @returns
	 * */
	getSort(request: Request) {
		return getSearchParams(request, "sort");
	}

	/**
	 * 获取 url categoryId 参数
	 * @param request
	 * @returns
	 */
	getCategoryId(request: Request) {
		return Number(getSearchParams(request, "categoryId"));
	}

	/**
	 * 获取 url tagId 参数
	 * @param request
	 * @returns
	 */
	getTagId(request: Request) {
		return Number(getSearchParams(request, "tagId"));
	}
}

export const urlSearchParams = new UrlSearchParams();
