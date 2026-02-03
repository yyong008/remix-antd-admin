import { href, Link, useParams } from "react-router";
import { Space, Tag } from "antd";

import { DeleteAction } from "./DeleteAction";
import { UpdateLinkCategoryModal } from "./UpdateLinkCategoryModal";

function LinkTag({ record }: any) {
	const { locale } = useParams();
	return (
		<Link to={{
          pathname: href("/:locale?/admin/profile/link/category/:id", { locale, id: record.id }),
        }}>
			<Tag color="blue">{record?.name}</Tag>
		</Link>
	);
}

export function createColumns({ refetch }: any) {
	return [
		{
			dataIndex: "name",
			title: "链接分类名",
			render(_: any, record: any) {
				return <LinkTag record={record} />;
			},
		},
		{
			dataIndex: "description",
			title: "描述",
		},
		{
			dataIndex: "op",
			title: "操作",
			render(_: any, record: any) {
				return (
					<Space>
						<UpdateLinkCategoryModal
							key="link-category-modal-modify"
							record={record}
							refetch={refetch}
						/>
						<DeleteAction record={record} refetch={refetch} title="删除" />
					</Space>
				);
			},
		},
	];
}
