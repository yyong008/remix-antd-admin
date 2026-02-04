import { useMemo } from "react";

import { MenuProTable } from "./components/MenuProTable";
import { PageContainer } from "@ant-design/pro-components";
import { useMenuFlatList, useMenuList } from "~/api-client/queries/system-menu";

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

export function Route() {
	const { data, isLoading, refetch } = useMenuList({
		page: 1,
		pageSize: 1000,
	});
	const { data: flatData } = useMenuFlatList();
	const menuTreeData = JSON.parse(JSON.stringify(data?.data?.list || []));
	const menuTreeDataNotPerm = useMemo(() => {
		const list = flatData?.data?.list || menuTreeData;
		return removeType3(JSON.parse(JSON.stringify(list)) || []);
	}, [flatData, menuTreeData]);
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
