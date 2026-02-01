import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";

export const ProTableFooter = ({ total }: { total: number }) => {
	const token = useAntdThemeToken();
	return <div style={{ color: token.colorPrimary }}>总部门数量：{total}</div>;
};
