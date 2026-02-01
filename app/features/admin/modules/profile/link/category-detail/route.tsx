import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateLinkCategoryModal } from "../category/components/CreateLinkCategoryModal";
import { createColumns } from "./components/createColumns";
import { useParams } from "react-router";
import { useState } from "react";

export function Route() {
	const { id } = useParams();
	const [page, setPage] = useState({
		page: 1,
		pageSize: 10,
		id,
	});
	const { data, isLoading, refetch } = {
		data: { data: { list: [], total: 0 } },
		isLoading: false,
		refetch: () => {},
	};
	return (
		<PageContainer>
			<ProTable
				rowKey="id"
				size="small"
				search={false}
				loading={isLoading}
				dataSource={data?.data?.list || []}
				toolBarRender={() => [
					<CreateLinkCategoryModal refetch={refetch} key="create-link-modal" />,
				]}
				options={{
					reload: refetch,
				}}
				pagination={{
					total: data?.data?.total,
					pageSize: 10,
					onChange(_page, pageSize) {
						setPage({
							...page,
							page: _page,
							pageSize,
						});
					},
				}}
				columns={createColumns({ refetch })}
			/>
		</PageContainer>
	);
}
