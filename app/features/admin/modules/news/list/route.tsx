import { PageContainer, ProTable } from "@ant-design/pro-components";

import { ButtonLink } from "@/components/common";
import { createColumns } from "./components/createColumns";
import { href, useParams } from "react-router";
import { useState } from "react";

export function Route() {
	const { locale } = useParams();
	const [page] = useState({
		page: 1,
		pageSize: 10,
	});
	const { data, isLoading, refetch } = {
		data: { data: { list: [] } },
		isLoading: false,
		refetch: () => {},
	};
	return (
		<PageContainer>
			<ProTable
				rowKey="id"
				headerTitle="新闻"
				size="small"
				search={false}
				loading={isLoading}
				options={{
					reload: refetch,
				}}
				dataSource={data?.data?.list}
				toolBarRender={() => [
					<ButtonLink
						key="create-news-modal"
						type="new"
						content="添加新闻"
						to={href(`/:locale?/admin/news/edit`, { locale })}
					/>,
				]}
				columns={createColumns({ locale, refetch }) as any}
			/>
		</PageContainer>
	);
}
