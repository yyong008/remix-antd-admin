import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useMemo, useState } from "react";

import { ButtonLink } from "@/components/common";
import { createColumns } from "./components/createColumns";
import { href, useParams } from "react-router";
import { useToolsMailList } from "~/api-client/queries/tools-mail";

export function Route() {
	const { locale } = useParams();
	const [page, setPage] = useState({
		page: 1,
		pageSize: 110,
	});
	const { data, isLoading, refetch } = useToolsMailList(page);

	const columns = useMemo(() => {
		return createColumns({ locale, refetch });
	}, [locale, refetch]);

	return (
		<PageContainer>
			<ProTable
				loading={isLoading}
				size="small"
				search={false}
				headerTitle="登录记录"
				rowKey="id"
				showSorterTooltip
				dataSource={data?.data?.list || []}
				toolBarRender={() => [
					<ButtonLink
						key="create-mail"
						to={href(`/:locale?/admin/tools/mail`, { locale })}
						type={"new"}
						content="去新建"
					/>,
				]}
				columns={columns as any}
				options={{
					reload: refetch,
				}}
				pagination={{
					total: data?.data?.total,
					pageSize: 10,
					onChange(page, pageSize) {
						setPage({
							page,
							pageSize,
						});
					},
				}}
			/>
		</PageContainer>
	);
}
