import { useAntdThemeToken } from "@/hooks/use-antd-theme-token";

export const ProTableFooter = ({ total }: { total: number }) => {
  const token = useAntdThemeToken();
  return <div style={{ color: token.colorPrimary }}>所有菜单数量：{total}</div>;
};
