import { useMemo } from "react";

import { MenuProTable } from "./components/MenuProTable";
import { PageContainer } from "@ant-design/pro-components";
import { useMenuList } from "~/api-client/queries/system-menu";

function removeType3(data: any[]) {
	return data
		.filter((item) => item.type !== 3)
		.map((item) => {
			if (item.children && item.children.length > 0) {
				item.children = removeType3(item.children); // 递归处理子节点
			}
			return item;
		});
}

function buildMenuTree(items: any[], parentId: number | null = null) {
	return items
		.filter((item) => item.parent_menu_id === parentId)
		.map((item) => ({
			...item,
			children: buildMenuTree(items, item.id),
		}))
		.sort((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0));
}

export function Route() {
	const { data, isLoading, refetch } = useMenuList({
		page: 1,
		pageSize: 1000,
	});
	const rawList = useMemo(
		() => JSON.parse(JSON.stringify(data?.data?.list || [])),
		[data],
	);
	const menuTreeData = useMemo(() => buildMenuTree(rawList), [rawList]);
	const menuTreeDataNotPerm = useMemo(() => {
		return removeType3(JSON.parse(JSON.stringify(menuTreeData)) || []);
	}, [menuTreeData]);
	return (
		<PageContainer>
			<MenuProTable
				menuRaw={menuTreeData}
				loading={isLoading}
				menuNotPerm={menuTreeDataNotPerm!}
				refetch={refetch}
				total={data?.data?.total}
			/>
		</PageContainer>
	);
}
