import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";


import { useParams } from "react-router";

const mapLocale = {
  "zh-CN": zhCN,
  "en-US": enUS,
};
export function useAntdLocal() {
  const { lang = "zh_CN" } = useParams();

  return mapLocale[lang as keyof typeof mapLocale];
}
