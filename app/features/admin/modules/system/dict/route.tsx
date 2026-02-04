import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateDictModal } from "./components/CreateDictModal";
import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createColumns } from "./components/create-columns";
import { useState } from "react";
import { useParams } from "react-router";
import { useDictList } from "~/api-client/queries/system-dict";

export function Route() {
	const { locale } = useParams();
	const [page, setPage] = useState({ page: 1, pageSize: 10 });
	const { data, isLoading, refetch } = useDictList(page);
	return (
		<PageContainer>
			<ProTable
				bordered
				rowKey="id"
				size="small"
				search={false}
				headerTitle={<ProTableHeaderTitle title="字典项目" />}
				loading={isLoading}
				toolBarRender={() => [
					<CreateDictModal refetch={refetch} key="create-dict-modal" />,
				]}
				dataSource={data?.data?.list || []}
				columns={createColumns({ locale, refetch })}
				options={{
					reload: refetch,
				}}
				pagination={{
					total: data?.data?.total || 0,
					pageSize: page.pageSize || 10,
					onChange(pageNumber, pageSize) {
						setPage({ page: pageNumber, pageSize });
					},
				}}
			/>
		</PageContainer>
	);
}
