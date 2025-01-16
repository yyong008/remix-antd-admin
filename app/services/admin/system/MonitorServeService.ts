import { getSystemInfo$ } from "@/libs/systemInfo";
import { lastValueFrom } from "rxjs";

class MonitorServeService {
  /**
   * 获取当前服务器信息
   * @param args
   * @returns
   */
  async getList(args: any) {
    const result$ = getSystemInfo$();

    const data = await lastValueFrom(result$);
    return data;
  }
}

export const monitorLoginLogService = new MonitorServeService();
