import { theme } from "antd";

export const useAntdThemeToken = () => {
  const { token } = theme.useToken();
  return token;
};
