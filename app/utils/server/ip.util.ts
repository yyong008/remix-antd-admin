import { getClientIPAddress } from "@/utils/server/client-ip";
import UAParser from "ua-parser-js";

function isLAN(ip: string) {
  ip.toLowerCase();
  if (ip === "localhost") {
    return true;
  }
  let a_ip = 0;
  if (ip === "") {
    return false;
  }
  if (ip === null) {
    return false;
  }
  const aNum = ip.split(".");
  if (aNum.length !== 4) return false;
  a_ip += Number.parseInt(aNum[0]) << 24;
  a_ip += Number.parseInt(aNum[1]) << 16;
  a_ip += Number.parseInt(aNum[2]) << 8;
  a_ip += Number.parseInt(aNum[3]) << 0;
  a_ip = (a_ip >> 16) & 0xffff;
  return (
    a_ip >> 8 === 0x7f ||
    a_ip >> 8 === 0xa ||
    a_ip === 0xc0a8 ||
    (a_ip >= 0xac10 && a_ip <= 0xac1f)
  );
}

export async function getIpAddress(ip: string) {
  if (isLAN(ip)) return "内网IP";
  try {
    return await fetch(
      `https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
    ).then(async (res) => {
      let data: any = await res.arrayBuffer();
      data = new TextDecoder("gbk").decode(data);
      data = JSON.parse(data);
      const d = data.addr.trim().split(" ").at(0);
      return d;
    });
  } catch (error) {
    return "第三方接口请求失败";
  }
}

export async function getLoginInfo(request: any) {
  const ip = getClientIPAddress(request.headers) ?? "本机地址";
  let parser = new UAParser(request.headers.get("user-agent"));
  const ua = parser.getResult();
  return {
    ip,
    address: await getIpAddress(ip),
    browser: `${ua.browser.name}${ua.browser.version}`,
    system: `${ua.os.name}${ua.os.version}`,
  };
}

class IpUtils {
  /**
   * 判断是否为内网IP
   * @param ip
   * @returns
   */
  isLAN(ip: string) {
    ip.toLowerCase();
    if (ip === "localhost") {
      return true;
    }
    let a_ip = 0;
    if (ip === "") {
      return false;
    }
    if (ip === null) {
      return false;
    }
    const aNum = ip.split(".");
    if (aNum.length !== 4) return false;
    a_ip += Number.parseInt(aNum[0]) << 24;
    a_ip += Number.parseInt(aNum[1]) << 16;
    a_ip += Number.parseInt(aNum[2]) << 8;
    a_ip += Number.parseInt(aNum[3]) << 0;
    a_ip = (a_ip >> 16) & 0xffff;
    return (
      a_ip >> 8 === 0x7f ||
      a_ip >> 8 === 0xa ||
      a_ip === 0xc0a8 ||
      (a_ip >= 0xac10 && a_ip <= 0xac1f)
    );
  }

  /**
   * 获取 ip 地址
   * @param ip
   * @returns
   */
  async getIpAddress(ip: string) {
    if (this.isLAN(ip)) return "内网IP";
    try {
      return await fetch(
        `https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
      ).then(async (res) => {
        let data: any = await res.arrayBuffer();
        data = new TextDecoder("gbk").decode(data);
        data = JSON.parse(data);
        const d = data.addr.trim().split(" ").at(0);
        return d;
      });
    } catch (error) {
      return "第三方接口请求失败";
    }
  }

  /**
   * 获取登录相关信息
   * @param request
   * @returns
   */
  async getLoginInfo(request: any) {
    const ip = getClientIPAddress(request.headers) ?? "本机地址";
    let parser = new UAParser(request.headers.get("user-agent"));
    const ua = parser.getResult();
    return {
      ip,
      address: await getIpAddress(ip),
      browser: `${ua.browser.name}${ua.browser.version}`,
      system: `${ua.os.name}${ua.os.version}`,
    };
  }
}

export const ipUtils = new IpUtils();
