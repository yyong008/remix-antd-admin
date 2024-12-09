import { loginLogDAL } from "@/dals/system/LoginLogDAL";
import { urlSearchParams } from "@/utils/server/search";

class MonitorLoginLogService {
  /**
   * 获取列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const page = urlSearchParams.getPage(args.request) || 1;
    const pageSize = urlSearchParams.getPageSize(args.request) || 10;
    const total = await loginLogDAL.getCount();
    const list = await loginLogDAL.getLoginLogList({ page, pageSize });
    return {
      total,
      list,
    };
  }
}

export const monitorLoginLogService = new MonitorLoginLogService();
