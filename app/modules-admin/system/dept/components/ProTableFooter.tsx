import { useAntdThemeToken } from "@/hooks/use-antd-theme-token";

export const ProTableFooter = ({ total }: { total: number }) => {
  const token = useAntdThemeToken();
  return <div style={{ color: token.colorPrimary }}>总部门数量：{total}</div>;
};
