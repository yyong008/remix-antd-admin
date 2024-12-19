import { changelogDAL } from "@/dals/docs/ChangelogDAL";
import { joseJwt } from "@/libs/jose";
import { urlSearchParams } from "@/utils/server/search";

class ChangelogService {
  /**
   * 根据 id 获取
   * @param args
   * @returns
   */
  async getById(args: any) {
    const id = Number(args.params.id);
    const result = await changelogDAL.getById(id);
    return result;
  }

  /**
   * 获取列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      page,
      pageSize,
      userId: payload.userId,
    };
    const result = await changelogDAL.getList(data);
    return result;
  }

  /**
   * 创建
   * @param args
   * @returns
   */
  async create(args: any) {
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: payload.userId,
    };
    const result = await changelogDAL.create(data);
    return result;
  }

  /**
   * 删除
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const { ids } = await args.request.json();
    const result = await changelogDAL.deleteByIds(ids);
    return result;
  }

  /**
   * 更新
   * @param args
   * @returns
   */
  async update(args: any) {
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: payload.userId,
    };

    const result = await changelogDAL.update(data);
    return result;
  }
}

export const changeLogService = new ChangelogService();
