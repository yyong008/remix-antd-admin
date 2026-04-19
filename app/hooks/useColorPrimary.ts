import { theme } from "antd";

export const useColorPrimary = () => {
  const { token } = theme.useToken();
  return { colorPrimary: token.colorPrimary };
};
