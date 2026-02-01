import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateDeptModal } from "./components/CreateModal";
import { ExpandIcon } from "@/components/common/ExpandIcon";
import { ProTableFooter } from "./components/ProTableFooter";
import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createColumns } from "./components/create-columns";
import { useMemo } from "react";

// Define TypeScript interfaces for better type safety
interface DeptItem {
	id: number;
	name: string;
	children?: DeptItem[];
}

interface TreeOption {
	id: number;
	label: string;
	value: number;
	children?: TreeOption[];
}

// Helper function to convert list to tree structure
const listToTree = (list: DeptItem[]): TreeOption[] => {
	return list.map((item) => ({
		id: item.id,
		label: item.name,
		value: item.id,
		children: item.children ? listToTree(item.children) : undefined,
	}));
};

export function Route() {
	const { data, isLoading, refetch } = {
		data: { data: { list: [], total: 0 } },
		isLoading: false,
		refetch: () => {},
	};

	const treeOptions = useMemo(() => {
		if (data?.data?.list) {
			return listToTree(data.data.list);
		}
		return [];
	}, [data]);

	return (
		<PageContainer>
			<ProTable
				rowKey="id"
				size="small"
				bordered
				headerTitle={<ProTableHeaderTitle title="所有部门" />}
				search={false}
				pagination={false}
				loading={isLoading}
				options={{
					reload: refetch,
				}}
				toolBarRender={() => [
					<CreateDeptModal
						key="dept-modal"
						treeOptions={treeOptions}
						refetch={refetch}
					/>,
				]}
				dataSource={data?.data?.list || []}
				columns={createColumns({ treeOptions, refetch })}
				expandable={{
					expandIcon: ExpandIcon,
				}}
				footer={() => <ProTableFooter total={data?.data?.total} />}
			/>
		</PageContainer>
	);
}
