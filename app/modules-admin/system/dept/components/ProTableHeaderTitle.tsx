import { useAntdThemeToken } from "@/hooks/use-antd-theme-token";

export const ProTableHeaderTitle = ({ title }: { title: string }) => {
  const token = useAntdThemeToken();
  return <div style={{ color: token.colorPrimary }}>{title}</div>;
};
