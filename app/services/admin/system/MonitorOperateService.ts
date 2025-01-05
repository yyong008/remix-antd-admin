import { operateDAL } from "@/dals/operate/operateDAL";
import { urlSearchParams } from "@/utils/server/search";

class MonitorOperateService {
  /**
   * 获取列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const page = urlSearchParams.getPage(args.request) || 1;
    const pageSize = urlSearchParams.getPageSize(args.request) || 10;
    const total = await operateDAL.getOperatesCount({ where: {} });
    const list = await operateDAL.getOperates({
      where: {},
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: "desc" },
    });
    return {
      total,
      list,
    };
  }
}

export const monitorOperateService = new MonitorOperateService();
