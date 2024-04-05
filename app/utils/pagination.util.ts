/**
 * 获取分页相关参数
 * @param request 请求对象
 * @returns 分页
 */
export function getPaginationByRequest(request: Request) {
  let { searchParams } = new URL(request.url);
  let page = Number(searchParams.get("page") ?? 1);
  let pageSize = Number(searchParams.get("pageSize") ?? 10);
  let name = searchParams.get("name") ?? "";

  return { page, pageSize, name };
}
