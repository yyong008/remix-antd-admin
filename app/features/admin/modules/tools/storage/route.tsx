import { PageContainer, ProTable } from "@ant-design/pro-components";

import { StorageModal } from "./components/StorageModal/StorageModal";
import { createColumns } from "./components/createColumns";
import { useState } from "react";
import { useToolsStorageList } from "~/api-client/queries/tools-storage";

export function Route() {
	const [page, setPage] = useState({
		page: 1,
		pageSize: 10,
	});
	const { data, isLoading, refetch } = useToolsStorageList(page);
	const result = (data as any)?.data ?? { list: [], total: 0 };
	return (
		<PageContainer>
			<ProTable
				loading={isLoading}
				size="small"
				search={false}
				headerTitle="文件上传"
				rowKey="id"
				showSorterTooltip
				dataSource={result.list || []}
				toolBarRender={() => [<StorageModal key="storage" refetch={refetch} />]}
				columns={createColumns({ refetch }) as any}
				options={{
					reload: refetch,
				}}
				pagination={{
					total: result.total,
					pageSize: 10,
					onChange(_page, pageSize) {
						setPage({
							...page,
							page: _page,
							pageSize,
						});
					},
				}}
			/>
		</PageContainer>
	);
}
