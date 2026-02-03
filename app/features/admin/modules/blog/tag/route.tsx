import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateBlogModal } from "./components/CreateBlogModal";
import { createColumns } from "./components/createColumns";
import { href, useParams } from "react-router";
import { useState } from "react";

export function Route() {
	const { locale } = useParams();
	const [page, setPage] = useState({
		page: 1,
		pageSize: 10,
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
				dataSource={data?.data?.list}
				toolBarRender={() => [
					<CreateBlogModal key="create" refetch={refetch} />,
				]}
				columns={createColumns({ locale, refetch })}
				options={{
					reload: refetch,
				}}
				pagination={{
					total: data?.data?.total,
					pageSize: 10,
					onChange(page, pageSize) {
						setPage?.(() => ({ page, pageSize }));
					},
				}}
			/>
		</PageContainer>
	);
}
