import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useNavigate, useParams } from "react-router";

import { Button } from "antd";
import { CreateDictItemModal } from "./components/CreateDictItemModal";
import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createColumns } from "./components/create-columns";
import { useState } from "react";

export function Route() {
	const nav = useNavigate();
	const { id } = useParams();
	const [page, setPage] = useState({
		page: 1,
		pageSize: 10,
		dictionary_id: id,
	});
	const { data, isLoading, refetch } = {
		data: { data: { list: [], total: 0 } },
		isLoading: false,
		refetch: () => {},
	};
	return (
		<PageContainer>
			<ProTable
				bordered
				rowKey="id"
				size="small"
				search={false}
				headerTitle={<ProTableHeaderTitle title="字典项目" />}
				loading={isLoading}
				options={{
					reload: refetch,
				}}
				toolBarRender={() => [
					<CreateDictItemModal key="create-dict-modal" refetch={refetch} />,
					<Button
						key="2"
						type="primary"
						onClick={() => {
							nav(-1);
						}}
					>
						返回
					</Button>,
				]}
				dataSource={data?.data?.list || []}
				columns={createColumns({ refetch })}
				pagination={{
					total: data?.data?.total,
					pageSize: page.pageSize || 10,
					onChange(_page, pageSize) {
						setPage({ ...page, page: _page, pageSize });
					},
				}}
			/>
		</PageContainer>
	);
}
