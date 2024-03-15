import * as sInfo from "systeminformation";

async function getNodeVersions(str: string) {
  const nodeVersion = await sInfo.versions(str);

  return {
    node: nodeVersion.node,
    npm: nodeVersion.npm,
  };
}

async function getOsInfo() {
  const osInfo = await sInfo.osInfo();
  return {
    platform: osInfo.platform,
    arch: osInfo.arch,
  };
}

async function getCpuInfo() {
  const cpuInfo = await sInfo.cpu();
  return {
    manufacturer: cpuInfo.manufacturer,
    brand: cpuInfo.brand,
    physicalCores: cpuInfo.physicalCores,
    model: cpuInfo.model,
    speed: cpuInfo.speed,
  };
}

async function getMemInfo() {
  const memInfo = await sInfo.mem();
  return {
    total: memInfo.total,
    available: memInfo.available,
  };
}

async function getCurrentLoadInfo() {
  const currentLoadInfo = await sInfo.currentLoad();
  return {
    rawCurrentLoad: currentLoadInfo.rawCurrentLoad,
    rawCurrentLoadIdle: currentLoadInfo.rawCurrentLoadIdle,
    coresLoad: currentLoadInfo.cpus.map((e) => {
      return {
        rawLoad: e.rawLoad,
        rawLoadIdle: e.rawLoadIdle,
      };
    }),
  };
}

async function getDiskListInfo() {
  return await sInfo.fsSize();
}

async function getDiskInfo() {
  const diskListInfo = await getDiskListInfo();
  const diskInfo = {
    size: 0,
    available: 0,
    used: 0,
  };

  diskListInfo.forEach((d) => {
    diskInfo.size += d.size;
    diskInfo.available += d.available;
    diskInfo.used += d.used;
  });

  return diskInfo;
}

export async function getSystemInfo() {
  const nodeRuntime = await getNodeVersions("node, npm");
  const osRuntime = await getOsInfo();
  const cupInfo = await getCpuInfo();
  const memInfo = await getMemInfo();
  const currentLoadInfo = await getCurrentLoadInfo();
  const diskInfo = await getDiskInfo();

  return {
    nodeRuntime,
    osRuntime,
    cupInfo,
    memInfo,
    diskInfo,
    currentLoadInfo,
  };
}
