import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";

export const ProTableHeaderTitle = ({ title }: { title: string }) => {
	const token = useAntdThemeToken();
	return <div style={{ color: token.colorPrimary }}>{title}</div>;
};
