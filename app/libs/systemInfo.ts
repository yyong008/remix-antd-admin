import * as sInfo from "systeminformation";

import { combineLatest, map } from "rxjs";

/**
 * 获取系统信息
 * @returns
 */
export function getSystemInfo$() {
  return combineLatest([
    sInfo.versions("node, npm"),
    sInfo.osInfo(),
    sInfo.cpu(),
    sInfo.mem(),
    sInfo.currentLoad(),
    sInfo.fsSize(),
  ]).pipe(
    map((sInfos) => ({
      nodeRuntime: {
        node: sInfos[0].node,
        npm: sInfos[0].npm,
      },
      osRuntime: {
        platform: sInfos[1].platform,
        arch: sInfos[1].arch,
      },
      cupInfo: {
        manufacturer: sInfos[2].manufacturer,
        brand: sInfos[2].brand,
        physicalCores: sInfos[2].physicalCores,
        model: sInfos[2].model,
        speed: sInfos[2].speed,
      },
      memInfo: {
        total: sInfos[3].total,
        available: sInfos[3].available,
      },
      currentLoadInfo: {
        rawCurrentLoad: sInfos[4].rawCurrentLoad,
        rawCurrentLoadIdle: sInfos[4].rawCurrentLoadIdle,
        coresLoad: sInfos[4].cpus.map((e) => {
          return {
            rawLoad: e.rawLoad,
            rawLoadIdle: e.rawLoadIdle,
          };
        }),
      },
      diskInfo: sInfos[5].reduce(
        (accumulator, current) => {
          accumulator.size += current.size;
          accumulator.available += current.available;
          accumulator.used += current.used;
          return accumulator;
        },
        { size: 0, available: 0, used: 0 },
      ),
    })),
  );
}
