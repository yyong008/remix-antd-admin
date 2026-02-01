import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router";

import { ButtonLink } from "@/components/common/button-link";
import { createColumns } from "./components/createColumns";
import { message } from "antd";

export function Route() {
	const [searchParams] = useSearchParams();
	const { data, isLoading, refetch } = {
		data: {
			code: 0,
			message: "",
			data: { tag: {}, category: {}, list: [] },
		} as any,
		isLoading: false,
		refetch: () => {},
	};
	const { tag: tagInfo, category: categoryInfo, list } = data?.data || {};
	const { lang } = useParams();

	const info = useMemo(() => {
		let name = "";
		if (searchParams.get("category") && categoryInfo?.name)
			name = "分类: " + categoryInfo?.name;
		if (searchParams.get("tag") && tagInfo?.name)
			name = "标签: " + tagInfo?.name;

		return { name, categoryName: categoryInfo?.name, tagName: tagInfo?.name };
	}, [categoryInfo?.name, searchParams, tagInfo?.name]);

	useEffect(() => {
		if (data?.code === 1) {
			message.error(data?.message);
		}
	}, [data]);

	return (
		<PageContainer>
			<ProTable
				loading={isLoading}
				rowKey="id"
				size="small"
				search={false}
				dataSource={list as any[]}
				headerTitle={info.name}
				toolBarRender={() => [
					<ButtonLink
						key="tag-modal"
						to={`/${lang}/admin/blog/edit`}
						type={"new"}
						content="新建"
					/>,
				]}
				columns={createColumns({ lang, refetch, info }) as any}
			/>
		</PageContainer>
	);
}
